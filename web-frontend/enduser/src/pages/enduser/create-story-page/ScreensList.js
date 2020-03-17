import React from 'react';

import { MenuItem, TextField } from '@material-ui/core';

import ScreensSelect from './ScreensSelect';
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import ActionsList from './ActionsList';
import MyEditor from '../../../components/common/MyEditor';

const ScreensList = (props) => {
    
    const { onChangeScreen, onChangeActions, onRemoveScreen, onAddAction, onRemoveAction } = props;
    const { screens, actionsList, storyParameters, parameters, currentScreen } = props;


    let currentParam = null;
    if(storyParameters.length != 0){
        currentParam = parameters.find(param => param.type === storyParameters[0].type);
    }
    
    let screen = null;
    if(screens.length > 0) screen = screens[currentScreen];

    return (
        <div>
            {screen != null && (
                <div className="card screen-card mb-5" key={screen.id}>
                    <div className="card-header">
                        <h5 className="mb-4">Màn hình { currentScreen + 1 }</h5>
                        <div className="row">
                            <div className="col-sm-6">
                                <TextField
                                    variant="outlined" 
                                    label="Tieu de man hinh"
                                    style={{ width: '100%' }}
                                    value={screen.title} 
                                    onChange={(e) => onChangeScreen('title', e.target.value, screen)} />
                            </div>
                            <div className="col-sm-6">
                                <ScreensSelect
                                    placeholder={''}
                                    screens={screens}
                                    value={screen.nextScreenId}
                                    onChange={(e) => onChangeScreen('nextScreenId', e.target.value, screen)} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <MyEditor 
                            value={screen.content}
                            placeholder="Nội dung màn hình..."
                            onChange={(value) => onChangeScreen('content', value, screen)}
                        />

                        {screen.actions.length > 0 && <strong className="mt-3 d-block">Hành động</strong>}
                        
                        <ActionsList
                            actions={screen.actions}
                            actionsList={actionsList}
                            screens={screens} 
                            screen={screen} 
                            currentParam={currentParam}
                            onRemoveAction={onRemoveAction}
                            onChangeActions={onChangeActions}
                        />

                        <div className="text-right mt-2">
                            <MyDropdownMenu >
                                {/* <MenuItem onClick={(e) => onAddNextScreen(e, screen)}>Them man hinh</MenuItem> */}
                                <MenuItem onClick={() => onRemoveScreen(screen)}>Xóa màn hình</MenuItem>
                                <MenuItem onClick={() => onAddAction(screen)}>Thêm hành động</MenuItem>
                            </MyDropdownMenu>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ScreensList;
