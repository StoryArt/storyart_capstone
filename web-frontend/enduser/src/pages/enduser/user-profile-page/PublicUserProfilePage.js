import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Input, FormControl, InputLabel } from '@material-ui/core';

import MainLayout from "../../../layouts/main-layout/MainLayout";
import UserService from '../../../services/user.service';
import TagService from '../../../services/tag.service';
import StoryService from '../../../services/story.service';
import StoryCard from '../../../components/common/StoryCard';
import MySpinner from '../../../components/common/MySpinner';
import TagsSelect from '../../../components/common/TagsSelect';
import { Pagination, Skeleton } from '@material-ui/lab';
import UserProfileHeader from './UserProfileHeader';
import NotFound from '../../../components/common/NotFound';
import ValidationUtils from '../../../utils/validation';


let searchTimeout = null;

 function PublicUserProfilePage(props) {
    const userId = props.match.params.userId;

    const [user, setUser] = useState({});
    const [isloadingUser, setLoadingUser] = useState(false);
    const [userNotfound, setUserNotfound] = useState(false);
    const [stories, setStories] = useState([]);
    const [isLoadingStories, setIsLoadingStories] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState({
        tags: [],
        keyword: '',
        userId: userId,
        page: 1,
        itemsPerPage: 12,
    });


    React.useEffect(() => {
        getUserInfo();
        getTags();
        getStories();
    }, []);

  const getUserInfo = async () => {
      setLoadingUser(true);
     
      try {
          const res = await UserService.getUserPublicProfile(userId);
          console.log(res);
          const { data, success, errors } = res.data;
          if(success){
            setUser(data);
          } else {

          }
      } catch (error) {
        console.log(error);   
      }
      setLoadingUser(false);
  }

    const getTags = async () => {
        try {
            const res  = await TagService.getTags();
            setTags(res.data);
        
        } catch (error) {
            console.log(error);
        }
    }

    const getStories = async () => {
        setIsLoadingStories(true);
        try {
            const selectedTags = filters.tags.map(t => t.id);
            const res = await StoryService.searchStoriesByUserProfile({ ...filters, tags: selectedTags });
            console.log(res);
            
            setTotalPages(res.data.totalPages);
            setStories(res.data.content);
        } catch (error) {
            console.log(error);
            setStories([]);
        }
        setIsLoadingStories(false);
    }

    const changeFilters = (prop, value) => {
        console.log(value);
        filters[prop] = value;
        setFilters({ ...filters });
        if(prop === 'keyword'){
            clearTimeout(searchTimeout);
            searchTimeout = window.setTimeout(() => {
                setFilters({ ...filters, page: 1 });
                getStories();
            }, 300);
        } else {
            getStories();
        }
    }

    const changePage = (e, value) => {
        console.log(value);
        changeFilters('page', value);
    }


  return (
    <MainLayout>
        <div className="container-fluid" style={{ marginBottom: '200px' }}>
            {isloadingUser && <MySpinner/>}

            
            {(!isloadingUser && !userNotfound && !ValidationUtils.isEmpty(user)) && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <UserProfileHeader user={user} />
                        </div>
                    </div>   
                    <h3 className="mt-5">Truyện của tác giá</h3>
                    <hr style={{ border: '1px solid #ccc' }} />
                    <div className="row">
                        <div className="col-sm-3">
                            <FormControl>
                                <InputLabel>Nhập tên truyện</InputLabel>
                                <Input
                                    value={filters.keyword}
                                    onChange={e => changeFilters('keyword', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </FormControl>
                        </div>
                        <div className="col-sm-6">
                            <TagsSelect
                                tags={tags} 
                                setSelectedTags={(tags) => changeFilters('tags', tags)}
                                selectedTags={filters.tags}
                            />
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-sm-9">
                            <Pagination 
                                style={{float: 'right'}}
                                count={totalPages} 
                                page={filters.page}
                                color="success" 
                                onChange={changePage} />
                                <div className="clearfix"></div>
                        </div>
                    </div>
                        
                    {(!isLoadingStories) && (
                        <div className="row" style={{ marginBottom: '50px' }}>
                            {stories.map(story => (
                                <div className="col-sm-6 col-md-4 col-lg-3 px-2" key={story.id}>
                                    <StoryCard story={story} />
                                </div>
                            ))}
                        </div>
                    )}

                    {(isLoadingStories) && (
                        <MySpinner/>  
                    )}

                    <div className="row my-5">
                <div className="col-sm-9">
                    <Pagination 
                        style={{float: 'right'}}
                        count={totalPages} 
                        page={filters.page}
                        color="success" 
                        onChange={changePage} />
                        <div className="clearfix"></div>
                </div>
            </div>
                </>
            )}
            
            {userNotfound && (<NotFound message={'Không tìm thấy tài khoản này'} />)}
            

                
        </div>        
    </MainLayout>
  );
}

export default withRouter(PublicUserProfilePage);