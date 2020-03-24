import React, { useState, useEffect } from 'react';
import { getParameters, getActions, getAnimations, 
    ANIMATIONS, ACTION_TYPES, INFORMATION_TYPES,  }  from '../common/constants';
    
    
import StoryService from '../services/story.service';
import ValidationUtils from '../utils/validation';

export const CreateStoryPageContext = React.createContext();

export const CreateStoryPageProvider = (props) => {
   
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
            setCurrentScreen(currentScreen);
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

   

    useEffect(() => {   
        
    }, []);
    
   
    const state = { story, storyParameters, screens, currentScreen, alert, openScreenPreview };
    const methods = { changeStory, handleAddScreen, changeScreen, handleRemoveScreen,
    changeActions, handleAddActions, handleRemoveAction, changeParam, addParameter, removeParam, 
    addParamConditions, changeParamConditions, removeParamCondition, closeScreenPreview, 
    setAlert, setCurrentScreen, setOpenScreenPreview };

    return (
        <CreateStoryPageContext.Provider value={{
            ...state,
            ...methods
        }}>
            { props.children }
        </CreateStoryPageContext.Provider>
    )
}