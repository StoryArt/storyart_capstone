import React, { useState, useEffect } from 'react';
import MainLayout from '../../../layouts/UserLayout';
import StoryService from '../../../services/story.service';
import ValidationUtils from '../../../utils/validation';
import { ACTION_TYPES, INFORMATION_TYPES } from '../../../common/constants';

import MySpinner from '../../../components/common/MySpinner';
import NotFound from '../../../components/common/NotFound';

const ReadStoryPage = (props) => {

    const tempStory = {
        title: 'A day life of peter',
        intro: 'Peter is a boy living in Los Angeles city in America, he is a student of Eduonix school',
        screens: [
            {
                id: 1,
                title: 'Wake up in the morning',
                content: `Peter wake up in the morning of the year's first day. He consider doing something for
                in the morning that help him a lot to make the meaningful day`,
                actions: [
                    {
                        content: 'Go to the girl friend house',
                        nextScreenId: 2,
                    },
                    {
                        content: 'Play soccer with friends',
                        nextScreenId: 3
                    },
                    {
                        content: 'Help his parent with their household chore',
                        nextScreenId: 4
                    },
                ],
                nextScreenId: null,
                isLast: false
            },
            {
                id: 2,
                title: 'Go to the girl friend house',
                content: `he ride winnerX to go to his girl friend house. However his bike's wheel 
                is run out of air on the way near the destination`,
                actions: [
                    {
                        content: 'Go to the fixing-bike store',
                        nextScreenId: 8
                    },
                    {
                        content: `Leave the bike at another friend's house`,
                        nextScreenId: 9
                    },
                ],
                isLast: false,
                nextScreenId: null
            },
            {
                id: 3,
                title: 'Play soccer with friends',
                content: `He go to Thong Nhat stadium with his friends and join the soccer game.`,
                isLast: false,
                nextScreenId: 5
            },
            {
                id: 4,
                title: 'Help his parent with their household chore',
                content: `He help mother to decorate house, help father fix the light bulb. His parent was very happy 
                and proud of him. His parent decide to buy him something for his help during the morning.`,
                actions: [
                    {
                        content: 'Buy him a new badminton racket',
                        nextScreenId: 6
                    },
                    {
                        content: `Get him to the theater to see movie`,
                        nextScreenId: 7
                    },
                ],
                isLast: false,
                nextScreenId: null
            },
            {
                id: 5,
                title: 'After playing soccer',
                content: `Winning the match with ratio 2 -1.`,
                isLast: true,
                nextScreenId: null
            },
            {
                id: 6,
                title: 'Buy him a new badminton racket',
                content: `With his new badminton racket, he was very happy and continue to go to play badminton 
                with friends to finish his morning`,
                isLast: true,
                nextScreenId: null
            },
            {
                id: 7,
                title: 'Get him to the theater to see movie',
                content: `He and his parent go to the theater to see movie avenger end game. After that, they go to restaurant 
                to have a dinner and complete a happy morning.`,
                isLast: true,
                nextScreenId: null
            },
            {
                id: 8,
                title: 'Go to the fixing-bike store',
                content: `He paid 150.000 vnd for the store's owner. therefore he did not have enough money to
                 pay for his girl friend, so he go home`,
                isLast: true,
                nextScreenId: null
            },  
            {
                id: 9,
                title: `Leave the bike at another friend's house`,
                content: `He go to girl friend house and take bus with her to go to the zoo. He complete the morning with the kiss 
                with the girl`,
                isLast: true,
                nextScreenId: null
            },
        ]
    }

    const [story, setStory] = useState({});
    const [screens, setScreens] = useState([]);
    const [informations, setInformations] = useState([]);
    const [informationActions, setInformationActions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notfound, setNotfound] = useState(false);

    const [currentScreen, setCurrentScreen] = useState({ title: tempStory.title, content: tempStory.intro });
    const [selectedScreens, setSelectedScreens] = useState([]);
    const [selectedActions, setSelectedActions] = useState([]);
    const [userInformation, setUserInformation] = useState([]);

    useEffect(() => {
        const { storyId } = props.match.params;
        getReadingStory(storyId);
    }, []);
  
    const getReadingStory = async (storyId) => {
        setIsLoading(true);
        try {
            const res = await StoryService.getReadingStory(storyId);    
            console.log(res);
            const { data } = res.data;
            if(ValidationUtils.isEmpty(data)){
                setNotfound(true);
            } else {
                setScreens(data.screens);
                setInformations(data.informations);
                setInformationActions(data.informationActions);
                
                const screen = data.screens.find(scr => scr.id === data.firstScreenId);
                console.log(screen);
                setCurrentScreen(screen);

                setStory({ ...data, screens: null, informations: null, informationActions: null });
            }
           
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const handleSelectAction = (action) => {
        console.log(action);
        const infoActions = informationActions.filter(ia => ia.actionId === action.id);
        const foundInformation = informations[0];
        if(informations.length > 0 && action.type === ACTION_TYPES.UPDATE_INFORMATION){
            if(foundInformation.type === INFORMATION_TYPES.NUMBER){
                // const exp = foundInformation.value + ' ' + 
            } else if(foundInformation.type === INFORMATION_TYPES.STRING){

            }
            const newValue = foundInformation.value
            // foundInformation.value = 
        } else if(action.type === ACTION_TYPES.REDIRECT){
            window.open(action.value, '_blank');
        } else if (action.type === ACTION_TYPES.NEXT_SCREEN){

        } else {

        }
    }
 
    return (        
        <MainLayout>
            {notfound && (<NotFound message={'Khong tim thay truyen nay'} />)}

            {(!isLoading && !notfound && !ValidationUtils.isEmpty(story)) && (
                 <>
                    <h3 className="text-center">{ story.title }</h3>
                    <div className="container">
                        {informations.map(information => (
                            <div key={informations.id}>{ information.name }: { information.value }</div>
                        ))}
                        <div className="col-sm-8 mx-auto">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="text-center">{ currentScreen.title }</h5>
                                </div>
                                <div className="card-body">
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
                        </div>
                    </div>
                 </>
            ) }
           
           { isLoading && <MySpinner/> }
        
        </MainLayout>
    );
};


export default ReadStoryPage;
