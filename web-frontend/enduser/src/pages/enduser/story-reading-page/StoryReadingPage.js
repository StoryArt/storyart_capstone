import React, { useState, useEffect } from 'react';
import { Spring, Transition, animated } from 'react-spring/renderprops';
import { Button } from '@material-ui/core';
import MainLayout from '../../../layouts/UserLayout';
import StoryService from '../../../services/story.service';
import ValidationUtils from '../../../utils/validation';
import { ACTION_TYPES, INFORMATION_TYPES, STRING_OPERATIONS,
     NUMBER_OPERATIONS, STRING_CONDITIONS, NUMBER_CONDITIONS } from '../../../common/constants';

import MySpinner from '../../../components/common/MySpinner';
import NotFound from '../../../components/common/NotFound';

const ReadStoryPage = (props) => {

    const [story, setStory] = useState({});
    const [screens, setScreens] = useState([]);
    const [informations, setInformations] = useState([]);
    const [informationActions, setInformationActions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notfound, setNotfound] = useState(false);

    const [currentScreen, setCurrentScreen] = useState({ });
    const [selectedScreens, setSelectedScreens] = useState([]);
    const [selectedActions, setSelectedActions] = useState([]);
    const [userInformation, setUserInformation] = useState([]);

    useEffect(() => {
        const { storyId } = props.match.params;
        getReadingStory(storyId);
    }, []);

    const changeCurrentScreen = (screenId) => {
        const screen = screens.find(scr => scr.id === screenId);
        console.log(screen);
        setCurrentScreen(screen);
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
            console.log(newValue);
            
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
        <MainLayout background={'#151A1E'}>
            {notfound && (<NotFound message={'Khong tim thay truyen nay'} />)}

            {(!isLoading && !notfound && !ValidationUtils.isEmpty(story)) && (
                 <div>
                    {/* <h3 className="text-center">{ story.title }</h3> */}
                    <div className="container">
                        {informations.map(information => (
                            <div key={information.id}>{ information.name }: { information.value }</div>
                        ))}
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {!ValidationUtils.isEmpty(currentScreen) && (
                                  <div className="screen-card">
                                    <div className="screen-card-header">
                                        <h5 className="text-center">{ currentScreen.title }</h5>
                                    </div>
                                        <div className="screen-card-body" style={props}>
                                            <p className="text-center">{ currentScreen.content }</p><br/>
                                            <div className="row">
                                                {currentScreen.actions.map(action => (
                                                    <div className="col-6" key={action.id}>
                                                        <p 
                                                            onClick={() => handleSelectAction(action)}
                                                            className="action-content text-center">
                                                                
                                                            {action.type === ACTION_TYPES.REDIRECT && (
                                                                <a href={action.value} target="_blank">
                                                                    {action.content}
                                                                </a>
                                                            )}
                                                            {action.type !== ACTION_TYPES.REDIRECT && (
                                                                <>{ action.content }</>
                                                            )}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                </div>
                            )}

                            {ValidationUtils.isEmpty(currentScreen) && (
                                <div className="text-center">
                                    <h3 className="screen-card-header"> {story.title}</h3>
                                    <p className="text-center screen-card-body">
                                        {story.intro}
                                    </p>
                                    <button
                                        onClick={startReading} 
                                        className="btn btn-primary btn-block">Bat dau cuoc phieu luu</button>
                                </div>
                            ) }
                        </div>
                    </div>
                 </div>
            ) }
           
           { isLoading && <MySpinner/> }
        
        </MainLayout>
    );
};


export default ReadStoryPage;
