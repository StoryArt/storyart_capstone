import React from 'react';
import moduleName from 'react-spring/';

const Test = ({  }) => {
    return (
        <Spring  
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            >
                {props => (
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
            
                )}
        </Spring>
                                    
    );
};


export default Test;
