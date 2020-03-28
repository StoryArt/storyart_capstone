import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import {
  MDBAlert,
  MDBBtn,
} from "mdbreact";

import UserService from "../../../services/user.service";
import { UserContext } from "../../../context/user.context";
import { getAuthUserInfo, setAuthHeader, getTokenFromLocal } from "../../../config/auth";
import { getOrderBys } from '../../../common/constants';

import DateTimeUtils from "../../../utils/datetime";
import StoryService from "../../../services/story.service";
import { FormControl, TextField, InputLabel, Select, MenuItem, TableContainer, 
  Table, TableHead, TableRow, TableCell, TableBody, Divider, InputAdornment, Paper } from "@material-ui/core";
import { Search as SearchIcon } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import TagList from '../../../components/common/TagList';
import StringUtils from "../../../utils/string";
import ValidationUtils from "../../../utils/validation";
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import MySpinner from '../../../components/common/MySpinner';
import NotFound from '../../../components/common/NotFound';
import MyAlert from '../../../components/common/MyAlert';
import ConfirmDialog from '../../../components/common/ConfirmDialog';


const orderBys = getOrderBys();

let searchTimeout;

const UserProfilePage = (props) => {
  const [profile, setProfile] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [us, setUs] = useState("");
  const [email, setEmail] = useState("");
  const [intro_content, setIntro_content] = useState("");
  const [jointAt, setJointAt] = useState("");
  const [is_active, setIsActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [upfile, setUploadFile] = useState(null);
  
  const [saveAvatarBt, setSaveAvatarBt] = useState("disabled");

  const [stories, setStories] = useState([]);
  const [story, setStory] = useState(null);
  const [isLoadingstories, setIsLoadingStories] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    keyword: '',
    orderBy: 'avg_rate',
    asc: false,
    page: 1,
    itemsPerPage: 10,
  });

  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({ content: '', type: 'success', open: false });
  const [dialog, setDialog] = useState({ content: '', open: false });
  const user = getAuthUserInfo();

  useEffect(() => {
    getProfile();
    getStoriesByAuthor();
  }, []);


  async function handleUpdateProfile(event) {
    event.preventDefault();
    let user = {
      id: id,
      username: us,
      name: name,
      intro_content: intro_content,
      email: email,
      jointAt: jointAt
    };
    try {
      const res = await UserService.updateProfile(user, profile.id);
      setProfile(res.data);

      setErrorMessage(<MDBAlert color="success">Lưu thành công</MDBAlert>);
    } catch (error) {
      console.log(JSON.stringify(error));

      var err;
      if (typeof error.response.data.errors != "undefined") {
        err = error.response.data.errors[0].defaultMessage;
      } else if (typeof error.response.data.message == "string") {
        err = error.response.data.message;
      }
      setErrorMessage(<MDBAlert color="danger">{err}</MDBAlert>);
    }
  }

  const getProfile = async () => {
    try {
      setAuthHeader(localStorage.getItem("jwt-token"));
      const res = await UserService.getMyProfile();
      console.log(res.data);

      setProfile(res.data);
      setEmail(res.data.email);
      setAvatar(res.data.avatar);
      setId(res.data.id);
      setName(res.data.name);
      setUs(res.data.username);
      setIntro_content(res.data.intro_content);
      var date = new Date(res.data.jointAt);

      setJointAt(date.toString());
      setIsActive(res.data.is_active);
      setAvatar(res.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeAvatar = async file => {
    setUploadFile(file);

    var reader = new FileReader();

    reader.onload = function(e) {
      setAvatar(e.target.result);
    };

    reader.readAsDataURL(file);
    setSaveAvatarBt("");
  };

  const handleUploadAvatar = async event => {
    event.preventDefault();
    try {
      const res = await UserService.uploadAvatar(upfile);
      console.log(res);

      if (res.data.status == 200) {
        let linkImgur = res.data.data.link;
        try {
          const r2 = await UserService.saveToDatabase(id, linkImgur);
          setErrorMessage(<MDBAlert color="success">Lưu thành công!</MDBAlert>);
        } catch (error) {
          setErrorMessage(
            <MDBAlert color="danger">Lưu thất bại. Thử lại!</MDBAlert>
          );
        }
      }
    } catch (error) {
      setErrorMessage(
        <MDBAlert color="danger">Upload thất bại. Thử lại!</MDBAlert>
      );
    }
  };

  const getStoriesByAuthor = async () => {
    setAuthHeader(getTokenFromLocal());
    setIsLoadingStories(true);
    try {
      const res = await StoryService.getStoriesByAuthor(user.id, filters);
      console.log(res);
      const { content, totalPages } = res.data;
      setStories(content);
      setTotalPages(totalPages)
    } catch (error) {
      console.log(error);
    }
    setIsLoadingStories(false);
  };

  const changeFilters = (prop, value) => {
    filters[prop] = value;
    setFilters({ ...filters });
    if(prop === 'keyword'){
        clearTimeout(searchTimeout);
        searchTimeout = window.setTimeout(() => {
            setFilters({ ...filters, page: 1 });
            getStoriesByAuthor();
        }, 300);
    } else {
      getStoriesByAuthor();
    }
  }

  const changePage = (e, value) => {
    changeFilters('page', value);
  }

  const editStory = (story) => props.history.push('/stories/edit/' + story.id);

  const readStory = (story) => window.open('/stories/read/' + story.id, '_blank');

  const deleteStory = async () => {
    setDialog({ ...dialog, open: false })
    try {
      const res = await StoryService.deleteStory(story.id);
      console.log(res);
      const { success, errors } = res.data;
      if(success){
        setAlert({ type: 'success', content: 'Xóa thành công', open: true });
        getStoriesByAuthor();
      } else {
        setAlert({ type: 'error', content: Object.values(errors)[0], open: true });
      }
      
      closeAlert();
    } catch (error) {
      console.log(error);
    }
  }

  const closeAlert = () => window.setTimeout(() => setAlert({ ...alert, open: false }), 3000);

  const handleDeleteStory = (story) => {
    setStory(story);
    setDialog({ open: true, content: 'Bạn có chắc muốn xóa ' + story.title + '?' });
  }

  const changePublishedStatus = async (story) => {
    
    setAuthHeader(getTokenFromLocal());
    const turnOnPublished = !story.published;
    try {
      const res = await StoryService.changePublishedStatus(story.id, turnOnPublished);
      const { success, errors } = res.data;
      console.log(res);
      if(success){
        setAlert({ 
          type: 'success', 
          content: 'Đổi trạng thái xuất bản thành công',
          open: true
       });
        const index = stories.findIndex(s => s.id === story.id);
        stories[index].published = !story.published;
        setStories([...stories]);
      } else {
        setAlert({ 
          type: 'error', 
          content: Object.values(errors)[0],
          open: true
        });
      }
    } catch (error) {
      console.log(error);
    }
    closeAlert();
  }

  const cancel = () => {
    setStory(null);
    setDialog({ ...dialog, open: false });
  }


  const statusButton = [];

  statusButton.push(
    <MDBBtn
      style={{ padding: 0 }}
      color={profile.active ? "success" : "danger"}
    >
      {profile.active ? "Active" : "Deactivated"}
    </MDBBtn>
  );

  return (
    <MainLayout>
      <div className="container-fluid" style={{ paddingBottom: '100px' }}>
        <div className="row mb-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header ">
                <div className="row">
                  <div style={{ paddingRight: 0 }} className="col-sm-2">
                    <h2 style={{ marginRight: 0 }}>
                      <strong>Account</strong>
                    </h2>
                  </div>
                  <div style={{ padding: 0 }} className="col-sm-3">
                    {statusButton}
                  </div>
                </div> 
              </div> 
              <div className="card-body">
                {errorMessage}
                <form
                  onSubmit={handleUploadAvatar}
                  enctype="multipart/form-data"
                >
                  <div className="row">
                    {/* //avatar */}
                    <div className="form-group col-sm-6 field avatar">
                      <div className="avatar-container">
                        <label htmlFor="avatar1">
                          <strong>Avatar</strong>
                        </label>
                        <div className="avatar-80">
                          <img
                            id="avatar1"
                            name="avatar1"
                            src={avatar}
                            width="80"
                          />
                        </div>
                      </div>
                      <div className="control">
                        <input
                          type="file"
                          name="image"
                          accept=".jpg, .gif, .png"
                          onChange={e => onChangeAvatar(e.target.files[0])}
                        />
                        <p className="tips">JPG, GIF or PNG, Max size: 10MB</p>
                        <div className="form-group">
                          <button
                            disabled={saveAvatarBt}
                            className="btn float-left"
                            style={{
                              clear: "both",
                              fontSize: "1.1em",
                              margin: 0,
                              color: "#fff",
                              backgroundColor: "#007bff"
                            }}
                          >
                            Lưu avatar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <form
                  onSubmit={handleUpdateProfile}
                  // enctype="multipart/form-data"
                >
                  <div className="row">
                    <div className="col-sm-6">
                      {/* //name */}
                      <div className="form-group">
                        <label htmlFor="name">
                          <strong>Tên của bạn</strong>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          outline
                          className="form-control"
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      {/* //username */}
                      <div className="form-group">
                        <label htmlFor="username">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          id="username"
                          value={us}
                          outline
                          className="form-control"
                          onChange={e => setUs(e.target.value)}
                        />
                      </div>
                      {/* //email */}
                      <div className="form-group">
                        <label htmlFor="email">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="text"
                          id="email"
                          value={email}
                          outline
                          className="form-control"
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      {/* save button */}
                      <div className="form-group">
                         
                        <button
                          className="btn float-left"
                          style={{
                            clear: "both",
                            fontSize: "1.1em",
                            margin: 0,
                            color: "#fff",
                            backgroundColor: "#007bff"
                          }}
                        >
                          Lưu thay đổi
                        </button>
                      </div>
                    </div>
                    {/* intro */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="intro_content">
                          <strong>Giới thiệu cho mọi người về bạn</strong>
                        </label>
                        <textarea
                          
                          id="intro_content"
                          value={intro_content == null ? "" : intro_content}
                          outline
                          className="form-control text-area"
                          onChange={e => setIntro_content(e.target.value)}
                        />
                      </div>
                      Joint at:
                      {DateTimeUtils.getDateTime(jointAt)}
                    </div> 
                  </div>
                </form> 
              </div> 
            </div> 
          </div> 
        </div>
        <h3 className="text-bold"> Truyện của bạn </h3> 
        <hr style={{ border: "1px solid #ccc" }} /> 

        <div className="row my-5">
            <div className="col-sm-3">
              <FormControl>
                <TextField
                  // variant="outlined"
                  style={{ width: '100%' }}
                  label="Tìm truyện..."
                  value={filters.keyword} 
                  onChange={(e) => changeFilters('keyword', e.target.value)} 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
              </FormControl>
            </div>
            <div className="col-sm-3">
              <FormControl style={{ width: '100%' }}>
                  <InputLabel>Sắp theo</InputLabel>
                  <Select
                      value={filters.orderBy}
                      onChange={(e) => changeFilters('orderBy', e.target.value)}
                  >
                      {orderBys.map((orderBy) => (
                          <MenuItem key={orderBy.value} value={orderBy.value}>
                              {orderBy.title}
                          </MenuItem>
                      ))}
                  </Select>
              </FormControl>
            </div>
            <div className="col-sm-3">
              <FormControl >
                  <InputLabel>Thứ tự</InputLabel>
                  <Select
                      value={filters.asc}
                      onChange={(e) => changeFilters('asc', e.target.value)}
                  >
                        <MenuItem value={true}>
                            Tăng dần
                        </MenuItem>
                        <MenuItem value={false}>
                            Giảm dần
                        </MenuItem>
                  </Select>
              </FormControl>
            </div>
          </div>
        {/* {isLoadingstories && <MySpinner/>} */}

       {stories.length > 0 && (
          <>
          <div className="row my-3">
            <div className="col-12">
              <Pagination 
                  style={{float: 'right'}}
                  count={totalPages} 
                  page={filters.page}
                  onChange={changePage} />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12">
            <TableContainer component={Paper}>
                <Table aria-label="caption table">
                  <caption>Tất cả truyện</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="center">Tiêu đề</TableCell>
                      <TableCell align="center">Ảnh</TableCell>
                      {/* <TableCell align="center">Giới thiệu</TableCell> */}
                      <TableCell align="center">Số màn hình</TableCell>
                      <TableCell align="center">Số lượt đọc</TableCell>
                      <TableCell align="center">Số lượt bình luận</TableCell>
                      <TableCell align="center">Số lượt đánh giá</TableCell>
                      <TableCell align="center">Đánh giá trung bình</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="center">Nhãn</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { stories.map((story, index) => (
                      <TableRow key={story.id}>
                        <TableCell align="center">{ index + 1}</TableCell>
                        <TableCell align="center">{ story.title }</TableCell>
                        <TableCell align="center">
                          <img style={{ width: '80px' }}  src={story.image}/>
                        </TableCell>
                        <TableCell align="center">{story.numOfScreen}</TableCell>
                        <TableCell align="center">{story.numOfRead}</TableCell>
                        <TableCell align="center">{story.numOfComment}</TableCell>
                        <TableCell align="center">{story.numOfRate}</TableCell>
                        <TableCell align="center">{story.avgRate}</TableCell>
                        <TableCell align="center">{story.published ? <span className="text-success">Đã xuất bản</span> : <span className="text-danger">Chưa xuát bản</span>}</TableCell>
                        <TableCell align="center">
                          <div style={{ maxWidth: '150px' }}>
                            <small>
                              <TagList tags={story.tags} />
                            </small>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <MyDropdownMenu>
                            <MenuItem onClick={() => readStory(story)}>
                              Đọc truyên
                            </MenuItem>
                            <MenuItem onClick={() => editStory(story)}>
                              Cập nhật
                            </MenuItem>
                            <MenuItem onClick={() => changePublishedStatus(story)}>
                              {story.published ? 'Hủy xuất bản truyện' : 'Xuất bản truyện'}
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={() => handleDeleteStory(story)}>
                              Xóa truyện
                            </MenuItem>
                          </MyDropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
        </div>
                      
          <div className="row my-3">
            <div className="col-12">
              <Pagination 
                  style={{float: 'right'}}
                  count={totalPages} 
                  page={filters.page}
                  onChange={changePage} />
            </div>
          </div>
        </>
       )}
      

        {(!isLoadingstories && stories.length == 0) && <NotFound message="Không tìm thấy truyện nào..." />}
        
      </div> 
      <ConfirmDialog
          openDialog={dialog.open}
          cancel={cancel}
          ok={deleteStory}
          setOpenDialog={() => setDialog({ ...dialog, open: true })}
          content={dialog.content}
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

export default UserProfilePage;
