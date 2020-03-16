import React from "react";
import UserLayout from "../../layouts/UserLayout";

import UserService from "../../services/user.service";
import { MDBDataTable } from "mdbreact";
import { useState, useEffect } from "react";
import { MDBBtn } from "mdbreact";
///hoi ve chuyen trang va validation 

import NotFoundPage from '../../pages/common/NotFoundPage';
const UserManagementPage = () => {
  const [convertedList, setConvertedList] = useState([]);

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
    if(res.data.success){
      
    }
  }

  async function LoadUsersByPage(event) {
    const url =
      "http://localhost:8002/api/v1/admin/users/userOnly?page=" + 0 + "&size=10&s=";

    const res = await UserService.getUsersList();
// setPageLenght(res.data.totalPages)
console.log(res.data);
    ConvertUserList(res.data);
    // setUserList(res.data.content);
  }
  const getMyProfile = async () => {
    try {
      const res = await UserService.getMyProfile();
      if(res.data.role != "ROLE_ADMIN"){
        return (<NotFoundPage></NotFoundPage>)
      }
      
     return res.data;
    } catch (error) {}
  };

  function ConvertUserList(data) {
    var userList = data.content;
    let rowsData = [];
    let rowItem = {};
/*"page": 0,
    "size": 10,
    "totalElement": 12,
    "totalPages": 2,
    "last": false*/
    rowItem["totalPages"] = data.totalPages;
    rowsData.push(rowItem);
    for (var index = 0; index < userList.length; index++) {
      let rowItem = {};
      rowItem["username"] = userList[index].username;
      rowItem["username"] = (
        <a href={`/user/profile/${userList[index].id}`}>{rowItem["username"]}</a>
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
      rowItem["jointAt"] = userList[index].jointAt;

      rowsData.push(rowItem);
    }

    setConvertedList(rowsData);
  }

  useEffect(() => {
getMyProfile();

    
    LoadUsersByPage();
  }, []);

  const data = {
    columns: [
      {
        label: "Username",
        field: "username",
        sort: "asc",
        width: 150
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 270
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 200
      },
    

      {
        label: "Joint At",
        field: "jointAt",
        sort: "asc",
        width: 100
      },
      {
        label: "Status",
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
    <UserLayout>
      <h3> UserManagementPage </h3>
      <input type="button" value="+ Account" onClick={addUser}  />
      <MDBDataTable striped bordered small data={data}
       pagesAmount={convertedList.totalPages}/>
    </UserLayout>
  );
};

export default UserManagementPage;
