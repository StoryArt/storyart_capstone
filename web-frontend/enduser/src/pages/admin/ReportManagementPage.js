import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { MDBNav, MDBTabContent, MDBNavItem, MDBNavLink, MDBTabPane, MDBCardBody, MDBDataTable, MDBCard, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import Pagination from '@material-ui/lab/Pagination';
import ReportService from '../../services/report.service';

const ReportManagementPage = () => {
  useEffect(() => {
    getCommentReportsData();
  }, []);
  const [handleModal, setHandleModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getCommentReportsData = async () => {
    try {
      const res = await ReportService.getCommentReports(pageNo);
      setTotalPages(res.data.totalPages);
      convertData(res.data);
    } catch (error) {

    }
  }
  const [convertedData, setConvertedData] = useState([]);
  function convertData(data) {
    var reportList = data.content;
    var rowsList = [];
    var rowItem = {};
    //rowItem["totalPages"] = data.totalPages;
    //rowsList.push(rowItem);
    //setTotalPages(data.totalPages);
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


  const handleReport = (report) => {
    setHandleModal(true);
  };

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


  return (
    <AdminLayout>
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
                  <Pagination align="right" count={totalPages} color="primary" boundaryCount={2} onChange={changePage} />
                  <br>
                  </br>
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


        <MDBModal isOpen={handleModal} toggle={e => setHandleModal(!handleModal)}>
          <MDBModalHeader toggle={e => setHandleModal(!handleModal)}>Chỉnh sửa bình luận</MDBModalHeader>
          <MDBModalBody>
            {/* {modalError.length > 0 && <small style={{ color: 'red' }}>(*){modalError}</small>}
            <form className='mx-3 grey-text'>
              <MDBInput
                type='textarea'
                rows='2'
                label='Nội dung bình luận'
                value={updateCommentRequest.content}
                onChange={e => setUpdateCommentRequest({ ...updateCommentRequest, content: e.target.value })}
              />
            </form> */}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='success' onClick={e => setHandleModal(!handleModal)}>
              Hủy
                                        </MDBBtn>
            <MDBBtn color='warning' >Chỉnh sửa</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>

    </AdminLayout>
  )
}

export default ReportManagementPage;