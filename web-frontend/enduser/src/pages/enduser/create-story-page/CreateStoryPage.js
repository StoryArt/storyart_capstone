import React, { useState, useContext } from 'react';
import { TextField, MenuItem, Tooltip, Fab, FormControl, Select, InputLabel } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Add as AddIcon } from '@material-ui/icons';
import MainLayout from '../../../layouts/main-layout/MainLayout';

import StoryParameters from './StoryParameters';
import ScreensList from './ScreensList';
import ScreensSelect from './ScreensSelect';
import AllScreenSnapshots from './AllScreenSnapshots';
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import MyAlert from '../../../components/common/MyAlert';
import MyEditor from '../../../components/common/MyEditor';
import ScreenPreview from './ScreenPreview';
// import { CreateStoryPageContext, CreateStoryPageProvider } from '../../../context/CreateStoryPageContext';


import { getParameters, getActions, getAnimations, 
ANIMATIONS, ACTION_TYPES, INFORMATION_TYPES,  }  from '../../../common/constants';


import StoryService from '../../../services/story.service';
import ValidationUtils from '../../../utils/validation';
import StringUtils from '../../../utils/string';
import { screen } from '@testing-library/react';


const CreateStoryPage = () => {


    const animations = getAnimations();

    const parameters = getParameters();
    
    const actions = getActions();

    const [story, setStory] = useState({
        title: '',
        intro: '',
        animation: ANIMATIONS.FADE,
        isPublished: false,
        firstScreenId: ''
    });

    const [screens, setScreens] = useState([]);
    const [storyParameters, setStoryParameters] = useState([]);
    const [currentScreen, setCurrentScreen] = useState(null);
    const [alert, setAlert] = useState({ open: false, content: '', type: 'success' });
    const [openScreenPreview, setOpenScreenPreview] = useState(false);
    const [screenSnapshotsPage, setScreenSnapshotsPage] = useState({ page: 1 });
    
    const changeStory = (prop, value) => {
        setStory({ ...story, [prop]: value });
    }

    const handleAddScreen = () => {
        const newScreen = {
            id: Math.random().toString(),
            title: '',
            content: '', 
            actions: [],
            nextScreenId: '',
        };
        screens.push(newScreen);
        setScreens([...screens]);

        if(screens.length == 1) {
            setCurrentScreen(newScreen);
        }
    }

    const changeScreen = (prop, value, screen) => {
        screen[prop] = value;
        setScreens([...screens]);
    }

    const handleRemoveScreen = async (screen) => {
        const newscreens = screens.filter(sec => sec.id !== screen.id);
        if(currentScreen === screen){
            window.setTimeout(() => setCurrentScreen(null), 0)
        }
        setScreens(newscreens);
    }

    const changeActions = (prop, value, screen, actionIndex) => {
        screen.actions.forEach((opt, index) => {
            if(index == actionIndex){
                opt[prop] = value;
            } 
        }) 
        setScreens([...screens]);
    }

    const handleAddActions = (screen) => {
        const newaction = {
            id: Math.random().toString(),
            content: '',
            type: ACTION_TYPES.REDIRECT,
            operation: '',            
            value: '',
            nextScreenId: ''
        }
        
        screen.actions.push(newaction);
        setScreens([...screens]);
    }

    const handleRemoveAction = (screen, index) => {
        screen.actions.splice(index, 1);
        setScreens([...screens]);
    } 

    const changeParam = (prop, value, param, cond) => {
        param[prop] = value;
        setStoryParameters([...storyParameters]);
    }
    
    const addParameter = () => {
        if(storyParameters.length > 0) return alert('Chi duoc them 1 thong tin');
        const newParam =  {
            id: Math.random().toString(),
            type: INFORMATION_TYPES.NUMBER, //string, number, date,
            name: '',
            value: 100,
            conditions: []
        };
        setStoryParameters([newParam])
    }

    const removeParam = (index) => {
        storyParameters.splice(index, 1);
        setStoryParameters([...storyParameters]);
    }

    const addParamConditions = (param) => {
        param.conditions.push({
            id: Math.random().toString(),
            type: '>',
            value: 0,
            nextScreenId: '1'
        });
        setStoryParameters([...storyParameters]);
    }

    const changeParamConditions = (prop, value, condIndex, param) => {
        param.conditions[condIndex][prop] = value;
        setStoryParameters([...storyParameters]);
    }

    const removeParamCondition = (param, condIndex) => {
        param.conditions.splice(condIndex, 1);
        setStoryParameters([...storyParameters]);
    }

    const closeScreenPreview = () => setOpenScreenPreview(false);

   
    const saveStory = async (isPublished) =>  {
        let informationActions = [];

        if(storyParameters.length > 0){
            screens.forEach(screen => {
                screen.actions.forEach(action => {
                    if(action.type === ACTION_TYPES.UPDATE_INFORMATION){
                        informationActions.push({
                            actionId: action.id,
                            informationId: storyParameters[0].id,
                            value: action.value,
                            operation: action.operation
                        })
                    }
                })
            });
        }
        
        story.isPublished = isPublished;
        story.screens = screens;
        story.informations = storyParameters;
        story.informationActions = informationActions;

        console.log(story);

        try {
            const res = await StoryService.createStory(story);
            console.log(res);
            const { success } = res.data;

            if(success) {
                let msg = 'Luu thanh cong';
                if(story.isPublished) msg = 'Luu va xuat ban thanh cong';
                setAlert({ content: msg, type:'success', open: true });
            } else {
                
            }
        } catch (error) {
            console.log(error);
            setAlert({ content: 'Khong the luu truyen', type:'error', open: true });
        }
    }

    const viewStoryStructure = () => {

    }

    const actionsList = actions.filter(action => {
        if(action === ACTION_TYPES.UPDATE_INFORMATION && storyParameters.length == 0) return false;
        return true;
    });

    const findScreenById = (id) => screens.find(s => s.id === id);

    const screenSnapshots = screens.filter((s, index) => {
        return index >= (screenSnapshotsPage.page - 1) * 10 && index < screenSnapshotsPage.page * 10;  
    });
    
    const numOfPageScreenSnapshots = Math.ceil(screens.length / 10);

    return (
        <MainLayout>
    
            <h3 className="text-center my-4">Tạo truyện cho riêng bạn</h3>
            <div className="container" style={{ paddingBottom: '130px' }}>
                <div className="row mb-4">
                    <div className="col-sm-9 mx-auto">
                        {/* Story */}
                        <div className="card screen-card mb-2">
                            <div className="card-header">
                                <h4 className="mb-4"></h4>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <TextField 
                                                variant="outlined"
                                                style={{ width: '100%' }}
                                                label="Tiêu đề truyện..."
                                                value={story.title} 
                                                onChange={(e) => changeStory('title', e.target.value)} />
                                        </div>
                                        <div className='col-sm-4'>
                                            <ScreensSelect
                                                placeholder={'Chọn màn hình đầu tiên'}
                                                screens={screens}
                                                value={story.firstScreenId}
                                                onChange={(e) => changeStory('firstScreenId', e.target.value)} 
                                            />
                                        </div>

                                        <div className='col-sm-4'>
                                            <FormControl variant="outlined" style={{ width: '100%' }}>
                                                <InputLabel>Chọn hiệu ứng màn hình</InputLabel>
                                                <Select
                                                    value={story.animation}
                                                    onChange={(e) => changeStory('animation', e.target.value)}
                                                >
                                                    {animations.map((animation) => (
                                                        <MenuItem key={animation} value={animation}>
                                                            {animation}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <StoryParameters 
                                        parameters={parameters}
                                        storyParameters={storyParameters}
                                        screens={screens}
                                        onChangeParam={changeParam} 
                                        onAddParamConditions={addParamConditions} 
                                        onChangeParamConditions={changeParamConditions} 
                                        onRemoveParamCondition={removeParamCondition}
                                        onRemoveParam={removeParam} />
                                
                            </div>
                            <div className="card-body">
                                <MyEditor
                                    placeholder="Nội dung giới thiệu"
                                    value={story.intro}
                                    onChange={(value) => changeStory('intro', value)}
                                />
                                
                                <div className="text-right mt-2">
                                    <MyDropdownMenu >
                                        <MenuItem onClick={addParameter} >Thêm thông tin</MenuItem>
                                    </MyDropdownMenu>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <button 
                                className="btn btn-default float-right" 
                                onClick={() => viewStoryStructure()}>
                                Xem cấu trúc truyện</button>

                            <button 
                                className="btn btn-warning float-right" 
                                onClick={() => saveStory(false)}>
                                Lưu truyện</button>

                            <button 
                                className="btn btn-danger float-right" 
                                onClick={() => saveStory(true)}>Lưu và xuất bản</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-3 px-1">
                        <h3 style={{ fontSize: '1.2em' }}>
                            <span className="mr-2">Tất cả màn hình ({screens.length})</span>
                            <Tooltip title="Thêm màn hình" aria-label="add" placement="top">
                                <Fab 
                                    color="primary" 
                                    style={{ width: '35px', height: '35px' }} 
                                    onClick={handleAddScreen}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        
                        </h3>
                        <hr style={{ border: '1px solid #ccc' }} />
                        
                        <Pagination 
                            count={numOfPageScreenSnapshots} 
                            page={screenSnapshotsPage.page}
                            color="success" 
                            onChange={(e, value) => setScreenSnapshotsPage({ page: value })} 
                            size="small" />

                        <AllScreenSnapshots
                            page={screenSnapshotsPage.page}
                            screens={screenSnapshots}
                            setCurrentScreen={(id) => setCurrentScreen(findScreenById(id))}
                            currentScreen={currentScreen}
                            onRemoveScreen={id => handleRemoveScreen(findScreenById(id))}
                        />

                        <br/>
                    
                    </div>
                    <div className="col-sm-9">
                        <h3 style={{ fontSize: '1.2em' }}>Chi tiết màn hình</h3>
                        <hr style={{ border: '1px solid #ccc' }} />
                        {/* Story screens */}
                        <ScreensList
                            currentScreen={currentScreen}
                            screens={screens} 
                            parameters={parameters}
                            actionsList={actionsList} 
                            storyParameters={storyParameters}
                            onShowScreenPreview={() => setOpenScreenPreview(true)}
                            onChangeScreen={changeScreen} 
                            onChangeActions={changeActions} 
                            onRemoveScreen={handleRemoveScreen} 
                            onAddAction={handleAddActions} 
                            onRemoveAction={handleRemoveAction}
                        />
                    </div>
                </div>
            </div>
        
            <MyAlert alert={alert}/>
            <ScreenPreview 
                open={openScreenPreview}
                onClose={closeScreenPreview}
                screen={currentScreen}
            />
        </MainLayout>
    
       
    );
};



export default CreateStoryPage;
