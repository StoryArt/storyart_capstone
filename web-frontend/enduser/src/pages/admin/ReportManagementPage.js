import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { MDBNav, MDBNavItem, MDBNavLink, MDBTabPane, MDBCardBody, MDBDataTable, MDBCard, MDBBtn } from 'mdbreact';
import ReportService from '../../services/report.service';

const ReportManagementPage = () => {
  useEffect(() => {
    getCommentReportsData();
  }, []);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  const [commentReports, setCommentReports] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const getCommentReportsData = async () => {
    try {
      const res = await ReportService.getCommentReports(pageNo);
      //setCommentReports(res.data.content);
      //setDataTable({ ...dataTable, rows: res.data.content });
      //setTotalPages(res.data.totalPages);
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
      row["handle"] = (<MDBBtn color="success">
        Xử lý
      </MDBBtn>);

      rowsList.push(row);
    });
    //setConvertedData(rowsList);
    setDataTable({ ...dataTable, rows: rowsList });
  }

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
        <MDBTabPane tabId="1" role="tabpanel">
          <MDBCard>
            <MDBCardBody>
              <MDBDataTable
                striped
                bordered
                hover
                data={dataTable}
                entriesOptions={[5, 10, 20, 50, 100]}
                pagesAmount={dataTable.rows.totalPages}
              //onPageChange={}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBTabPane>
        <MDBTabPane tabId="2" role="tabpanel">
        </MDBTabPane>
      </div>

    </AdminLayout>
  )
}

export default ReportManagementPage;