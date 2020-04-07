import React from "react";
import MainLayout from "../../layouts/main-layout/MainLayout";
import Button from "@material-ui/core/Button";
import UserService from "../../services/user.service";
import { MDBDataTable } from "mdbreact";
import { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { setAuthHeader, getTokenFromLocal } from "../../config/auth";
import Pagination from "@material-ui/lab/Pagination";
import DateTimeUtils from "../../utils/datetime";
import MyAlert from "../../components/common/MyAlert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBInput, MDBAlert } from "mdbreact";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import OutlinedInput from "@material-ui/core/OutlinedInput";
const useStyles = makeStyles((theme) => ({
  paging: {
    marginBottom: "1rem",
  },
  button: {  outline:"none",
    // fontFamily: ["Roboto", "Helvetica", "Arial"],
    // backgroundColor: "#719e7c",
    // color: "white",
    // marginLeft: "10px",
    // paddingRight: "0px",

    "&:hover": {
      backgroundColor: "#53825e",
      boxShadow: "none",
    }
  },

  h3: {
    fontWeight: "600",
    marginBottom: "1.4rem",
    fontSize:"32px"
  },
  active: {
    outline: "none",
    fontFamily: ["Roboto", "Helvetica", "Arial"],
    backgroundColor: "#42e6a4",
    color: "#000000",
    fontSize:"11px",
    padding:"2px 10px",
    borderRadius:"10px",
      textTransform: 'lowercase',

    "&:hover": {
      backgroundColor: "#53825e",
      boxShadow: "none",
    },
  },
  deactive: {
    
    fontFamily: ["Roboto", "Helvetica", "Arial","Times New Roman", "Verdana","Calibri"],
    backgroundColor: "#d7385e",
    color: "white",
    padding:"2px",
    fontSize:"11px",
    borderRadius:"10px",


    padding:"2px 2px",
    
   
      textTransform: 'lowercase',
    "&:hover": {
      backgroundColor: "#ab1d3f",
      boxShadow: "none",
    },
  },
}));
const AdminManagementPage = (props) => {
  const classes = useStyles();
  const [adminGlobaldata, setAdminGlobaldata] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    totalElement: 10,
    totalPages: 1,
    last: true,
  });
  const [openDialog, setOpenDialog] = useState({
    isOpen: false,
    id: 0,
    status: false,
    content: "",
  });
  const [pageNo, setPageNo] = useState(1);
  const [searchtxt, setSearchTxt] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [intro_content, setIntro_content] = useState("");
  const [errorMessage, setAddAdminMessage] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    content: "",
  });
  useEffect(() => {
    // checkIfSystemAdmin();
    FirstLoadAdmins();
  }, []);

  async function handleAddAdmin(event) {
    event.preventDefault();
    let user = {
      username: username,
      password: password,
      intro_content: intro_content,
      email: email,
      name: name,
    };
    try {
      setAuthHeader(localStorage.getItem("jwt-token"));

      const res = await UserService.addAdmin(user);

      console.log(res.data);

      if (res.data.success == true) {
        setAddAdminMessage(
          <MDBAlert color="success">{res.data.message}</MDBAlert>
        );
        window.setTimeout(function () {
          // Move to a new location or you can do something else
          // window.location.href = "/sysadmin/admin";
          handleClose();
          reloadTable();
          setAddAdminMessage("");
        }, 2000);
      }
    } catch (error) {
      console.log(JSON.stringify(error));

      var err;
      if (typeof error.response.data.errors != "undefined") {
        err = error.response.data.errors[0].defaultMessage;
      } else if (typeof error.response.data.message == "string") {
        err = error.response.data.message;
      }

      setAddAdminMessage(<MDBAlert color="danger">{err}</MDBAlert>);
    }
  }
  

  const changePage = async (event, value) => {
    if (value !== pageNo) {
      setPageNo(value);
      try {
        const res = await UserService.getAdminsList(value, 10, searchtxt);
        setPageInfo({
          ...pageInfo,
          page: Number(res.data.page),
          size: Number(res.data.size),
          totalElement: Number(res.data.totalElement),
          totalPages: Number(res.data.totalPages),
          last: Boolean(res.data.last),
        });
        loadDataToTable(res.data);
      } catch (error) {}
    }
  };

  async function handleSetStatus(callElement) {
    callElement.preventDefault();

    setOpenDialog({ openDialog: false });
    let userId = openDialog.id;
    let status = openDialog.status;
   
    const res = await UserService.setStatusAdmin(userId, status).then((res) => {
      reloadTable();
    });
  }
  const reloadTable = async () => {
    try {
      const res = await UserService.getAdminsList(pageNo, 10, searchtxt);
      loadDataToTable(res.data);
    } catch (error) {}
  };

  async function FirstLoadAdmins() {
    setAuthHeader(getTokenFromLocal());
    const res = await UserService.getAdminsList(1, 10, searchtxt);

    setPageInfo({
      ...pageInfo,
      page: Number(res.data.page),
      size: Number(res.data.size),
      totalElement: Number(res.data.totalElement),
      totalPages: Number(res.data.totalPages),
      last: Boolean(res.data.last),
    });
    loadDataToTable(res.data);
  }

  function loadDataToTable(data) {
    var userList = data.content;
    var rowsData = [];

    for (var index = 0; index < userList.length; index++) {
      let rowItem = {};
      rowItem["stt"] = userList[index].id;
      rowItem["username"] = (
        <a href={`/user/${userList[index].id}`}>{rowItem["username"]}</a>
      );
      const id = userList[index].id;
      rowItem["name"] = userList[index].username;
      // rowItem["role"] = userList[index].role;
      rowItem["deactiveByAdmin"] =
        userList[index].deactiveByAdmin == false ? (
          <Button
            className={classes.active}
            value="true"
            onClick={(e) =>
              setOpenDialog({
                isOpen: true,
                id: id,
                status: false,
                content: "Khóa tài khoản?",
              })
            }
          >
            Đang hoạt động
          </Button>
        ) : (
          <Button
            className={classes.deactive}
            onClick={(e) =>
              setOpenDialog({
                isOpen: true,
                id: id,
                status: true,
                content: "Mở tài khoản?",
              })
            }
          >
            Đã khóa
          </Button>
        );
      rowItem["email"] = userList[index].email;
      rowItem["jointAt"] = DateTimeUtils.getDateTime(userList[index].jointAt);

      rowsData.push(rowItem);
    }

    setAdminGlobaldata(rowsData);
  }
  const [open, setOpen] = useState(false);

  const openDialogAddAccount = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSearchAccount(event) {
    console.log(event.target.tagName);
    if (event.keyCode == 13 || event.target.tagName == "svg") {
      setAuthHeader(localStorage.getItem("jwt-token"));
      let searchValue = "";
      if (event.keyCode == 13) {
        searchValue = event.target.value;
      }
      if (event.target.tagName == "svg") {
        searchValue = searchtxt;
      }
      const res = await UserService.getAdminsList(pageNo, 10, searchValue);
      setPageInfo({
        ...pageInfo,
        page: Number(res.data.page),
        size: Number(res.data.size),
        totalElement: Number(res.data.totalElement),
        totalPages: Number(res.data.totalPages),
        last: Boolean(res.data.last),
      });
      // setPageLenght(res.data.totalPages)
      loadDataToTable(res.data);
      setAlert({
        open: true,
        content: "Tìm thấy " + res.data.totalElement + " kết quả",
        type: "success",
      });
      closeAlert();
    }
  }

  const data = {
    columns: [
      {
        label: "ID",
        field: "stt",
        sort: "asc",
        width: 150,
      },
      {
        label: "Tên",
        field: "name",
        sort: "asc",
        width: 270,
      },
      // {
      //   label: "Vai trò",
      //   field: "role",
      //   sort: "asc",
      //   width: 200,
      // },

      {
        label: "Ngày tạo",
        field: "jointAt",
        sort: "asc",
        width: 100,
      },
      {
        label: "Trạng thái",
        field: "deactiveByAdmin",
        sort: "asc",
        width: 100,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 100,
      },
    ],
    rows: adminGlobaldata,
  };
  const closeAlert = () =>
    window.setTimeout(() => setAlert({ ...alert, open: false }), 3000);

  return (
    <MainLayout>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Tạo tài khoản quản trị viên
        </DialogTitle>
        <form onSubmit={handleAddAdmin}>
          <DialogContent>
            {errorMessage}

            <div className="row">
              <div className="col-sm-6">
                <MDBInput
                  value={username}
                  label="Tên đăng nhập"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <MDBInput
                  value={name}
                  label="Tên đầy đủ "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <MDBInput
                  value={email}
                  type="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <MDBInput
                  value={password}
                  type="password"
                  label="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12">
                <MDBInput
                  type="textarea"
                  rows="3"
                  value={intro_content}
                  label="Thông tin giới thiệu"
                  onChange={(e) => setIntro_content(e.target.value)}
                />
              </div>
            </div>
            {/* <button className="btn btn-success float-right ml-0" type="submit">
              Lưu
            </button> */}

            <div className="clearfix"></div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Thoát
            </Button>

            <Button className={classes.button} type="submit">
              Lưu
            </Button>
           
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        openDialog={openDialog.isOpen}
        cancel={() => setOpenDialog(false)}
        ok={handleSetStatus}
        setOpenDialog={setOpenDialog}
        content={openDialog.content}
      />
      <h3 className={classes.h3}>
        Danh sách quản trị viên
        <Tooltip title="Thêm quản trị viên" aria-label="add">
          <IconButton onClick={openDialogAddAccount} className={classes.button}>
          <PersonAddIcon />
          </IconButton>
          {/* <Button
            className={classes.button}
            startIcon={<PersonAddIcon />}
            onClick={openDialogAddAccount}
          ></Button> */}
        </Tooltip>
        <Tooltip title="theo tên đăng nhập và email " aria-label="add">
          <OutlinedInput
          placeholder="Tìm kiếm"

            className="float-right"
            id="outlined-search"
            onKeyDown={handleSearchAccount}
            type="search"
            variant="outlined"
            value={searchtxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  // aria-label="toggle password visibility"
                  // onClick={handleSearchAccount}
                  edge="end"
                >
                  <SearchIcon onClick={handleSearchAccount} />
                </IconButton>
              </InputAdornment>
            }
          />
        </Tooltip>
      </h3>

      <Pagination
        count={pageInfo.totalPages}
        boundaryCount={2}
        showFirstButton
        showLastButton
        color="primary"
        onChange={changePage}
        // onClick={changePage}
        variant="outlined"
        className={classes.paging}
      />
      <MDBDataTable
        searching={false}
        striped
        bordered
        small
        data={data}
        entrieslabel={""}
        paging={false}
        displayEntries={false}
      />

      <MyAlert
        open={alert.open}
        setOpen={() => setAlert({ ...alert, open: true })}
        type={alert.type}
        content={alert.content}
      />
    </MainLayout>
  );
};

export default AdminManagementPage;
