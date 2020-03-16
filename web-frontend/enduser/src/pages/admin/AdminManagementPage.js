
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { MDBDataTable } from "mdbreact";
import { MDBBtn } from "mdbreact";
import UserService from "../../services/user.service";

const AdminManagementPage = (props) => {
  const [adminGlobaldata, setAdminGlobaldata] = useState("");

  useEffect(() => {
    // checkIfSystemAdmin();
    LoadAdminsByPage();
  }, []);

  function addAdmin() {
    props.history.push('/admin/add');
  }

  // ham nay nhan 2 tham so va 1 doi tuong goi la:
  async function HandleSetStatus(userId, callElement) {
    //   callElement.preventDefault();
    let url = "http://localhost:8002/api/v1/systemad/admins/" + userId;
    let status = callElement.target.value;
    if (status == "true") {
      url += "?setActive=false";
      callElement.target.innerText = "Deactivated";

      //TODO: cannot change inner text of button
    } else if (status == "false") {
      url += "?setActive=true";
      callElement.target.innerText = "Active";
    }


    const res = await UserService.setStatusAdmin(url);
  }

  async function LoadAdminsByPage(event) {
    const url =
      "http://localhost:8002/api/v1/systemad/admins?page=" + 0 + "&size=10&s=";

    const res = await UserService.getAdminsList();
    console.log(res.data);
    // setPageLenght(res.data.totalPages);
    addDataToAdminGlobal(res.data);
    // setUserList(res.data.content);
  }

  // async function checkIfSystemAdmin() {
  //   try {
  //     const res = await UserService.getMyProfile();
  //     if (res.data.role != "ROLE_SYSTEM_ADMIN") {
  //       window.location = "/notfound";
  //       return <Redirect to={NotFoundPage} />;
  //     }
  //   } catch (error) {
  //     window.location = "/notfound";

  //     return <Redirect to={NotFoundPage} />;
  //   }
  // }

  function addDataToAdminGlobal(data) {
    var adminList = data.content;
    var rowsData = [];
    //   let rowItem = {};
    /*"page": 0,
      "size": 10,
      "totalElement": 12,
      "totalPages": 2,
      "last": false*/
    //   rowItem["totalPages"] = data.totalPages;
    //   rowItem["totalElement"] = data.totalElement;
    //   rowsData.push(rowItem);
    for (var index = 0; index < adminList.length; index++) {
      let rowItem = {};
      rowItem["username"] = adminList[index].username;
      rowItem["username"] = (
        <a href={`/user/${adminList[index].id}`}>{rowItem["username"]}</a>
      );
      const id = adminList[index].id;
      rowItem["name"] = adminList[index].username;
      rowItem["role"] = adminList[index].role;
      rowItem["active"] =
        adminList[index].active == true ? (
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
      rowItem["email"] = adminList[index].email;
      rowItem["jointAt"] = adminList[index].jointAt;

      rowsData.push(rowItem);
    }

    setAdminGlobaldata(rowsData);
  }
 

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
        width: 200
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 100
      }
    ],
    rows: adminGlobaldata
  };


  return (
    
    <AdminLayout>
      <h3> AdminManagementPage </h3>
      <input type="button" value="+ Account" onClick={addAdmin} />
      <MDBDataTable striped bordered small data={data} />
    </AdminLayout>
  );
};

export default AdminManagementPage;
