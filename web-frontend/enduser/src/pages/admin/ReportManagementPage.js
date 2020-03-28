import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/main-layout/MainLayout';
import {
  MDBNav, MDBTabContent, MDBNavItem, MDBNavLink, MDBTabPane, MDBCardBody,
  MDBDataTable, MDBCard, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal,
  MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDropdown, MDBDropdownItem,
  MDBDropdownToggle, MDBDropdownMenu, MDBInput
} from 'mdbreact';
import Pagination from '@material-ui/lab/Pagination';
import ReportService from '../../services/report.service';
import { getAuthUserInfo } from '../../config/auth';

const ReportManagementPage = () => {
  const userInfo = getAuthUserInfo();
  useEffect(() => {
    getCommentReportsData(false);
    getStoryReportsData(false);
  }, []);
  const [handleModal, setHandleModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [storyPageNo, setStoryPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalStoryPages, setTotalStoryPages] = useState(0);

  const [handledDropdown, setHandledDropdown] = useState('Chưa xử lý');
  const [handledStoryDropdown, setHandledStoryDropdown] = useState('Chưa xử lý');

  const getCommentReportsData = async (isHandled) => {
    try {
      if (isHandled !== handled) {
        setPageNo(1);
        const res = await ReportService.getCommentReports(1, isHandled);
        setTotalPages(res.data.totalPages);
        convertData(res.data);
      }
      else {
        const res = await ReportService.getCommentReports(pageNo, isHandled);
        setTotalPages(res.data.totalPages);
        convertData(res.data);
      }


    } catch (error) {

    }
  }

  const getStoryReportsData = async (isHandled) => {
    try {
      if (isHandled !== storyHandled) {
        setStoryPageNo(1);
        const res = await ReportService.getStoryReports(1, isHandled);
        setTotalStoryPages(res.data.totalPages);
        convertStoryData(res.data);
      }
      else {
        const res = await ReportService.getStoryReports(storyPageNo, isHandled);
        setTotalStoryPages(res.data.totalPages);
        convertStoryData(res.data);
      }


    } catch (error) {

    }
  }

  function convertStoryData(data) {
    var storyList = data.content;
    var rowsList = [];

    storyList.forEach(element => {
      var row = {};
      row["storyId"] = element["storyId"];
      row["authorName"] = element["authorName"];

      row["storyName"] = element["storyName"];
      row["numberOfReports"] = element["reportIds"].length;

      row["authorEmail"] = element["authorEmail"];
      row["handle"] = (element.handled ?
        (
          <MDBBtn color="primary" onClick={e => handleReport(element)}>
            Xem lại
          </MDBBtn>
        )
        :
        (<MDBBtn color="success" onClick={e => handleReport(element)}>
          Xử lý
        </MDBBtn>)

      );
      rowsList.push(row);
    });
    //setConvertedData(rowsList);
    setDataStoryTable({ ...dataStoryTable, rows: rowsList });
  }



  function convertData(data) {
    var reportList = data.content;
    var rowsList = [];

    reportList.forEach(element => {
      var row = {};
      row["commentId"] = element["commentId"];
      row["commentOwner"] = element["commentOwner"];

      row["commentContent"] = element["commentContent"];
      row["numberOfReports"] = element["reportIds"].length;

      row["commentOwnerEmail"] = element["commentOwnerEmail"];
      row["handle"] = (element.handled ?
        (
          <MDBBtn color="primary" onClick={e => handleReport(element)}>
            Xem lại
          </MDBBtn>
        )
        :
        (<MDBBtn color="success" onClick={e => handleReport(element)}>
          Xử lý
        </MDBBtn>)

      );
      rowsList.push(row);
    });
    //setConvertedData(rowsList);
    setDataTable({ ...dataTable, rows: rowsList });
  }

  const [reportContent, setReportContent] = useState({});
  const handleReport = (report) => {
    setHandleOption("Không có vi phạm");
    setHandleModal(true);
    setReportContent(report);
    if (activeItem === "1") {
      getReportsByCommentId(1, report.commentId, report.handled);
      setCommentId(report.commentId);
    }
    if (activeItem === "2") {
      getReportsByStoryId(1, report.storyId, report.handled);
      setStoryId(report.storyId);
    }
  };



  const [commentId, setCommentId] = useState(0);
  const [storyId, setStoryId] = useState(0);
  const [handlePageNo, setHandlePageNo] = useState(1);
  const [handleTotalPages, sethandleTotalPages] = useState(0);

  const getReportsByCommentId = async (pageNumber, commentId, handled) => {
    try {
      const res = await ReportService.getReportsForEachComment(pageNumber, commentId, handled);
      sethandleTotalPages(res.data.totalPages);
      convertHandleData(res.data);
      setHandlePageNo(pageNumber);
    } catch (error) {

    }
  }

  const getReportsByStoryId = async (pageNumber, storyId, handled) => {
    try {
      const res = await ReportService.getReportsForEachStory(pageNumber, storyId, handled);
      sethandleTotalPages(res.data.totalPages);
      convertHandleData(res.data);
      setHandlePageNo(pageNumber);
    } catch (error) {

    }
  }

  function convertHandleData(data) {
    var reportList = data.content;
    var rowsList = [];
    reportList.forEach(element => {
      var row = {};
      row["username"] = element["username"];
      row["content"] = element["content"];

      rowsList.push(row);
    });

    setHandleTable({ ...handleTable, rows: rowsList });
  }


  const changeHandlePage = (event, value) => {
    if (value !== handlePageNo) {
      getReportsByCommentId(value, commentId, reportContent.handled);
    }
  }

  const changePage = async (event, value) => {
    if (value !== pageNo) {
      setPageNo(value);
      try {
        const res = await ReportService.getCommentReports(value, handled);
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

  };

  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: "Mã bình luận",
        field: "commentId",
        width: "50%",
        sort: "asc"
      },
      {
        label: "Tên tài khoản",
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
        label: "Email",
        field: "commentOwnerEmail",
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

  const [dataStoryTable, setDataStoryTable] = useState({
    columns: [
      {
        label: "Mã truyện",
        field: "storyId",
        width: "50%",
        sort: "asc"
      },
      {
        label: "Tác giả",
        field: "authorName",
        width: "25%",
        sort: "asc"
      },
      {
        label: "Tên truyện",
        field: "storyName",
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
        label: "Email",
        field: "authorEmail",
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

  const [handleStoryTable, setHandleStoryTable] = useState({
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
      var handleRequest = {
        type: '',
        id: 0,
        action: '',
        reportIds: reportContent.reportIds
      };
      if (handleOption === "Không có vi phạm") {
        handleRequest.type = "none";
      }
      if (handleOption === "Ẩn bình luận") {
        handleRequest.type = "comment";
        handleRequest.action = "deactivate";
        handleRequest.id = commentId;
      }
      if (handleOption === "Vô hiệu hóa tài khoản") {
        handleRequest.type = "user";
        handleRequest.action = "deactivate";
        if (reportContent.commentOwnerId !== null) {
          handleRequest.id = reportContent.commentOwnerId;
        }
        if (reportContent.userId !== null) {
          handleRequest.id = reportContent.userId;
        }

      }
      if (handleOption === "Ẩn truyện") {
        handleRequest.type = "story";
        handleRequest.action = "deactivate";
        handleRequest.id = reportContent.storyId;
      }
      const res = await ReportService.handleReport(handleRequest);
      if (activeItem === "1") {
        var updateRows = [...dataTable.rows];
        setDataTable({ ...dataTable, rows: updateRows.filter(item => item.commentId !== commentId) });
      }
      if (activeItem === "2") {
        var updateRows = [...dataStoryTable.rows];
        setDataStoryTable({ ...dataStoryTable, rows: updateRows.filter(item => item.storyId !== storyId) });
      }

    } catch (error) {
      console.log(error);
    }
    setHandleModal(!handleModal);




  }
  const [handled, setHandled] = useState(false);
  const [storyHandled, setStoryHandled] = useState(false);
  const getCommentReportsByIsHandled = (isHandled) => {
    if (isHandled) {
      setHandledDropdown('Đã xử lý');
    }
    else {
      setHandledDropdown('Chưa xử lý');
    }
    setHandled(isHandled);
    getCommentReportsData(isHandled);
  }

  const getStoryReportsByIsHandled = (isHandled) => {
    if (isHandled) {
      setHandledStoryDropdown('Đã xử lý');
    }
    else {
      setHandledStoryDropdown('Chưa xử lý');
    }
    setStoryHandled(isHandled);
    getStoryReportsData(isHandled);
  }

  const changeStatusWhenReview = async (type, status) => {
    var handleRequest = {
      type: '',
      id: 0,
      action: '',
      reportIds: []
    };
    if (type === "comment") {
      setReportContent({ ...reportContent, commentIsDisableByAdmin: !status });
      handleRequest.type = "comment";
      handleRequest.id = commentId;
      if (status) {
        handleRequest.action = "activate";
      }
      else {
        handleRequest.action = "deactivate";
      }


    }
    if (type === "user") {
      setReportContent({ ...reportContent, userIsDisableByAdmin: !status });
      //setComments(array.map(item => item.id === updateCommentRequest.commentId ? { ...item, content: updateCommentRequest.content } : item));
      handleRequest.type = "user";
      if (activeItem === "1") {
        handleRequest.id = reportContent.commentOwnerId;
        //var array = [...dataTable.rows];
        //array.map(item => item.commentOwner === reportContent.commentOwner ? { ...item, userIsDisableByAdmin: !status } : item);
        //setDataTable({ ...dataTable, rows: array });
      }
      if (activeItem === "2") {
        handleRequest.id = reportContent.userId;
      }

      if (status) {
        handleRequest.action = "activate";
      }
      else {
        handleRequest.action = "deactivate";
      }
    }
    if (type === "story") {
      setReportContent({ ...reportContent, storyIsDisableByAdmin: !status });
      handleRequest.type = "story";
      handleRequest.id = reportContent.storyId;
      if (status) {
        handleRequest.action = "activate";
      }
      else {
        handleRequest.action = "deactivate";
      }
    }
    try {
      const res = await ReportService.handleReport(handleRequest);
    } catch (error) {
    }

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


            <MDBCard>
              <MDBCardBody>

                {/* <div class="row"> */}
                <MDBDropdown>
                  <MDBDropdownToggle caret color="ins">
                    {handledDropdown}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu basic >
                    <MDBDropdownItem onClick={e => getCommentReportsByIsHandled(false)}>Chưa xử lý</MDBDropdownItem>
                    <MDBDropdownItem onClick={e => getCommentReportsByIsHandled(true)}>Đã xử lý</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                {/* <MDBInput label="Nhập nội dung tìm kiếm (mã bình luận, tên tài khoản,...)"></MDBInput> */}
                {/* 
                  </MDBInput>
                  <button className="float-right">
                    <i class="fas fa-search"></i>
                  </button>
                </div> */}

                {dataTable.rows.length > 0 &&
                  <div>
                    <Pagination page={pageNo} className="float-right" count={totalPages} color="primary" boundaryCount={2} onChange={changePage} />

                    <MDBTable striped hover bordered small>
                      <MDBTableHead columns={dataTable.columns} />
                      <MDBTableBody rows={dataTable.rows} />
                    </MDBTable>
                  </div>

                }
                {dataTable.rows.length < 1 &&
                  <div className="text-center">
                    <p>Không có báo cáo</p>
                  </div>
                }

              </MDBCardBody>
            </MDBCard>



          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <MDBCard>
              <MDBCardBody>

                {/* <div class="row"> */}
                <MDBDropdown>
                  <MDBDropdownToggle caret color="ins">
                    {handledStoryDropdown}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu basic >
                    <MDBDropdownItem onClick={e => getStoryReportsByIsHandled(false)}>Chưa xử lý</MDBDropdownItem>
                    <MDBDropdownItem onClick={e => getStoryReportsByIsHandled(true)}>Đã xử lý</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                {/* <MDBInput label="Nhập nội dung tìm kiếm (mã bình luận, tên tài khoản,...)"></MDBInput> */}
                {/* 
                  </MDBInput>
                  <button className="float-right">
                    <i class="fas fa-search"></i>
                  </button>
                </div> */}

                {dataStoryTable.rows.length > 0 &&
                  <div>
                    <Pagination page={storyPageNo} className="float-right" count={totalStoryPages} color="primary" boundaryCount={2} onChange={changePage} />

                    <MDBTable striped hover bordered small>
                      <MDBTableHead columns={dataStoryTable.columns} />
                      <MDBTableBody rows={dataStoryTable.rows} />
                    </MDBTable>
                  </div>

                }
                {dataStoryTable.rows.length < 1 &&
                  <div className="text-center">
                    <p>Không có báo cáo</p>
                  </div>
                }

              </MDBCardBody>
            </MDBCard>
          </MDBTabPane>

        </MDBTabContent>



        <MDBModal isOpen={handleModal} size='md' toggle={e => setHandleModal(!handleModal)}>
          <MDBModalHeader toggle={e => setHandleModal(!handleModal)}>Xử lý báo cáo</MDBModalHeader>
          {activeItem === '1' &&
            <MDBModalBody>
              <p>Tên người dùng: <strong>{reportContent.commentOwner}</strong></p>
              <p>Nội dung bình luận: "<strong>{reportContent.commentContent}</strong>"</p>
              <p>Số lượng báo cáo: <strong>{reportContent.numberOfReports}</strong></p>
              <p>Email: <strong>{reportContent.commentOwnerEmail}</strong></p>
              {reportContent.handled &&
                <div>
                  <div style={{ display: "flex" }}>

                    <p>Trạng thái bình luận:
                    <strong onClick={e => changeStatusWhenReview('comment', reportContent.commentIsDisableByAdmin)} style={reportContent.commentIsDisableByAdmin ? ({ color: 'red', cursor: 'pointer' }) : ({ color: 'green', cursor: 'pointer' })}> {reportContent.commentIsDisableByAdmin ? "Đã ẩn" : "Bình thường"} </strong>
                    </p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p>Trạng thái người dùng:
                  <strong onClick={e => changeStatusWhenReview('user', reportContent.userIsDisableByAdmin)} style={reportContent.userIsDisableByAdmin ? ({ color: 'red', cursor: 'pointer' }) : ({ color: 'green', cursor: 'pointer' })}> {reportContent.userIsDisableByAdmin ? "Đã vô hiệu hóa" : "Bình thường"} </strong>
                    </p>
                  </div>

                </div>
              }
              {!reportContent.handled &&
                <div>
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
                </div>
              }





              <Pagination className="float-right" count={handleTotalPages} color="primary" boundaryCount={2} onChange={changeHandlePage} />
              <MDBTable striped hover bordered small>
                <MDBTableHead columns={handleTable.columns} />
                <MDBTableBody rows={handleTable.rows} />
              </MDBTable>
            </MDBModalBody>
          }
          {activeItem === '2' &&
            <MDBModalBody>
              <p>Tác giả: <strong>{reportContent.authorName}</strong></p>
              <p>Tên truyện: "<strong>{reportContent.storyName}</strong>"</p>
              <p>Số lượng báo cáo: <strong>{reportContent.numberOfReports}</strong></p>
              <p>Email: <strong>{reportContent.authorEmail}</strong></p>
              {reportContent.handled &&
                <div>
                  <div style={{ display: "flex" }}>

                    <p>Trạng thái truyện:
                    <strong onClick={e => changeStatusWhenReview('story', reportContent.storyIsDisableByAdmin)} style={reportContent.storyIsDisableByAdmin ? ({ color: 'red', cursor: 'pointer' }) : ({ color: 'green', cursor: 'pointer' })}> {reportContent.storyIsDisableByAdmin ? "Đã ẩn" : "Bình thường"} </strong>
                    </p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p>Trạng thái người dùng:
                  <strong onClick={e => changeStatusWhenReview('user', reportContent.userIsDisableByAdmin)} style={reportContent.userIsDisableByAdmin ? ({ color: 'red', cursor: 'pointer' }) : ({ color: 'green', cursor: 'pointer' })}> {reportContent.userIsDisableByAdmin ? "Đã vô hiệu hóa" : "Bình thường"} </strong>
                    </p>
                  </div>

                </div>
              }
              {!reportContent.handled &&
                <div>
                  <p>Cách xử lý: </p>
                  <MDBDropdown>
                    <MDBDropdownToggle caret color="ins">
                      {handleOption}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic >
                      <MDBDropdownItem onClick={e => setHandleOption('Không có vi phạm')}>Không có vi phạm</MDBDropdownItem>
                      <MDBDropdownItem onClick={e => setHandleOption('Ẩn truyện')}>Ẩn truyện</MDBDropdownItem>
                      <MDBDropdownItem onClick={e => setHandleOption('Vô hiệu hóa tài khoản')}>Vô hiệu hóa tài khoản</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
              }





              <Pagination className="float-right" count={handleTotalPages} color="primary" boundaryCount={2} onChange={changeHandlePage} />
              <MDBTable striped hover bordered small>
                <MDBTableHead columns={handleTable.columns} />
                <MDBTableBody rows={handleTable.rows} />
              </MDBTable>
            </MDBModalBody>
          }
          {!reportContent.handled &&
            <MDBModalFooter>
              <MDBBtn color='success' onClick={e => setHandleModal(!handleModal)}>
                Hủy
                                      </MDBBtn>
              <MDBBtn color='warning' onClick={handleReportAction} >Xử lý</MDBBtn>
            </MDBModalFooter>
          }

        </MDBModal>


      </div>

    </MainLayout>

  )
}

export default ReportManagementPage;