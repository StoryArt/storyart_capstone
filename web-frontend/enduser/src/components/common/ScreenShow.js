import React from 'react';
import ValidationUtils from '../../utils/validation';
import StringUtils from '../../utils/string';
import { ACTION_TYPES, ANIMATIONS } from '../../common/constants';
import { Grow, Fade, Collapse, Zoom, Slide } from '@material-ui/core';

const ScreenShow = (props) => {

    const { screen, onSelectAction, showScreen, animation } = props;
    
    let animationEle;

    switch(animation){
        case ANIMATIONS.FADE: 
            animationEle = <Fade></Fade>
            break;
        case ANIMATIONS.GROW: 
            animationEle = <Grow></Grow>
            break;
        case ANIMATIONS.COLLAPSE: 
            animationEle = <Collapse></Collapse>
            break;
        case ANIMATIONS.SLIDE: 
            animationEle = <Slide></Slide>
            break;
        case ANIMATIONS.ZOOM: 
            animationEle = <Zoom></Zoom>
            break;
    }

    return (
        <div>
            {!ValidationUtils.isEmpty(screen) && (
                React.cloneElement(animationEle, {
                    timeout: { enter: 1000, exit: 1000 },
                    in: showScreen
                }, (
                    <div className="screen-card">
                        <div className="screen-card-header">
                            <h5 className="text-center">{ screen.title }</h5>
                        </div>
                        <div className="screen-card-body" style={props}>
                            <p className="text-center">{ StringUtils.parseHtml(screen.content) }</p><br/>
                            <div className="row">
                                {screen.actions.map(action => (
                                    <div className="col-6" key={action.id}>
                                        <p 
                                            style={{ fontSize: '1.2em' }}
                                            onClick={() => onSelectAction(action)}
                                            className="action-content text-center">
                                                
                                            {action.type === ACTION_TYPES.REDIRECT && (
                                                <a href={action.value} target="_blank">
                                                    { action.content }
                                                </a>
                                            )}
                                            {action.type !== ACTION_TYPES.REDIRECT && (
                                                <>{ StringUtils.parseHtml(action.content)  }</>
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                
                ))
            )}
        </div>
    );
};


export default ScreenShow;
