import React, { useState } from 'react';
import { TextField, MenuItem, Tooltip } from '@material-ui/core';
import MainLayout from '../../../layouts/UserLayout';

import StoryParameters from './StoryParameters';
import ScreensList from './ScreensList';
import ScreensSelect from './ScreensSelect';
import MyDropdownMenu from './MyDropdownMenu';
import MyAlert from '../../../components/common/MyAlert';

import { ACTION_TYPES, INFORMATION_TYPES, NUMBER_CONDITIONS, STRING_CONDITIONS, 
    NUMBER_OPERATIONS, STRING_OPERATIONS }  from '../../../common/constants';
import StoryService from '../../../services/story.service';


const CreateStoryPage = () => {

    const [story, setStory] = useState({
        title: '',
        intro: '',
        firstScreenId: ''
    });

    const [screens, setScreens] = useState([]);
    const [storyParameters, setStoryParameters] = useState([]);
    const [currentScreen, setCurrentScreen] = useState(0);
    const [alert, setAlert] = useState({ open: false, content: '', type: 'success' });

    const parameters = [{
        type: INFORMATION_TYPES.NUMBER,
        conditions: [
            NUMBER_CONDITIONS.EQUAL,
            NUMBER_CONDITIONS.GREATER,
            NUMBER_CONDITIONS.GREATER_OR_EQUAL,
            NUMBER_CONDITIONS.LESS,
            NUMBER_CONDITIONS.LESS_OR_EQUAL,
        ],
        operations: [
            NUMBER_OPERATIONS.PLUS,
            NUMBER_OPERATIONS.MINUS,
            NUMBER_OPERATIONS.MULTIPLY,
            NUMBER_OPERATIONS.DIVIDE,
            NUMBER_OPERATIONS.REPLACE,
        ]
    },
    {
        type: INFORMATION_TYPES.STRING,
        conditions: [
            STRING_CONDITIONS.EQUAL
        ],
        operations: [
            STRING_OPERATIONS.REPLACE
        ]
    }];

    const actions = [
        ACTION_TYPES.NEXT_SCREEN, 
        ACTION_TYPES.REDIRECT,
        ACTION_TYPES.UPDATE_INFORMATION
    ]

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
    }

    const changeScreen = (prop, value, screen) => {
        screen[prop] = value;
        setScreens([...screens]);
    }

    const handleRemoveScreen = (e, screen) => {
        e.preventDefault();
        const newscreens = screens.filter(sec => sec.id !== screen.id);
        setScreens([...newscreens]);
    }

    const changeActions = (prop, value, screen, actionIndex) => {
        screen.actions.forEach((opt, index) => {
            if(index == actionIndex){
                opt[prop] = value;
            } 
        }) 
        setScreens([...screens]);
    }

    const handleAddActions = (e, screen) => {
        e.preventDefault();

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
    
    const addParameter = (e) => {
        e.preventDefault();
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
        
        story.published = isPublished;
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
                setAlert({ content: 'Khong the luu truyen', type:'error', open: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const viewStoryStructure = () => {

    }

    const actionsList = actions.filter(action => {
        if(action === ACTION_TYPES.UPDATE_INFORMATION && storyParameters.length == 0) return false;
        return true;
    })

    return (
        <MainLayout>
            <h3 className="text-center my-4">Tao truyen cho rieng ban</h3>
            <div className="container" style={{ paddingBottom: '130px' }}>
                <div className="row">
                    <div className="col-sm-9 mx-auto">
                          {/* Story */}
                          <div className="card screen-card mb-5">
                            <div className="card-header">
                                <h4 className="mb-4"></h4>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <TextField 
                                                variant="outlined"
                                                style={{ width: '100%' }}
                                                label="Tieu de truyen..."
                                                value={story.title} 
                                                onChange={(e) => changeStory('title', e.target.value)} />
                                        </div>
                                        <div className='col-sm-6'>
                                            <ScreensSelect
                                                placeholder={'Chon man hinh dau tien'}
                                                screens={screens}
                                                value={story.firstScreenId}
                                                onChange={(e) => changeStory('firstScreenId', e.target.value)} 
                                            />
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
                                <TextField 
                                    style={{ width: '100%' }}
                                    label="Noi dung gioi thieu"
                                    multiline
                                    variant="outlined"
                                    rows="3"
                                    value={story.content} 
                                    onChange={(e) => changeStory('intro', e.target.value)} />
                                
                              <div className="text-right mt-2">
                                <MyDropdownMenu >
                                    <MenuItem onClick={addParameter} >Them thong tin</MenuItem>
                                </MyDropdownMenu>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-3">
                        <h3 style={{ fontSize: '1.2em' }}>Tat ca man hinh</h3>
                        <hr style={{ border: '1px solid #ccc' }} />
                        {screens.map((screen, index) => (
                            <Tooltip 
                                title={screen.title.length == 0 ? "Chua co tieu de" : screen.title} 
                                key={screen.id}>
                                <button 
                                    style={{ width: '35px', height: '35px', padding: '0px', borderRadius: '5px' }}
                                    onClick={() => setCurrentScreen(index)}
                                    className={`btn ${currentScreen == index ? 'btn-success' : 'btn-secondary'}`} 
                                    >{index + 1}</button>
                            </Tooltip>
                        ))}
                        <br/>
                        <button 
                            className="btn btn-primary btn-block my-3" 
                            onClick={handleAddScreen}>Them man hinh</button>
                        
                        <button 
                            className="btn btn-default btn-block mb-3" 
                            onClick={() => viewStoryStructure()}>
                            Xem cau truc truyen</button>

                        <button 
                            className="btn btn-warning btn-block mb-3" 
                            onClick={() => saveStory(false)}>
                            Luu truyen</button>

                        <button 
                            className="btn btn-danger btn-block" 
                            onClick={() => saveStory(true)}>Luu va xuat ban</button>
                    </div>
                    <div className="col-sm-9">
                        <h3 style={{ fontSize: '1.2em' }}>Chi tiet man hinh</h3>
                        <hr style={{ border: '1px solid #ccc' }} />
                        {/* Story screens */}
                        <ScreensList
                            currentScreen={currentScreen}
                            screens={screens} 
                            parameters={parameters}
                            actionsList={actionsList} 
                            storyParameters={storyParameters}
                            onChangeScreen={changeScreen} 
                            onChangeActions={changeActions} 
                            onRemoveScreen={handleRemoveScreen} 
                            onAddAction={handleAddActions} 
                            onRemoveAction={handleRemoveAction}
                        />

                        {/* Add screen */}
                      

                    </div>
                </div>
            
            </div>
        
            <MyAlert/>
        </MainLayout>
    );
};


export default CreateStoryPage;
