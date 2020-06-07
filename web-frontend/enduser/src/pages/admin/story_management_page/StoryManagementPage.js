import React, { useState, useEffect, useRef,useContext } from 'react';
import MainLayout from '../../../layouts/main-layout/MainLayout';
import { TableContainer, Table, TableHead, TableBody, Divider,
  TableCell, TableRow, Paper, FormControl, TextField, InputAdornment, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import { Search as SearchIcon, Book as BookIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import StoryService from '../../../services/story.service';
import { getOrderBys, ORDER_BYS, getCensorshipTitle, CENSORSHIP_STATUS } from '../../../common/constants';
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import MySpinner from '../../../components/common/MySpinner';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import TagList from '../../../components/common/TagList';
import MyAlert from '../../../components/common/MyAlert';
import MyBackdrop from '../../../components/common/MyBackdrop';
import ValidationUtils from '../../../utils/validation';
import DateTimeUtils from '../../../utils/datetime';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../../../context/layout.context';
import StoryView from './StoryView';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PauseIcon from '@material-ui/icons/Pause';
import CensorshipSelect from './CensorshipSelect';

let searchTimeout = null;
let currentStory = null;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const orderBys = getOrderBys()

const StoryManagementPage =  (props) => {
  const classes = useStyles();

  const layoutContext = useContext(LayoutContext);


  const [stories, setStories] = useState([]);
  const [isLoadingStories, setIsLoadingStories] = useState(false);
  const [story, setStory] = useState({});
  const [oldStory, setOldStory] = useState({});
  const [isLoadingStory, setLoadingStory] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openStoryDialog, setOpenStoryDialog] = useState(false);
  
  const [totalPages, setTotalPages] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  // const [story, setStory] = useState(null);
  
  const [alert, setAlert] = useState({ content: '', type: 'success', open: false });
  const [filters, setFilters] = useState({
      keyword: '',
      orderBy: ORDER_BYS.DATE,
      asc: true,
      censorshipStatus: CENSORSHIP_STATUS.PENDING,
      page: 1,
      itemsPerPage: 10,
  });


  useEffect(() => {
    searchStories();

    layoutContext.setOpenSidebar(false);

    return () => {
      setStory(null);
      setStories([]);
      layoutContext.setOpenSidebar(true);
    }
  }, []);


  const changeFilters = (prop, value) => {
    filters[prop] = value;
    setFilters({ ...filters });
    if(prop === 'page'){
      searchStories();
    } 
  }

  const changePage = (e, value) => {
    changeFilters('page', value);
  }

  const getStories = async () => {
      let data = [];
      setIsLoadingStories(true);
      try {
          const res = await StoryService.getStoriesForAdmin({ ...filters });
          console.log(res);
          
          data = res.data.content;
          setTotalPages(res.data.totalPages);
      } catch (error) {
          console.log(error);
      }
      setIsLoadingStories(false);
      return data;
  }

  const getReadingStory = async (storyId) => {
    setLoadingStory(true);
    setOpenBackdrop(true);
    try {
        const res = await StoryService.getStoryForCensorship(storyId);
        console.log(res);
        const { data } = res.data;
        if (ValidationUtils.isEmpty(data)) {
            // setNotfound(true);
        } else {
            setStory({ ...data.currentStory });
            setOldStory({ ...data.oldStory });
            setOpenStoryDialog(true);
        }
    } catch (error) {
        console.log(error);
    }
    setOpenBackdrop(false);
    setLoadingStory(false);
}

  const searchStories = async () => {
      const stories = await getStories();
      setStories(stories);
  }

  const viewStory = (story) => {
    getReadingStory(story.id);
  }

  const changeStoryStatus = async () => {
    // console.log(currentStory);
    const enable = currentStory.deactiveByAdmin ? true : false;
    try {
      const res = await StoryService.changeStoryStatusByAdmin(currentStory.id, enable);
      console.log(res);
      if(res.data.success){
        const s = stories.find(st => st.id === currentStory.id);
        s.deactiveByAdmin = enable ? false : true;
        setStories([...stories]);
        setAlert({ content: 'Cập nhật thành công', type: 'success', open: true });
      } else {
        setAlert({ content: Object.values(res.data.errors)[0], type: 'error', open: true });
      }
    } catch (error) {
      console.log(error);
    }
    currentStory = null;
    closeAlert();
    setOpenDialog(false);
  }

  const closeAlert = () => {
    window.setTimeout(() => {setAlert({ ...alert, open: false })}, 3000);
  }

  const handleUpdateByAdmin = (story) => {
    console.log(story);
    currentStory = story;
    const enable = currentStory.deactiveByAdmin ? true : false;
    if(enable){
      setDialogContent('Bạn có chắc chắn muốn khôi phục truyện này chứ?')
    } else {
      setDialogContent('Bạn có chắc chắn muốn khóa truyện này chứ?')
    }
    setOpenDialog(true);
  }

  const cancel = () => {
    setOpenDialog(false);
    currentStory = null;
  }

  const changeCurrentStory = (censorship) => {
      const index = stories.findIndex(s => s.id === censorship.storyId);
      if(index > -1) {
        stories[index].censorshipStatus = censorship.censorshipStatus;
        stories[index].adminNote = censorship.adminNote;
        stories.splice(index, 1);
        setStories([...stories]);
      }
  }

  return (
    <MainLayout>
      <h3 className="text-center">Quản lý truyện</h3>
      <div className="container-fluid">
      
        <div className="row mt-5">
          <div className="col-12">
          <h3 className="">Tất cả truyện</h3>
          <hr style={{ border: '1px solid #ccc' }} />
          <Paper style={{ padding: '20px' }}>
            <div className="row">
              <div className="col-sm-3">
                <FormControl style={{ width: '100%' }}>
                  <TextField
                    // variant="outlined"
                    
                    label="Tìm truyện, tác giả..."
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
              <div className="col-sm-2">
                <FormControl style={{ width: '100%' }}>
                    <InputLabel>Sắp xếp theo</InputLabel>
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
              <div className="col-sm-1">
                <FormControl style={{ width: '100%' }}>
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
              <div className="col-sm-2">
                <CensorshipSelect 
                  onChange={(e) => changeFilters('censorshipStatus', e.target.value)} 
                  value={filters.censorshipStatus} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-right">
                <Button color="primary" onClick={searchStories}>Tìm kiếm</Button>
              </div>
            </div>
          </Paper>
          <div className="row my-3">
            <div className="col-12">
              <Pagination 
                  style={{float: 'right'}}
                  count={totalPages} 
                  page={filters.page}
                  color="primary" 
                  onChange={() => {
                    setFilters({ ...filters, page: 1 });
                    changePage();
                  }} />
            </div>
          </div>
          {isLoadingStories && <MySpinner/>}
          
          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="caption table">
                <caption>Tất cả truyện</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">Tiêu đề</TableCell>
                    <TableCell align="center">Ảnh</TableCell>
                    <TableCell align="center">Ngày tạo</TableCell>
                    <TableCell align="center">Số màn hình</TableCell>
                    <TableCell align="center">Lượt đọc</TableCell>
                    <TableCell align="center">Lượt bình luận</TableCell>
                    <TableCell align="center">Lượt đánh giá</TableCell>
                    <TableCell align="center">Đánh giá trung bình</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                    <TableCell align="center">Tác giả</TableCell>
                    <TableCell align="center">Nhãn</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { stories.map((story, index) => (
                    <TableRow key={story.id}>
                      <TableCell align="center">{(filters.page - 1) * filters.itemsPerPage + index + 1}</TableCell>
                      <TableCell align="center">{ story.title }</TableCell>
                      <TableCell align="center">
                        <img style={{ width: '80px' }}  src={story.image}/>
                      </TableCell>
                      <TableCell align="center">
                        {DateTimeUtils.getDate(story.createdAt)}
                      </TableCell>
                      <TableCell align="center">{story.numOfScreen}</TableCell>
                      <TableCell align="center">{story.numOfRead}</TableCell>
                      <TableCell align="center">{story.numOfComment}</TableCell>
                      <TableCell align="center">{story.numOfRate}</TableCell>
                      <TableCell align="center">{story.avgRate}</TableCell>
                      <TableCell align="center" style={{ whiteSpace: 'nowrap' }}>
                        {story.deactiveByAdmin ? <strong className="text-danger">ĐÃ BỊ KHÓA</strong> : <strong className="text-success">CHƯA KHÓA</strong>}</TableCell>
                      <TableCell align="center">
                        {ValidationUtils.isEmpty(story.user) ? '' : <a href={`/user/profile/${story.user.id}`} target="_blank">{story.user.name}</a>}
                      </TableCell>
                      <TableCell align="center">
                        <div style={{ maxWidth: '150px' }}>
                          <small>
                            <TagList tags={story.tags} />
                          </small>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <MyDropdownMenu>
                          <MenuItem onClick={() => viewStory(story)}>
                             Xem truyện
                          </MenuItem>
                          {/* <MenuItem>Chi tiết</MenuItem> */}
                          <Divider/>
                          <MenuItem onClick={() => handleUpdateByAdmin(story)}>
                            {story.deactiveByAdmin ? 'Khôi phục truyện' : 'Khóa truyện'}
                          </MenuItem>
                        </MyDropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          <div className="row my-3">
            <div className="col-12">
              <Pagination 
                  style={{float: 'right'}}
                  count={totalPages} 
                  page={filters.page}
                  color="primary" 
                  onChange={changePage} />
            </div>
          </div>
            <ConfirmDialog
              openDialog={openDialog}
              cancel={cancel}
              ok={changeStoryStatus}
              setOpenDialog={setOpenDialog}
              content={dialogContent}
          />

          <MyAlert 
              open={alert.open}
              setOpen={() => setAlert({ ...alert, open: true })}
              type={alert.type}
              content={alert.content}
          />
            
          </div>
        </div>
      </div>

      <StoryView 
        setAlert={setAlert}
        changeCurrentStory={changeCurrentStory}
        story={story} 
        oldStory={oldStory} 
        open={openStoryDialog} 
        setOpenBackdrop={setOpenBackdrop}
        onClose={() => setOpenStoryDialog(false)} />

      <MyBackdrop open={openBackdrop} setOpen={setOpenBackdrop} />
     
    </MainLayout>
  )
}

export default StoryManagementPage;