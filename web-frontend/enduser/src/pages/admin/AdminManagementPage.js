import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { MDBDataTable } from "mdbreact";
import { MDBBtn } from "mdbreact";
import UserService from "../../services/user.service";
import { setAuthHeader } from "../../config/auth";
import Pagination from "@material-ui/lab/Pagination";

const AdminManagementPage = props => {
  const [adminGlobaldata, setAdminGlobaldata] = useState("");
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    totalElement: 10,
    totalPages: 1,
    last: true
  });
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    // checkIfSystemAdmin();
    LoadAdminsByPage();
  }, []);

  useEffect(() => {
    // checkIfSystemAdmin();
    LoadAdminsByPage();
  }, []);

  const changePage = async (event, value) => {
    if (value !== pageNo) {
      setPageNo(value);
      try {
        const res = await UserService.getAdminsList(value, 10, "");
        setPageInfo({
          ...pageInfo,
          page: Number(res.data.page),
          size: Number(res.data.size),
          totalElement: Number(res.data.totalElement),
          totalPages: Number(res.data.totalPages),
          last: Boolean(res.data.last)
        });
        addDataToAdminGlobal(res.data);
      } catch (error) {}
    }
  };
  
  function addAdmin() {
    props.history.push("/admin/add");
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
    setAuthHeader(localStorage.getItem("jwt-token"));
    const res = await UserService.getAdminsList(1, 10, "");
    addDataToAdminGlobal(res.data);
  }

  function addDataToAdminGlobal(data) {
    var adminList = data.content;
    var rowsData = [];

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
            color="danger"
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
      <MDBDataTable
        striped
        bordered
        small
        data={data}
        entrieslabel={""}
        paging={false}
        displayEntries={false}
      />
      <Pagination
        // count={pageInfo.totalPages}
        color="primary"
        boundaryCount={2}
        onChange={changePage}
      />
    </AdminLayout>
  );
};

export default AdminManagementPage;
