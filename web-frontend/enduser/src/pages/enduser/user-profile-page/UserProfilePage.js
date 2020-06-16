import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import {
  MDBAlert,
  MDBBtn,
} from "mdbreact";

import UserService from "../../../services/user.service";
import { UserContext } from "../../../context/user.context";
import { getAuthUserInfo, setAuthHeader, getTokenFromLocal, isUserAuth } from "../../../config/auth";
import { getOrderBys, CENSORSHIP_STATUS, ORDER_BYS } from '../../../common/constants';

import DateTimeUtils from "../../../utils/datetime";
import StoryService from "../../../services/story.service";
import { FormControl, TextField, InputLabel, Select, MenuItem, InputAdornment } from "@material-ui/core";
import { Search as SearchIcon, DataUsage as DataUsageIcon } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import TagList from '../../../components/common/TagList';
import StringUtils from "../../../utils/string";
import ValidationUtils from "../../../utils/validation";
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import MySpinner from '../../../components/common/MySpinner';
import NotFound from '../../../components/common/NotFound';
import MyAlert from '../../../components/common/MyAlert';
import MyBackdrop from '../../../components/common/MyBackdrop';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import MyDatePicker from '../../../components/common/MyDatePicker';
import UserProfileHeader from './UserProfileHeader';
import Typography from '@material-ui/core/Typography';
import UserReadingChart from "./UserReadingChart";
import StatisticService from '../../../services/statistic.service';
import UserStoriesTabs from "./UserStoriesTabs";
import UserStoriesList from "./UserStoriesList";
import UserNoteDialog from "../create-story-page/UserNoteDialog";
import CensorshipService from "../../../services/censorship.service";
import CensorshipHistoryDialog from "./CensorshipHistoryDialog";


const orderBys = getOrderBys();

let searchTimeout;

const getDateAgo = (numOfDays) => {
  const d = new Date();
  return new Date(d.setDate(d.getDate() - numOfDays));
}

const UserProfilePage = (props) => {

  const [user, setUser] = useState({});
  const [isloadingUser, setLoadingUser] = useState(false);
  const [userNotfound, setUserNotfound] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [userNotfoundMessage, setUserNotfoundMessage] = useState('');
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [isLoadingstories, setIsLoadingStories] = useState(false);
  const [dateRange, setDateRange] = useState({ from: getDateAgo(7), to: new Date() });
  const [readingStatisticData, setReadingStatisticData] = useState([]);
  const [isLoadingreadingStatisticData, setLoadingReadingStatisticData] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    orderBy: 'avg_rate',
    asc: false,
    page: 1,
    itemsPerPage: 10,
    censored: true
  });

  const [alert, setAlert] = useState({ content: '', type: 'success', open: false });
  const [dialog, setDialog] = useState({ content: '', open: false });
  const [userStoryTab, setUserStoryTab] = useState(0);
  const [noteDialog, setNoteDialog] = useState({ open: false, note: '' });
  const userInfo = getAuthUserInfo();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    await getUserInfo();
    
    if (!userNotfound && isUserAuth(userInfo)) {
      getStoriesByAuthor();
      // getReadStatistic();
    }
  }

  const getReadStatistic = async (dateRange) => {
    if (ValidationUtils.isEmpty(dateRange)) dateRange = { from: getDateAgo(7), to: new Date() };
    let { from, to } = dateRange;
    if (from > to) {
      setReadingStatisticData([]);
      return;
    }

    from = from.toLocaleDateString();
    to = to.toLocaleDateString();

    setLoadingReadingStatisticData(true);
    try {
      const res = await StatisticService.getReadStatisticsOfUser(from, to);
      const { data, success, errors } = res.data;

      if (success) {
        const formatedData = formatStatisticData(from, to, data);
        setReadingStatisticData(formatedData);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingReadingStatisticData(false);
  }

  const getStoriesByAuthor = async () => {
    setAuthHeader(getTokenFromLocal());
    setIsLoadingStories(true);
    try {
      const res = await StoryService.getStoriesByAuthor(user.id, filters);
      console.log(res);
      setAllStories(res.data);
      setStories(res.data.filter(item => item.censorshipStatus == null));
    } catch (error) {
      console.log(error);
    }
    setIsLoadingStories(false);
  };

  const getUserInfo = async () => {
    setLoadingUser(true);
    setOpenBackdrop(true);
    try {
      const token = getTokenFromLocal();
      const res = await UserService.getCurrentUser(token);
      console.log(res);
      const { data, success, errors } = res.data;
      if (success) {
        setUser(data);
      } else {
        setUserNotfound(true);
        setUserNotfoundMessage(Object.values(errors)[0]);
      }
    } catch (error) {
      setUserNotfound(true);
      console.log(error);
    }
    setLoadingUser(false);
    setOpenBackdrop(false);
  }

  const changeFilters = (prop, value) => {
    filters[prop] = value;
    setFilters({ ...filters });
    if(prop === 'keyword'){
        clearTimeout(searchTimeout);
        searchTimeout = window.setTimeout(() => {
          filterStories(filters);
        }, 300);
    } else {
      filterStories(filters);
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
      if (success) {
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
    setDialog({ open: true, content: 'Bạn có chắc chắn muốn xóa ' + story.title + '?' });
  }

  const changePublishedStatus = async (story) => {

    setAuthHeader(getTokenFromLocal());
    const turnOnPublished = !story.published;
    try {
      const res = await StoryService.changePublishedStatus(story.id, turnOnPublished);
      const { success, errors } = res.data;
      console.log(res);
      if (success) {
        setAlert({
          type: 'success',
          content: 'Cập nhật thành công',
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

  const formatStatisticData = (from, to, data) => {
    let arr = [];
    from = new Date(from);
    to = new Date(to);

    while (from <= to) {
      let dateCreatedVal = DateTimeUtils.formatStatisticDate(from);
      arr.push(dateCreatedVal);
      from = new Date(from.setDate(from.getDate() + 1));
    }
    return arr.map(dateCreated => {
      const foundItem = data.find(item => item.dateCreated == dateCreated);
      const readCount = foundItem == null ? 0 : foundItem.readCount
      return { dateCreated, readCount };
    })
  }

  const changeDateRange = (prop, value) => {
    setDateRange({ ...dateRange, [prop]: value });
    getReadStatistic({ ...dateRange, [prop]: value });
  }

  const changeStoryTab = (value) => {
    setUserStoryTab(value);
    let arr = getStoriesByCensorshipStatus(value);
    setStories(arr);
  }

  const getStoriesByCensorshipStatus = (statusValue) => {
    let arr = [];
    switch(statusValue){
      case 0: 
        arr = allStories.filter(s => ValidationUtils.isEmpty(s.censorshipStatus));
        break;
      case 1: 
        arr = allStories.filter(s => s.censorshipStatus == CENSORSHIP_STATUS.APPROVED);
        break;
      case 2: 
        arr = allStories.filter(s => s.censorshipStatus == CENSORSHIP_STATUS.PENDING);
        break;
      case 3: 
        arr = allStories.filter(s => s.censorshipStatus == CENSORSHIP_STATUS.REJECTED);
        break;
    }
    return arr;
  } 

  const filterStories = (filters) => {
    const { keyword, orderBy, asc } = filters;
    console.log(orderBy);

    let myStories = getStoriesByCensorshipStatus(userStoryTab);
    
    let newStories = myStories.filter(s => {
      return s.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });

    newStories.sort((a, b) => {
      let exp = 0;
      switch(orderBy){
        case ORDER_BYS.DATE: 
          exp = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case ORDER_BYS.AVG_RATE: exp = a.avgRate - b.avgRate; break;
        case ORDER_BYS.READ: exp = a.numOfRead - b.numOfRead; break;
        case ORDER_BYS.COMEMENT: exp = a.numOfComment - b.numOfComment; break;
        case ORDER_BYS.RATING: exp = a.numOfRate - b.numOfRate;break;
        case ORDER_BYS.SCREEN: exp = a.numOfScreen - b.numOfScreen; break;
      }
      return asc ? exp : -exp;
    });

    setStories([...newStories]);
  }

  const requestCensorship = async () => {
    setOpenBackdrop(true);
    try {
      const res = await CensorshipService.requestCensorshipByUSser({ storyId: story.id, userNote: noteDialog.note });
        console.log(res);
        const { success, errors } = res.data;
        if(success){
            setAlert({ content: 'Cập nhật thành công', type: "success", open: true });  
           
            const index = allStories.findIndex(s => s.id == story.id);
            allStories[index].censorshipStatus = CENSORSHIP_STATUS.PENDING;
            setAllStories([...allStories]);
            let i = stories.findIndex(s => s.id == story.id);
            stories.splice(i, 1);
            setStories([...stories]);
        } else {
            setAlert({ content: Object.values(errors), type: 'error', open: true });
        }
    } catch (error) {
        console.log(error);
        if (!ValidationUtils.isEmpty(error.response)) {
            setAlert({ content: Object.values(error.response.data)[0], type: 'error', open: true });
        } else {
            setAlert({ content: 'Không thể lưu kiểm duyệt', type: 'error', open: true });
        }
    }
    setNoteDialog({ ...noteDialog, open: false });
    setOpenBackdrop(false);
    closeAlert();
  }

  return (
    <MainLayout>
      <div className="container-fluid" style={{ paddingBottom: '100px' }}>
        {(!isloadingUser && !userNotfound && !ValidationUtils.isEmpty(user)) && (
          <>
            <div className="row mb-5">
              <div className="col-12">
                <UserProfileHeader user={user} canEdit={true} />
              </div>
            </div>

            {/* <h3 className="text-bold">Thống kê lượt đọc các truyện của bạn</h3> 
                <hr style={{ border: "1px solid #ccc" }} /> 
                <div className="row my-5">
                  <div className="col-12">
                    <MyDatePicker
                      date={dateRange.from}
                      setDate={(value) =>  changeDateRange('from', value)}
                      label="Tù ngày"
                    />
                    <span className="mr-4"></span>
                     <MyDatePicker
                      date={dateRange.to}
                      setDate={(value) => changeDateRange('to', value)}
                      label="Đến ngày"
                    />
                    {isLoadingreadingStatisticData && (
                      <div className="my-3">
                        <MySpinner/>
                      </div>
                    )}
                    <UserReadingChart
                      data={readingStatisticData.map(item => ({ ...item, name: 'Lượt đọc' }))}
                      dataKeyName="dateCreated"
                      dataKeyArea="readCount"
                    />
                  </div>
                </div> */}
            {isUserAuth(userInfo) && (
              <div>
                
                <h3 className="text-bold"> Truyện của bạn </h3> 
                <hr style={{ border: "1px solid #ccc" }} /> 
                                    
               
                {/* {isLoadingstories && <MySpinner/>} */}
                
                  {/* <div className="row my-3">
                    <div className="col-12">
                      <Pagination 
                          style={{float: 'right'}}
                          count={totalPages} 
                          page={filters.page}
                          color="primary"
                          onChange={changePage} />
                    </div>
                  </div> */}
                  {isLoadingstories && (
                    <div className="text-center mb-3">
                      <MySpinner/>
                    </div>
                  ) }
                    <UserStoriesTabs
                      value={userStoryTab}
                      onChange={(e, value) => changeStoryTab(value)}
                    ></UserStoriesTabs>

                      <div className="row mb-5">
                        <div className="col-12">
                        
  
                        
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
                          <div className="col-sm-2">
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
                         
                    </div>
                 
               
                     
                        
                    </div>
                     </div>
               

                  {!isLoadingstories && (
                      <UserStoriesList 
                        stories={stories}
                        readStory={readStory}
                        changePublishedStatus={changePublishedStatus}
                        handleDeleteStory={handleDeleteStory}
                        editStory={editStory}
                        onRequestCensorship={(story) => {
                          setStory({ ...story });
                          setNoteDialog({ ...noteDialog, open: true });
                        }}  />
                    )}
                              
                  {/* <div className="row my-3">
                    <div className="col-12">
                      <Pagination 
                          style={{float: 'right'}}
                          count={totalPages} 
                          page={filters.page}
                          color="primary"
                          onChange={changePage} />
                    </div>
                  </div> */}
              </div>
            )}

          </>
        )}

        {!userNotfound && <NotFound message={userNotfoundMessage} />}
      </div>

      <ConfirmDialog
        openDialog={dialog.open}
        cancel={cancel}
        ok={deleteStory}
        setOpenDialog={() => setDialog({ ...dialog, open: true })}
        content={dialog.content}
      />

        {/* <UserNoteDialog 
              open={noteDialog.open}
              onClose={() => setNoteDialog({ ...noteDialog, open: false })}
              note={noteDialog.note}
              onChange={(value) => setNoteDialog({ ...noteDialog, note: value })}
              onSaveRequestCensorship={requestCensorship} /> */}

       {!ValidationUtils.isEmpty(story) && (
          <CensorshipHistoryDialog
            story={story}
            open={noteDialog.open}
            onClose={() => setNoteDialog({ ...noteDialog, open: false })}
            note={noteDialog.note}
            onChange={(value) => setNoteDialog({ ...noteDialog, note: value })}
            onSaveRequestCensorship={requestCensorship} 
          />
       )}

      <MyBackdrop open={openBackdrop} setOpen={setOpenBackdrop}/>


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
