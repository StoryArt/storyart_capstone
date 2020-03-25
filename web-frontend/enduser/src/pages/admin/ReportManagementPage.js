import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/main-layout/MainLayout';
import {
  MDBNav, MDBTabContent, MDBNavItem, MDBNavLink, MDBTabPane, MDBCardBody,
  MDBDataTable, MDBCard, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal,
  MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDropdown, MDBDropdownItem,
  MDBDropdownToggle, MDBDropdownMenu
} from 'mdbreact';
import Pagination from '@material-ui/lab/Pagination';
import ReportService from '../../services/report.service';
import { getAuthUserInfo } from '../../config/auth';

const ReportManagementPage = () => {
  const userInfo = getAuthUserInfo();
  useEffect(() => {
    getCommentReportsData();
  }, []);
  const [handleModal, setHandleModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isHandledDropdown, setIsHandledDropdown] = useState(false);
  const getCommentReportsData = async () => {
    try {
      const res = await ReportService.getCommentReports(pageNo, isHandledDropdown);
      setTotalPages(res.data.totalPages);
      convertData(res.data);
    } catch (error) {

    }
  }

  function convertData(data) {
    var reportList = data.content;
    var rowsList = [];
    reportList.forEach(element => {
      var row = {};
      row["commentOwner"] = element["commentOwner"];
      row["commentContent"] = element["commentContent"];
      row["numberOfReports"] = element["numberOfReports"];
      row["handled"] = (element.handled ?
        (<p>Đã xử lý</p>) : (<p>Chưa xử lý</p>));
      row["handle"] = (<MDBBtn color="success" onClick={e => handleReport(element)}>
        Xử lý
      </MDBBtn>);

      rowsList.push(row);
    });
    //setConvertedData(rowsList);
    setDataTable({ ...dataTable, rows: rowsList });
  }

  const [reportContent, setReportContent] = useState({});
  const handleReport = (report) => {
    setHandleModal(true);
    setReportContent(report);
    getReportsByCommentId(1, report.commentId);
    setCommentId(report.commentId);
  };

  const [commentId, setCommentId] = useState(0);
  const [handlePageNo, setHandlePageNo] = useState(1);
  const [handleTotalPages, sethandleTotalPages] = useState(0);
  const [reportIds, setReportIds] = useState([]);

  const getReportsByCommentId = async (pageNumber, commentId) => {
    try {
      const res = await ReportService.getReportsForEachComment(pageNumber, commentId);
      if (handleTotalPages === 0) {
        sethandleTotalPages(res.data.totalPages);
      }
      convertHandleData(res.data);
      //get reportIds
      var listReportId = [];
      res.data.content.forEach(element => {
        listReportId.push(element.id);
      });
      setReportIds(listReportId);

    } catch (error) {

    }
  }

  function convertHandleData(data) {
    var reportList = data.content;
    var rowsList = [];
    reportList.forEach(element => {
      var row = {};
      row["userId"] = element["userId"];
      row["content"] = element["content"];

      rowsList.push(row);
    });

    setHandleTable({ ...handleTable, rows: rowsList });
  }

  const changeHandlePage = (event, value) => {
    if (value !== handlePageNo) {
      setHandlePageNo(value);
      getReportsByCommentId(value, commentId);
    }
  }

  const changePage = async (event, value) => {
    if (value !== pageNo) {
      setPageNo(value);
      try {
        const res = await ReportService.getCommentReports(value);
        convertData(res.data);
      } catch (error) {

      }
    }
  };



  const [activeItem, setActiveItem] = useState('1');
  const toggle = tab => e => {
    if (activeItem !== tab) {
      setActiveItem(tab);
    }
    if (tab === '1') {
      getCommentReportsData();
    }

  };

  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: "Tên người dùng",
        field: "commentOwner",
        width: "25%",
        sort: "asc"
      },
      {
        label: "Nội dung bình luận",
        field: "commentContent",
        width: "50%",
        sort: "asc"
      },
      {
        label: "Số lượng báo cáo",
        field: "numberOfReports",
        width: "5%",
        sort: "asc"
      },
      {
        label: "Trạng thái",
        field: "handled",
        width: "10%",
        sort: "asc"
      },
      {
        label: "Xử lý",
        field: "handle",
        sort: "disabled",
        width: "10%"
      }

    ],
    rows: []
  });

  const [handleTable, setHandleTable] = useState({
    columns: [
      {
        label: "Tên người báo cáo",
        field: "userId",
        width: "30%",
        sort: "disabled"
      },
      {
        label: "Nội dung báo cáo",
        field: "content",
        width: "70%",
        sort: "disabled"
      }

    ],
    rows: []
  });

  const [handleOption, setHandleOption] = useState('Không có vi phạm');

  const handleReportAction = async () => {
    try {
      if (handleOption === "Không có vi phạm") {
        const res = await ReportService.handleReport(reportIds);
        var updateRows = [...dataTable.rows];
        setDataTable({ ...dataTable, rows: updateRows.filter(item => item.commentId !== commentId) });
        //setDataTable({ ...dataTable, rows: updateRows.map(item => item.commentId === commentId ? { ...item, handled: true } : item) });
      }
    } catch (error) {
      console.log(error);
    }
    setHandleModal(!handleModal);



  }




  return (
    <MainLayout>
      <div className="container-fluid">
        <MDBNav className="nav-tabs" className="mb-4">
          <MDBNavItem>
            <MDBNavLink to="#" active={activeItem === "1"} onClick={toggle("1")} role="tab" >
              Bình luận
                        </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" active={activeItem === "2"} onClick={toggle("2")} role="tab" >
              Truyện
                        </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={activeItem} >
          <MDBTabPane tabId="1" role="tabpanel">
            {dataTable.rows.length > 0 &&
              <MDBCard>
                <MDBCardBody>
                  <Pagination className="float-right" count={totalPages} color="primary" boundaryCount={2} onChange={changePage} />

                  <MDBTable striped hover bordered>
                    <MDBTableHead columns={dataTable.columns} />
                    <MDBTableBody rows={dataTable.rows} />
                  </MDBTable>

                </MDBCardBody>
              </MDBCard>
            }
            {dataTable.rows.length < 1 &&
              <div className="text-center">
                <p>Không có báo cáo</p>
              </div>
            }

          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <p>Nothing to show</p>
          </MDBTabPane>

        </MDBTabContent>




      </div>
      <MDBModal className="float" isOpen={handleModal} size='sm' toggle={e => setHandleModal(!handleModal)}>
        <MDBModalHeader toggle={e => setHandleModal(!handleModal)}>Xử lý báo cáo</MDBModalHeader>
        <MDBModalBody>
          <p>Tên người dùng: <strong>{reportContent.commentOwner}</strong></p>
          <p>Nội dung bình luận: "<strong>{reportContent.commentContent}</strong>"</p>
          <p>Số lượng báo cáo: <strong>{reportContent.numberOfReports}</strong></p>

          <p>Cách xử lý: </p>
          <MDBDropdown>
            <MDBDropdownToggle caret color="ins">
              {handleOption}
            </MDBDropdownToggle>
            <MDBDropdownMenu basic >
              <MDBDropdownItem onClick={e => setHandleOption('Không có vi phạm')}>Không có vi phạm</MDBDropdownItem>
              <MDBDropdownItem onClick={e => setHandleOption('Ẩn bình luận')}>Ẩn bình luận</MDBDropdownItem>
              <MDBDropdownItem onClick={e => setHandleOption('Vô hiệu hóa tài khoản')}>Vô hiệu hóa tài khoản</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>




          <Pagination className="float-right" count={handleTotalPages} color="primary" boundaryCount={2} onChange={changeHandlePage} />
          <MDBTable striped hover bordered small>
            <MDBTableHead columns={handleTable.columns} />
            <MDBTableBody rows={handleTable.rows} />
          </MDBTable>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='success' onClick={e => setHandleModal(!handleModal)}>
            Hủy
                                        </MDBBtn>
          <MDBBtn color='warning' onClick={handleReportAction} >Xử lý</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MainLayout>

  )
}

export default ReportManagementPage;