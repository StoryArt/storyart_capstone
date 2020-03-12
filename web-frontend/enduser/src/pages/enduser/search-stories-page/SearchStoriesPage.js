import React, { useState, useEffect } from 'react';

import { MDBBtn, MDBInputGroup, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import { Select, MenuItem, Input, ListItemText, Checkbox, Chip, FormControl, InputLabel, Button } from '@material-ui/core';

import UserLayout from '../../../layouts/UserLayout';
import StoryService from '../../../services/story.service';
import TagService from '../../../services/tag.service';


import MySpinner from '../../../components/common/MySpinner';
import StoryCard from '../../../components/common/StoryCard';


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
    }

    const getTags = async () => {
        try {
            const res  = await TagService.getTags();
            setTags(res.data);
           
        } catch (error) {
            console.log9(error);
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
        setFilters({ ...filters, page: 1 });
        const stories = await getStories();
        setStories(stories);
    }

    const loadMoreStories = async () => {
        changeFilters('page', filters.page + 1);
        const data = await getStories();
        setStories([...stories, ...data]);
    }

    const toggleModal = () => {
        setOpenModal(!openModal);
    }

    const selectedTags = tags.filter(tag => filters.tags.indexOf(tag.id) > -1);

    return (
        <UserLayout>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-sm-6 mx-auto">
                    <MDBInputGroup
                        hint="Tim truyen..."
                        
                        onChange={(e) => changeFilters('keyword', e.target.value)}
                        containerClassName="mb-3"
                        append={
                            <MDBBtn onClick={toggleModal} outline className="m-0 px-3 py-2 z-depth-0">
                                Bo loc
                            </MDBBtn>
                        }
                        />
                    </div>
                </div>
                <h3 className="text-bold">Tat ca truyen</h3>
                <hr style={{ border: '1px solid #ccc' }}/>
                <div className="row">
                    {stories.map(story => (
                        <div className="col-sm-3 px-2" key={story.id}>
                          <StoryCard story={story} />
                        </div>
                    ))}
                </div>

                {(!isLoadingStories && totalPages > filters.page) && (
                    <div className="text-center">
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={loadMoreStories}>Xem them</Button>
                    </div>    
                )}

                {(isLoadingStories) && (
                   <MySpinner/>  
                )}
                
           </div>

           <MDBModal backdrop={false} isOpen={openModal} toggle={toggleModal} style={{ paddingBottom: '100px' }}>
            <MDBModalHeader toggle={toggleModal}></MDBModalHeader>
                <MDBModalBody>
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel>Chon tag yeu thich</InputLabel>
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
                       
                </MDBModalBody>
            {/* <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                <MDBBtn color="primary">Save changes</MDBBtn>
            </MDBModalFooter> */}
        </MDBModal>
        </UserLayout>
    );
};


export default SearchStoriesPage;
