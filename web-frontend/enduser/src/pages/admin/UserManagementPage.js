import React from "react";
import MainLayout from "../../layouts/main-layout/MainLayout";

import UserService from "../../services/user.service";
import { MDBDataTable } from "mdbreact";
import { useState, useEffect } from "react";
import { MDBBtn } from "mdbreact";
///hoi ve chuyen trang va validation

import NotFoundPage from "../../pages/common/NotFoundPage";
import { setAuthHeader } from "../../config/auth";
import Pagination from "@material-ui/lab/Pagination";
import DateTimeUtils from "../../utils/datetime";






const UserManagementPage = () => {
  const [convertedList, setConvertedList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    totalElement: 10,
    totalPages: 1,
    last: true
  });
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    getMyProfile();
    LoadUsersByPage();
  
  }, []);


  function addUser() {
    window.location.href = "/admin/users/add";
  }

  // ham nay nhan 2 tham so va 1 doi tuong goi la:
  async function HandleSetStatus(userId, callElement) {
    callElement.preventDefault();
    let url = "http://localhost:8002/api/v1/admin/users/" + userId;
    let status = callElement.target.value;
    if (status == "true") {
      url += "?setActive=false";
      callElement.target.innerText = "Deactivated";

      //TODO: cannot change inner text of button
    } else if (status == "false") {
      url += "?setActive=true";
      callElement.target.innerText = "Active";
    }

    const res = await UserService.setStatusUser(url);
  }

  async function LoadUsersByPage(event) {
    setAuthHeader(localStorage.getItem("jwt-token"));

    const res = await UserService.getUsersList(1, 10, "");
    setPageInfo({
      ...pageInfo,
      page: Number(res.data.page),
      size: Number(res.data.size),
      totalElement: Number(res.data.totalElement),
      totalPages: Number(res.data.totalPages),
      last: Boolean(res.data.last)
    });
    // setPageLenght(res.data.totalPages)
    ConvertUserList(res.data);

   

  }
  const getMyProfile = async () => {
    try {
      const res = await UserService.getMyProfile();
      if (res.data.role != "ROLE_ADMIN") {
        return <NotFoundPage></NotFoundPage>;
      }

      return res.data;
    } catch (error) {}
  };
  const changePage = async (event, value) => {
    if (value !== pageNo) {
      setPageNo(value);
      try {
        const res = await UserService.getUsersList(value, 10, "");
        ConvertUserList(res.data);
      } catch (error) {}
    }
  };

  function ConvertUserList(data) {
    var userList = data.content;
    let rowsData = [];
   

    for (var index = 0; index < userList.length; index++) {
      let rowItem = {};
      rowItem["username"] = userList[index].username;
      rowItem["username"] = (
        <a href={`/user/profile/${userList[index].id}`}>
          {rowItem["username"]}
        </a>
      );
      const id = userList[index].id;
      rowItem["name"] = userList[index].username;
      rowItem["role"] = userList[index].role;
      rowItem["active"] =
        userList[index].active == true ? (
          <MDBBtn
            color="success"
            value="true"
            onClick={e => HandleSetStatus(id, e)}
          >
            Active
          </MDBBtn>
        ) : (
          <MDBBtn
            color="deep-orange"
            value="false"
            onClick={e => HandleSetStatus(id, e)}
          >
            Deactivated
          </MDBBtn>
        );
      rowItem["email"] = userList[index].email;
      rowItem["jointAt"] = DateTimeUtils.getDateTime(userList[index].jointAt);

      rowsData.push(rowItem);
    }

    setConvertedList(rowsData);
  }

 
  const data = {
    columns: [
      {
        label: "#",
        field: "stt",
        sort: "asc",
        width: 150
      },
      {
        label: "Tên",
        field: "name",
        sort: "asc",
        width: 270
      },
      {
        label: "Vai trò",
        field: "role",
        sort: "asc",
        width: 200
      },

      {
        label: "Ngày tạo",
        field: "jointAt",
        sort: "asc",
        width: 100
      },
      {
        label: "Trạng thái",
        field: "active",
        sort: "asc",
        width: 200
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 100
      }
    ],
    rows: convertedList
  };

  return (
    <MainLayout>
      <h3 className="text-cenetr">Quản lý người dùng</h3>
      <input type="button" value="+ Account" onClick={addUser} />
      <MDBDataTable striped bordered small data={data}  entrieslabel={""} paging={false}displayEntries={false}/>
      <Pagination
        count={pageInfo.totalPages}
        color="primary"
        boundaryCount={2}
        onChange={changePage}
      />
    </MainLayout>
  );
};

export default UserManagementPage;
