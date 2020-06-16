import React, { useState } from 'react';
import { List, Paper, ListItem } from '@material-ui/core';
import TagList from '../../../components/common/TagList';
import { INFORMATION_TYPES, ACTION_TYPES } from '../../../common/constants';
import StoryPreview from '../../enduser/create-story-page/StoryPreview';
import ScreenTypes from '../../enduser/create-story-page/ScreenTypes';
import ValidationUtils from '../../../utils/validation';
import StringUtils from '../../../utils/string';



const CensorshipStoryDetails = (props) => {
    const { story } = props;
    const [urls, setUrls] = useState([]);
    

    const [currentScreen, setCurrentScreen] = useState(null);

    React.useEffect(() => {
        setUrls(getStoryUrls());
    }, [story]);

    const getStoryUrls = () => {
        const urls = [];
        if(ValidationUtils.isEmpty(story)) {
            return [];
        }

        story.screens.forEach(scr => {
            scr.actions.forEach(action => {
                if(action.type === ACTION_TYPES.REDIRECT){
                    urls.push(action.value);
                }
            })
        });
        return urls;
    }

    const handleSelectAction = (action) => {
        if (action.type === ACTION_TYPES.REDIRECT) {
           window.open(action.value, '_blank');
       } else if (action.type === ACTION_TYPES.NEXT_SCREEN) {
           changeCurrentScreen(action.value);
       }
   }

   const changeCurrentScreen = (screenId) => {
       const screen = story.screens.find(scr => scr.id === screenId);
       setCurrentScreen(screen);
   }

   const getScreenById = (screenId) => {
       return story.screens.find(scr => scr.id === screenId);
   }

    return (
        <div>
            {!ValidationUtils.isEmpty(story) && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4">
                            <img src={story.image} className="img-fluid" />
                        </div>
                        <div className="col-sm-8">
                            <List  aria-label="main mailbox folders">
                                <ListItem button>
                                    <div>
                                        <strong>Tiêu đề: </strong> {story.title}
                                    </div>
                                </ListItem>
                                <ListItem button>
                                    <div>
                                        <strong>Tác giả: </strong> 
                                        <a href={`/user/profile/${story.user.id}`} target="_blank">{story.user.name}</a>
                                    </div>
                                </ListItem>
                                <ListItem button>
                                    <div>
                                        <strong>Hiệu ứng: </strong> {story.animation}
                                    </div>
                                </ListItem>
                                <ListItem button>
                                    <div>
                                    <strong>Thể loại: </strong> <TagList tags={story.tags} />
                                    </div>
                                </ListItem>
                                <ListItem button>
                                    <div>
                                        <div>
                                            <span className="font-weight-bold">Thông tin:</span> {story.informations.length == 0 && <span>Không có</span>}
                                        </div>
                                        
                                        {story.informations.length != 0 && <>
                                            {story.informations.map(info => (
                                                <div key={info.id}>
                                                    <div className="pl-2">
                                                        {info.name}: {info.value} ({info.type === INFORMATION_TYPES.NUMBER ? 'Số': 'Chuối kí tự'})
                                                    </div>
                                                    <div className="pl-4">
                                                        <strong>Điều kiện:</strong>
                                                        {info.conditions.map(cond => (
                                                            <div key={cond.id}>
                                                                <strong>{info.name} {cond.type} {cond.value}</strong> ({getScreenById(cond.nextScreenId).title})
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </>}
                                        
                                    </div>
                                </ListItem>
                                <ListItem button>
                                    <div>
                                        <strong>Các đường dẫn: </strong>
                                        {urls.length == 0 && <span>Không có</span>}
                                    
                                        {urls.length != 0 && <>
                                            {urls.map(url => (
                                                <div className="pl-2 mb-2"><a href={url} target="_blank">{url}</a></div>
                                            ))}
                                        </>}
                                    </div>
                                </ListItem>
                                <ListItem button>
                                    <div>
                                        <strong>Nội dung giới thiệu: </strong> 
                                        <div className="ql-editor">
                                            {StringUtils.parseHtml(story.intro)}
                                        </div>
                                    </div>
                                </ListItem>
                            </List>
                        </div>
                
                    </div>
                    <div className="row my-5">
                        <div className="col-sm-5">
                            <StoryPreview 
                                firstScreenId={story.firstScreenId} 
                                screens={story.screens} 
                                setCurrentScreen={(screenId) => changeCurrentScreen(screenId)}/>
                                <br/>
                                <ScreenTypes />
                        </div>
                        
                        <div className="col-sm-7">
                            {!ValidationUtils.isEmpty(currentScreen) && (
                                <Paper style={{ padding: '20px' }}>
                                    
                                    <h4 className="font-weight-bold">{currentScreen.title}</h4>
                                    <div style={{ fontSize:'1em' }} className="ql-editor">
                                        {StringUtils.parseHtml(currentScreen.content)}
                                    </div>
                                    <div className="row screen-card-body">
                                    {currentScreen.actions.map(action => (
                                        <div
                                            className={`${currentScreen.actions.length > 1 ? 'col-sm-6' : 'col-12'}`}
                                            key={action.id}>
                                                <div
                                                    style={{ fontSize: '1.2em' }}
                                                    onClick={() => handleSelectAction(action)}
                                                    className="action-content text-center">
                                                    <span>{action.content}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {ValidationUtils.isEmpty(story) && (
                <h3 className="text-center">Không có bản này</h3>
            )}
        </div>
    );
};


export default CensorshipStoryDetails;