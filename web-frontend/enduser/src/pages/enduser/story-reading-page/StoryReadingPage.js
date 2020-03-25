import React, { useState, useEffect } from 'react';
import { Spring, Transition, animated } from 'react-spring/renderprops';
import Fullscreen from "react-full-screen";
import { Zoom, Fade, Collapse, Slide, Grow, IconButton, Tooltip } from '@material-ui/core';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import MainLayout from '../../../layouts/main-layout/MainLayout';
import StoryService from '../../../services/story.service';
import ValidationUtils from '../../../utils/validation';
import StringUtils from '../../../utils/string';
import { ACTION_TYPES, INFORMATION_TYPES, STRING_OPERATIONS,
     NUMBER_OPERATIONS, STRING_CONDITIONS, NUMBER_CONDITIONS, ANIMATIONS } from '../../../common/constants';

import MySpinner from '../../../components/common/MySpinner';
import NotFound from '../../../components/common/NotFound';
import ScreenShow from '../../../components/common/ScreenShow';
import SocialShare from '../../../components/common/SocialShare';

const ReadStoryPage = (props) => {

    const [story, setStory] = useState({});
    const [screens, setScreens] = useState([]);
    const [informations, setInformations] = useState([]);
    const [informationActions, setInformationActions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notfound, setNotfound] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);

    const [currentScreen, setCurrentScreen] = useState({});
    const [showScreen, setShowScreen] = useState(false);
    const [selectedScreens, setSelectedScreens] = useState([]);
    const [selectedActions, setSelectedActions] = useState([]);
    const [userInformation, setUserInformation] = useState([]);

    useEffect(() => {
        const { storyId } = props.match.params;
        getReadingStory(storyId);
    }, []);

    const changeCurrentScreen = (screenId) => {
        setShowScreen(false);
        const screen = screens.find(scr => scr.id === screenId);
        setTimeout(() => {
            setCurrentScreen(screen)
            setShowScreen(true)
        }, 1000);
        
    }
  
    const getReadingStory = async (storyId) => {
        setIsLoading(true);
        try {
            const res = await StoryService.getReadingStory(storyId);    
           
            const { data } = res.data;
            if(ValidationUtils.isEmpty(data)){
                setNotfound(true);
            } else {
                console.log(data)
                setScreens(data.screens);
                setInformations(data.informations);
                setInformationActions(data.informationActions);
                
                setStory({ ...data, screens: null, informations: null, informationActions: null });
            }
           
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const handleSelectAction = (action) => {
       
        const foundInformation = informations[0];
        if(informations.length > 0 && action.type === ACTION_TYPES.UPDATE_INFORMATION){
            const infoAction = informationActions.find(ia => ia.actionId === action.id);
            
            let newValue = '';
            let canReadMore = true;
            
            if(foundInformation.type === INFORMATION_TYPES.NUMBER){
                if(infoAction.operation === NUMBER_OPERATIONS.REPLACE){
                    newValue = infoAction.value;
                } else {
                    //calculate number
                    const exp = `${foundInformation.value} ${infoAction.operation} ${infoAction.value}`;
                    newValue = window.eval(exp);
                }

                for(let condition of foundInformation.conditions){
                    let type = condition.type == NUMBER_CONDITIONS.EQUAL ? '==' : condition.type;
                    const exp = `${newValue} ${type} ${condition.value}`;
                    if(window.eval(exp)){
                        changeCurrentScreen(condition.nextScreenId);
                        canReadMore = false;
                        break;
                    }
                }
                
            } else if(foundInformation.type === INFORMATION_TYPES.STRING){
                if(infoAction.operation === STRING_OPERATIONS.REPLACE){
                    newValue = infoAction.value;
                }   

                //check all conditions
                for(let condition of foundInformation.conditions){
                    if(condition.type === STRING_CONDITIONS.EQUAL && newValue === condition.value){
                        changeCurrentScreen(condition.nextScreenId);
                        canReadMore = false;
                        break;
                    }
                }
            }
            
            foundInformation.value = newValue;
            
            setInformations([...informations]);

            if(!canReadMore) return;

            changeCurrentScreen(action.nextScreenId);
            
        } else if(action.type === ACTION_TYPES.REDIRECT){
            window.open(action.value, '_blank');
        } else if (action.type === ACTION_TYPES.NEXT_SCREEN){
            changeCurrentScreen(action.value);
        } 
    }

    const startReading = () => {
        changeCurrentScreen(story.firstScreenId);
    }

    return (        
        <MainLayout>
            {notfound && (<NotFound message={'Không tìm tháy truyện này'} />)}
            
            <Fullscreen
                enabled={isFullScreen}
                onChange={isFull => setFullScreen(isFull)}
            >
            
            <div id="fullscreen" style={{ position: 'relative' }}>
            <Tooltip title="Toàn màn hình">
                <IconButton 
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    aria-label="delete" onClick={() => setFullScreen(!isFullScreen)}>
                    <FullscreenIcon />
                </IconButton>
            </Tooltip>
              
                {(!isLoading && !notfound && !ValidationUtils.isEmpty(story)) && (
                    <div className="container">
                        {informations.map(information => (
                            <div  
                                className="text-bold"
                                style={{ fontSize: '1.2em' }} 
                                key={information.id}>{ information.name }: { information.value }</div>
                        ))}
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <ScreenShow 
                                animation={ANIMATIONS.GROW}
                                showScreen={showScreen}
                                screen={currentScreen}
                                onSelectAction={handleSelectAction}
                            />

                            {ValidationUtils.isEmpty(currentScreen) && (
                                <div className="text-center">
                                    <h3 className="screen-card-header text-bold"> {story.title}</h3>
                                    <p 
                                        style={{ fontSize: '1.5em' }}
                                        className="text-justify screen-card-body">
                                        {StringUtils.parseHtml(story.intro)}
                                    </p>
                                    <button
                                        onClick={startReading} 
                                        style={{ background: '#fffbe8' }}
                                        className="btn float-right mt-3">Bắt đầu đọc truyện</button>
                                </div>
                            ) }
                        </div>
                    </div>
                )}
            </div>
            {/* <SocialShare shareUrl={window.location.href} /> */}
            </Fullscreen>
           
           { isLoading && <MySpinner/> }
        
        </MainLayout>
    );
};


export default ReadStoryPage;
