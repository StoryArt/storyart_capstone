import React, { useState, useEffect } from 'react';
import Fullscreen from "react-full-screen";
import { Zoom, Fade, Collapse, Slide, Grow, IconButton, Tooltip } from '@material-ui/core';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import MainLayout from '../../../layouts/main-layout/MainLayout';
import StoryService from '../../../services/story.service';
import ValidationUtils from '../../../utils/validation';
import StringUtils from '../../../utils/string';
import {
    ACTION_TYPES, INFORMATION_TYPES, STRING_OPERATIONS,
    NUMBER_OPERATIONS, STRING_CONDITIONS, NUMBER_CONDITIONS, ANIMATIONS
} from '../../../common/constants';

import MySpinner from '../../../components/common/MySpinner';
import NotFound from '../../../components/common/NotFound';
import ScreenShow from '../../../components/common/ScreenShow';
import SocialShare from '../../../components/common/SocialShare';
import MyFullScreenShowWrapper from '../../../components/common/MyFullScreenShowWrapper';
import ReadingHistoryService from '../../../services/reading_history.service';
import MyBackdrop from '../../../components/common/MyBackdrop';
import ConfirmDialog from '../../../components/common/ConfirmDialog';


let readingScreenDuration = 0;

let interval = null;
let listScreenId = [];
let initialInformations;
let isEndStory = false;
let savedStoryId;
let screenList = [];
let myCurrentScreen = null;
let interactionCheck = { duration: 0, isInteracted: true };
let interactionInterval = null;
let canHandleAction = true;

const countTimeReading = (startTime) => {
    if (ValidationUtils.isEmpty(startTime)) startTime = 0;
    readingScreenDuration = startTime;
    interval = window.setInterval(() => {
        
        //if time is more than 15 min, set time for this screen and stop counter
        if (readingScreenDuration > 15 * 60) {
            stopCountTimeReading();
        } else {
            readingScreenDuration++;
        }
    }, 1000);
}

const stopCountTimeReading = () => {
    window.clearInterval(interval);
}

const ReadStoryPage = (props) => {

    const [story, setStory] = useState({});
    const [screens, setScreens] = useState([]);
    const [informations, setInformations] = useState([]);
    const [informationActions, setInformationActions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notfound, setNotfound] = useState({ value: false, message: '' });
    const [isFullScreen, setFullScreen] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [currentScreen, setCurrentScreen] = useState({});
    const [showScreen, setShowScreen] = useState(false);
    const [isEnd, setEnd] = useState(false);
    const [dialog, setDialog] = useState({ open: false, content: '' });



    useEffect(() => {

        const { storyId } = props.match.params;
        savedStoryId = storyId;
        listScreenId = []
        readingScreenDuration = 0;
        interval = null;
        initialInformations = [];
        isEndStory = false;

        getReadingStory(storyId);

        //save history when reload the page
        
        window.onbeforeunload = () => {
            saveHistoryBeforeLeavePage();
            window.onbeforeunload = null;
        }

        //save history when navigate page
        return () => {
            window.onbeforeunload = null;
           
            if (!notfound.value) {
                saveHistoryBeforeLeavePage();
            }
        };

    }, []);

    const saveHistoryBeforeLeavePage = () => {
        stopCountTimeReading();
        if (!isEndStory && listScreenId.length > 0) {
            const data = {
                storyId: savedStoryId,
                isReachingEnd: false,
                listScreenId: listScreenId.toString()
            }
            saveReadingHistory(data);
        } else if (isEndScreen(myCurrentScreen)) {
            //cal time of end screen
            saveScreenReadTime({
                screenId: myCurrentScreen.id,
                duration: readingScreenDuration
            })
        }
    }

    const isEndScreen = (screen) => {
        if (ValidationUtils.isEmpty(screen)) return false;
        // if (screen.id === story.firstScreenId && screenList.length > 1) return false;

        const haveNextScreenAction = ValidationUtils.isEmpty(screen.actions) ? false : screen.actions.some(a => a.type === ACTION_TYPES.NEXT_SCREEN || a.type === ACTION_TYPES.UPDATE_INFORMATION)
        if (haveNextScreenAction) return false;
        if (!ValidationUtils.isEmpty(screen.nextScreenId)) return false;
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

    const handleInteractionEvent = () => {
        if (interactionCheck.isInteracted) interactionCheck.duration = 0;
    }

    const setUpCheckUserInteraction = () => {
        window.addEventListener('mousemove', handleInteractionEvent);
        window.addEventListener('click', handleInteractionEvent);
        window.addEventListener('scroll', handleInteractionEvent);
        window.addEventListener('keypress', handleInteractionEvent);

        startInteractionInterval();
    }

    const startInteractionInterval = () => {
        window.clearInterval(interactionInterval);
        interactionInterval = window.setInterval(() => {
            interactionCheck.duration++;

            //if 3.5 min no interaction, system will confirm if the user want to continue reading.
            if (interactionCheck.duration > 3.5 * 60 && interactionCheck.isInteracted) {
                interactionCheck.isInteracted = false;
                stopCountTimeReading();
                setDialog({ open: true, content: 'Bạn có muốn đọc tiếp câu truyện hay không?' });
            }
        }, 1000);
    }

    const confirmContinueReading = () => {
        interactionCheck = { duration: 0, isInteracted: true };
        countTimeReading(readingScreenDuration);
        setDialog({ ...dialog, open: false });
    }

    const changeCurrentScreen = (screenId) => {
        setShowScreen(false);
        const screen = screens.find(scr => scr.id === screenId);
        if (!ValidationUtils.isEmpty(screen)) {

            interactionCheck = { duration: 0, isInteracted: true };

            listScreenId.push(screen.id);
            myCurrentScreen = JSON.parse(JSON.stringify(screen));

            if (currentScreen != null) {
                stopCountTimeReading();
                saveScreenReadTime({
                    screenId: currentScreen.id,
                    duration: readingScreenDuration
                });
            }

            if (isEndScreen(screen)) {
                setEnd(true);
                isEndStory = true;
                const data = {
                    storyId: story.id,
                    isReachingEnd: true,
                    listScreenId: listScreenId.toString()
                }
                saveReadingHistory(data);
            }
        }

        setTimeout(() => {
            canHandleAction = true;
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

    const getReadingStory = async (storyId) => {
        setIsLoading(true);
        setOpenBackdrop(true);
        try {
            const res = await StoryService.getReadingStory(storyId);
            console.log(res);
            const { data } = res.data;
            if (ValidationUtils.isEmpty(data)) {
                setNotfound({ value: true, message: Object.values(res.data.errors)[0] });
            } else {
                setScreens(data.screens);
                screenList = [...data.screens];
                setInformations(data.informations);
                initialInformations = JSON.parse(JSON.stringify(data.informations));

                setInformationActions(data.informationActions);

                setStory({ ...data, screens: null, informations: null, informationActions: null });
            }
        } catch (error) {
            console.log(error);
        }
        setOpenBackdrop(false);
        setIsLoading(false);
    }

    const handleSelectAction = (action) => {

        if (canHandleAction) {
            canHandleAction = false;

            const foundInformation = informations[0];
            if (informations.length > 0 && action.type === ACTION_TYPES.UPDATE_INFORMATION) {
                const infoAction = informationActions.find(ia => ia.actionId === action.id);

                let newValue = '';
                let canReadMore = true;

                if (foundInformation.type === INFORMATION_TYPES.NUMBER) {
                    if (infoAction.operation === NUMBER_OPERATIONS.REPLACE) {
                        newValue = infoAction.value;
                    } else {
                        //calculate number
                        const exp = `${foundInformation.value} ${infoAction.operation} ${infoAction.value}`;
                        newValue = window.eval(exp);
                    }

                    for (let condition of foundInformation.conditions) {
                        let type = condition.type == NUMBER_CONDITIONS.EQUAL ? '==' : condition.type;
                        const exp = `${newValue} ${type} ${condition.value}`;
                        if (window.eval(exp)) {
                            changeCurrentScreen(condition.nextScreenId);
                            canReadMore = false;
                            break;
                        }
                    }

                } else if (foundInformation.type === INFORMATION_TYPES.STRING) {
                    if (infoAction.operation === STRING_OPERATIONS.REPLACE) {
                        newValue = infoAction.value;
                    } else if (infoAction.operation === STRING_OPERATIONS.PREPEND) {
                        newValue = '' + infoAction.value + foundInformation.value;
                    } else if (infoAction.operation === STRING_OPERATIONS.APPEND) {
                        newValue = '' + foundInformation.value + infoAction.value;
                    }

                    //check all conditions
                    for (let condition of foundInformation.conditions) {
                        if (condition.type === STRING_CONDITIONS.EQUAL && newValue === condition.value) {
                            changeCurrentScreen(condition.nextScreenId);
                            canReadMore = false;
                            break;
                        }
                    }
                }

                foundInformation.value = newValue;

                setInformations([...informations]);

                if (!canReadMore) return;

                changeCurrentScreen(action.nextScreenId);

            } else if (action.type === ACTION_TYPES.REDIRECT) {
                //save link when user click
                saveClickLink({ storyId: story.id, link: action.value });

                window.open(action.value, '_blank');
                console.log('click');
                canHandleAction = true;

            } else if (action.type === ACTION_TYPES.NEXT_SCREEN) {
                changeCurrentScreen(action.value);
            }

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
        startInteractionInterval();
    }

    const startReading = () => {
        changeCurrentScreen(story.firstScreenId);
        setUpCheckUserInteraction();
    }

    return (
        <>
            <ConfirmDialog
                openDialog={dialog.open}
                cancel={() => props.history.push(`/stories/details/${story.id}`)}
                ok={confirmContinueReading}
                setOpenDialog={() => setDialog({ ...dialog, open: true })}
                content={dialog.content}
            />

            {notfound.value && (<NotFound message={notfound.message} />)}


            {(!isLoading && !notfound.value && !ValidationUtils.isEmpty(story)) && (
                //  <Fullscreen
                //     enabled={isFullScreen}
                //     onChange={isFull => setFullScreen(isFull)}
                // >
                <MyFullScreenShowWrapper informations={informations} storyId={story.id}>
                    <ScreenShow
                        animation={story.animation}
                        showScreen={showScreen}
                        screen={currentScreen}
                        onSelectAction={handleSelectAction}
                    />

                    {isEnd && (
                        <>
                            <button
                                onClick={() => resetStory()}
                                style={{ background: '#fffbe8', color: '#000' }}
                                className="btn float-right mt-3">Đọc lại từ đâu</button>

                            <button
                                onClick={() => props.history.push('/stories/details/' + story.id)}
                                style={{ background: '#fffbe8', color: '#000' }}
                                className="btn float-right mt-3">Quay lại trang chi tiết</button>

                            <SocialShare shareUrl={window.location.href} />
                        </>
                    )}

                    {ValidationUtils.isEmpty(currentScreen) && (
                        <div className="">
                            <h3 className="screen-card-header text-bold text-center mb-4"> {story.title}</h3>
                            <p
                                className="">
                                {StringUtils.parseHtml(story.intro)}
                            </p>
                            <button
                                onClick={startReading}
                                style={{ background: '#fffbe8', color: '#000' }}
                                className="btn float-right mt-3">Bắt đầu đọc truyện</button>
                        </div>
                    )}
                </MyFullScreenShowWrapper>
                // </Fullscreen>
            )}

            {/* { isLoading && <MySpinner/> } */}
            <MyBackdrop open={openBackdrop} setOpen={setOpenBackdrop} />

        </>
    );
};


export default ReadStoryPage;
