import React, { useState, useEffect } from 'react';
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
import ReadingHistoryService from '../../../services/reading_history.service';


let readingScreenDuration = 0;

let interval = null;
let listScreenId = [];
let initialInformations;
let isEndStory = false;
let savedStoryId;

const ReadStoryPage = (props) => {

    const [story, setStory] = useState({});
    const [screens, setScreens] = useState([]);
    const [informations, setInformations] = useState([]);
    const [informationActions, setInformationActions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notfound, setNotfound] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    const [isPublished, setPublished] = useState(true);

    const [currentScreen, setCurrentScreen] = useState({});
    const [showScreen, setShowScreen] = useState(false);
    const [isEnd, setEnd] = useState(false);
    

    useEffect(() => {
       
        const { storyId } = props.match.params;
        savedStoryId = storyId;
        listScreenId = []
        readingScreenDuration = 0;
        interval = null;
        initialInformations = [];
        isEndStory = false;
        
        getReadingStory(storyId);

        window.addEventListener('beforeunload', () => {
            saveHistoryBeforeLeavePage();
        });

        return () => {
            if(!notfound){
                window.addEventListener('beforeunload', () => {});
                saveHistoryBeforeLeavePage();
            }
        };

    }, []);

    const saveHistoryBeforeLeavePage = () => {
        if(!isEndStory && listScreenId.length > 0){
            const data = {
                storyId: savedStoryId,
                isReachingEnd: false,
                listScreenId: listScreenId.toString()
            }
            saveReadingHistory(data);
        }
    }

    const isEndScreen = (screen) => {
        if(screen == null) return false;
        if (screen.id === story.firstScreenId) return false;
        
        const haveNextScreenAction = ValidationUtils.isEmpty(screen.actions) ? false : screen.actions.some(a => a.type === ACTION_TYPES.NEXT_SCREEN || a.type === ACTION_TYPES.UPDATE_INFORMATION)
        if(haveNextScreenAction) return false;
        if(!ValidationUtils.isEmpty(screen.nextScreenId)) return false;
        return true;
    }

    const saveScreenReadTime = async (data) => {
        try {
            const res = await ReadingHistoryService.saveScreenReadTime(data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const changeCurrentScreen = (screenId) => {
        setShowScreen(false);
        const screen = screens.find(scr => scr.id === screenId);
        if(!ValidationUtils.isEmpty(screen)){
            
            listScreenId.push(screen.id);

            if(currentScreen != null && !isEndScreen(currentScreen)){
                stopCountTimeReading();
                saveScreenReadTime({ screenId: currentScreen.id, duration: readingScreenDuration });
            }
            

            if(isEndScreen(screen)){
                setEnd(true);
                isEndStory = true;
                stopCountTimeReading();
                readingScreenDuration = 0;
                const data = {
                    storyId: story.id,
                    isReachingEnd: true,
                    listScreenId: listScreenId.toString()
                }
                saveReadingHistory(data);
            }
        }


        setTimeout(() => {
            setCurrentScreen(screen)
            setShowScreen(true);

            countTimeReading();
        }, 1000);
    }

    const saveReadingHistory = async (data) => {
        try {
            const res = await ReadingHistoryService.saveReadingHistory(data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const countTimeReading = () => {
        readingScreenDuration = 0;
        interval = window.setInterval(() => {
            readingScreenDuration++;

            //if time is more than 5 min, set time for this screen and stop counter
            if(readingScreenDuration > 60*60) {
                stopCountTimeReading();
            }
        }, 1000);
    }

    const stopCountTimeReading = () => {
        window.clearInterval(interval);
    }

    const getReadingStory = async (storyId) => {
        setIsLoading(true);
        try {
            const res = await StoryService.getReadingStory(storyId);    
           
            const { data } = res.data;
            if(ValidationUtils.isEmpty(data)){
                setNotfound(true);
            } else {
                console.log(data);
                if(!data.published){
                    setPublished(false);
                } else {
                    setScreens(data.screens);
                    setInformations(data.informations);
                    initialInformations = JSON.parse(JSON.stringify(data.informations));
    
                    setInformationActions(data.informationActions);
                    
                    setStory({ ...data, screens: null, informations: null, informationActions: null });
                }
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
            //save link when user click
            saveClickLink({ storyId: story.id, link: action.value });

            window.open(action.value, '_blank');
           
        } else if (action.type === ACTION_TYPES.NEXT_SCREEN){
            changeCurrentScreen(action.value);
        } 
    }

    const saveClickLink = async (link) => {
        console.log(link);
        try {
            const res = await ReadingHistoryService.saveCLickLink(link);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const resetStory = () => {
        setInformations(JSON.parse(JSON.stringify(initialInformations)));
        changeCurrentScreen(story.firstScreenId);
        listScreenId = [];
        readingScreenDuration = 0;
        stopCountTimeReading();
        setEnd(false);
        isEndStory = false;
    }

    const startReading = () => {
        changeCurrentScreen(story.firstScreenId);
    }

    return (        
        <MainLayout>
            {notfound && (<NotFound message={'Không tìm tháy truyện này'} />)}

            {!isPublished && (<NotFound message={'Truyện này chưa được xuất bản! Vui lòng quay lại sau'} />)}

            {(!isLoading && !notfound && isPublished && !ValidationUtils.isEmpty(story)) && (
                 <Fullscreen
                    enabled={isFullScreen}
                    onChange={isFull => setFullScreen(isFull)}
                >
                    <div id="fullscreen" style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
                        <Tooltip title="Toàn màn hình">
                            <IconButton 
                                style={{ position: 'absolute', top: 20, right: 20 }}
                                aria-label="delete" onClick={() => setFullScreen(!isFullScreen)}>
                                <FullscreenIcon />
                            </IconButton>
                        </Tooltip>

                        {informations.map(information => (
                            <div  
                                className="text-bold"
                                style={{ fontSize: '1.2em', position: 'absolute', top: 20, left: 20 }} 
                                key={information.id}>{ information.name }: { information.value }</div>
                        ))}
                
                        <div className="container-fluid" style={{ height: '100%' }} >
                           
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <ScreenShow 
                                    animation={ANIMATIONS.GROW}
                                    showScreen={showScreen}
                                    screen={currentScreen}
                                    onSelectAction={handleSelectAction}
                                />
    
                                {isEnd && (
                                    <>
                                        <button
                                            onClick={() => resetStory()} 
                                            style={{ background: '#fffbe8' }}
                                            className="btn float-right mt-3">Đọc lại từ đâu</button>
    
                                        <button
                                            onClick={() => props.history.push('/stories/details/' + story.id)} 
                                            style={{ background: '#fffbe8' }}
                                            className="btn float-right mt-3">Quay lại trang chi tiết</button>

                                         <SocialShare shareUrl={window.location.href} />
                                    </>
                                )}
    
                                {ValidationUtils.isEmpty(currentScreen) && (
                                    <div className="">
                                        <h3 className="screen-card-header text-bold text-center"> {story.title}</h3>
                                        <p 
                                            className="">
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
                    </div>
            
             </Fullscreen>
            
            )}
           
           { isLoading && <MySpinner/> }
        
        </MainLayout>
    );
};


export default ReadStoryPage;
