import React, { useState, useEffect } from 'react';

import { MDBBtn, MDBCard, MDBCardBody, MDBFormInline, MDBIcon } from 'mdbreact';
import { Select, MenuItem, Input, ListItemText, Checkbox, Chip, FormControl, InputLabel } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import MainLayout from '../../../layouts/main-layout/MainLayout';
import StoryService from '../../../services/story.service';
import TagService from '../../../services/tag.service';


import MySpinner from '../../../components/common/MySpinner';
import StoryCard from '../../../components/common/StoryCard';
import TagList from '../../../components/common/TagList';

let searchTimeout = null;

const SearchStoriesPage = () => {

    const [stories, setStories] = useState([]);
    const [isLoadingStories, setIsLoadingStories] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState({
        tags: [],
        keyword: '',
        page: 1,
        itemsPerPage: 12,
    });
    const [openModal, setOpenModal] = useState(false);

    useEffect( () => {
        getTags();
        searchStories();
    }, []);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
    };

    const changeFilters = (prop, value) => {
        filters[prop] = value;
        setFilters({ ...filters });
        if(prop === 'tags') return;
        if(prop === 'keyword'){
            clearTimeout(searchTimeout);
            searchTimeout = window.setTimeout(() => {
                setFilters({ ...filters, page: 1 });
                searchStories();
            }, 300);
        } else {
            searchStories();
        }
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
        let data = [];
        setIsLoadingStories(true);
        try {
            const res = await StoryService.searchStories({ 
                ...filters, 
                isActive: true, 
                isPublished: true, 
            });
            console.log(res);
            
            data = res.data.content;
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
        setIsLoadingStories(false);
        return data;
    }

    const searchStories = async () => {
        const stories = await getStories();
        setStories(stories);
    }
  
    const handleSearch = (e) => {
        e.preventDefault();
        searchStories();
    }

    const toggleModal = () => {
        setOpenModal(!openModal);
    }

    const changePage = (e, value) => {
        console.log(value);
        changeFilters('page', value);
    }

    const selectedTags = tags.filter(tag => filters.tags.indexOf(tag.id) > -1);

    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-12">
                        <MDBCard className="mb-5">
                            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                               <div className="col-6">
                                    <FormControl style={{ width: '100%' }}>
                                    <InputLabel>Chọn tag yêu thích</InputLabel>
                                    <Select
                                        multiple
                                        value={filters.tags}
                                        onChange={(e) => changeFilters('tags', e.target.value)}
                                        input={<Input />}
                                        renderValue={selected => (
                                            <div>
                                                {selectedTags.map(tag => (
                                                    <Chip key={tag.id} label={tag.title} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {tags.map(tag => (
                                            <MenuItem key={tag.id} value={tag.id}>
                                                <Checkbox checked={filters.tags.indexOf(tag.id) > -1} />
                                                <ListItemText primary={tag.title} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                    
                                </FormControl>
                               </div>
                               <div className="col-6 mt-3">
                                    <MDBFormInline 
                                        style={{ width: '100%' }}
                                        className="md-form m-0" onSubmit={e => e.preventDefault()}>
                                        <input 
                                            className="form-control form-control-sm" type="search" 
                                            onChange={(e) => changeFilters('keyword', e.target.value)}
                                            placeholder="Tìm kiếm truyện" aria-label="Search"/>
                                        <MDBBtn 
                                            size="sm" 
                                            color="success" 
                                            className="my-0" 
                                            type="submit">
                                                <MDBIcon icon="search" />
                                        </MDBBtn>
                                    </MDBFormInline>
                               </div>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="text-bold">Tất cả truyện</h3>
                    </div>
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
                
                <hr style={{ border: '1px solid #ccc' }}/>
                {(!isLoadingStories) && (
                    <div className="row" style={{ marginBottom: '50px' }}>
                        {stories.map(story => (
                            <div className="col-sm-3 px-2" key={story.id}>
                                <StoryCard story={story} />
                            </div>
                        ))}
                    </div>
                )}

                {(isLoadingStories) && (
                   <MySpinner/>  
                )}
                
           </div>
        </MainLayout>
    );
};


export default SearchStoriesPage;
