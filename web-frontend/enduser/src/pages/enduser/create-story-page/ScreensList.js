import React from 'react';

import { MenuItem, TextField, Tooltip, Fab } from '@material-ui/core';
import { Visibility as VisibilityIcon } from '@material-ui/icons';

import ScreensSelect from './ScreensSelect';
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import ActionsList from './ActionsList';
import MyEditor from '../../../components/common/MyEditor';
import ValidationUtils from '../../../utils/validation';

const ScreensList = (props) => {
    
    const { onChangeScreen, onChangeActions, onRemoveScreen, onAddAction, onRemoveAction, onShowScreenPreview } = props;
    const { screens, actionsList, storyParameters, parameters, currentScreen } = props;

    let currentParam = null;
    if(storyParameters.length != 0){
        currentParam = parameters.find(param => param.type === storyParameters[0].type);
    }

    let index = -1;
    if(!ValidationUtils.isEmpty(currentScreen)){
        index = screens.findIndex(s => s.id === currentScreen.id) + 1;
    }

    return (
        <div>
            {(!ValidationUtils.isEmpty(currentScreen)) && (
                <div className="card screen-card mb-5">
                    <div className="card-header">
                        <h5 className="mb-4">
                            <span className="mr-3">Màn hình { index }</span>
                            <Tooltip style={{ float: 'right' }} title="Xem trình diễn màn hình" aria-label="add" placement="top">
                                <Fab 
                                    color="primary" 
                                    style={{ width: '35px', height: '35px' }} 
                                    onClick={onShowScreenPreview}>
                                    <VisibilityIcon />
                                </Fab>
                            </Tooltip>
                        </h5>
                        <div className="row">
                            <div className="col-sm-6">
                                <TextField
                                    variant="outlined" 
                                    label="Tiêu đề"
                                    style={{ width: '100%' }}
                                    value={currentScreen.title} 
                                    onChange={(e) => onChangeScreen('title', e.target.value, currentScreen)} />
                            </div>
                            <div className="col-sm-6">
                                <ScreensSelect
                                    placeholder={'Màn hình kế tiếp'}
                                    screens={screens}
                                    value={currentScreen.nextScreenId}
                                    onChange={(e) => onChangeScreen('nextScreenId', e.target.value, currentScreen)} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <MyEditor 
                            value={currentScreen.content}
                            placeholder="Nội dung màn hình..."
                            onChange={(value) => onChangeScreen('content', value, currentScreen)}
                        />

                        {currentScreen.actions.length > 0 && <strong className="mt-3 d-block">Hành động</strong>}
                        
                        <ActionsList
                            actions={currentScreen.actions}
                            actionsList={actionsList}
                            screens={screens} 
                            screen={currentScreen} 
                            currentParam={currentParam}
                            onRemoveAction={onRemoveAction}
                            onChangeActions={onChangeActions}
                        />

                        <div className="text-right mt-2">
                            <MyDropdownMenu >
                                {/* <MenuItem onClick={(e) => onAddNextScreen(e, screen)}>Them man hinh</MenuItem> */}
                                <MenuItem onClick={() => onRemoveScreen(currentScreen)}>Xóa màn hình</MenuItem>
                                <MenuItem onClick={() => onAddAction(currentScreen)}>Thêm hành động</MenuItem>
                            </MyDropdownMenu>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ScreensList;
