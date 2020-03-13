import React from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import ScreensSelect from './ScreensSelect';
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import { ACTION_TYPES } from '../../../common/constants';

const ActionsList = (props) => {
    const { actions, onRemoveAction, onChangeActions, actionsList, screens, currentParam, screen } = props;
    return (
        <div>
            {actions.map((action, index) => (
               <div key={action.id}>
                 <div className="row mb-4" >
                    <div className="col-11">
                        <div className="row">
                        <div className="col-sm-6 mb-2">
                            <TextField 
                                style={{ width: '100%' }}
                                label="Noi dung..."
                                variant="outlined"
                                value={action.content} 
                                onChange={(e) => onChangeActions('content', e.target.value, screen, index)}
                            />
                        </div>
                        <div className="col-sm-6 mb-2"> 
                            <FormControl style={{ width: '100%' }} variant="outlined">
                                <InputLabel>Loai hanh dong</InputLabel>
                                <Select
                                    defaultValue={actionsList[0]}
                                    value={action.type}
                                    onChange={(e) => onChangeActions('type', e.target.value, screen, index)}
                                >
                                    {actionsList.map(action => (
                                        <MenuItem 
                                            key={action} 
                                            value={action}>{ action }</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {(action.type === ACTION_TYPES.UPDATE_INFORMATION && currentParam != null) && (
                            <>
                                <div className="col-sm-4">
                                    {(
                                        <FormControl style={{ width: '100%' }} variant="outlined">
                                            <InputLabel>Anh huong</InputLabel>
                                            <Select
                                                defaultValue={currentParam.operations[0]}
                                                value={action.operation}
                                                onChange={(e) => onChangeActions('operation', e.target.value, screen, index)}
                                            >
                                                {currentParam.operations.map(o => (
                                                    <MenuItem key={o} value={o}> { o }</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </div>
                                <div className="col-sm-4">
                                    <TextField 
                                        style={{ width: '100%' }}
                                        variant="outlined"
                                        label="Gia tri tac dong..."
                                        value={action.value} 
                                        onChange={(e) => onChangeActions('value', e.target.value, screen, index)}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <ScreensSelect
                                        placeholder={'Di toi man hinh'}
                                        screens={screens}
                                        value={action.nextScreenId}
                                        onChange={(e) => onChangeActions('nextScreenId', e.target.value, screen, index)}/>
                                </div>
                            </>
                        )}

                        {action.type === ACTION_TYPES.NEXT_SCREEN && (
                            <div className="col-sm-6">
                                <ScreensSelect
                                    placeholder={'Di toi man hinh'}
                                    screens={screens}
                                    value={action.value}
                                    onChange={(e) => onChangeActions('value', e.target.value, screen, index)}
                                />
                            </div>
                        )}

                            {action.type === ACTION_TYPES.REDIRECT && (
                               <div className="col-sm-6">
                                    <TextField 
                                        style={{ width: '100%' }}
                                        variant="outlined"
                                        label="Duong dan..."
                                        value={action.value} 
                                        onChange={(e) => onChangeActions('value', e.target.value, screen, index)}
                                    />
                               </div>
                            )}
                        </div>
                    </div>

                    <div className="col-1">
                        <MyDropdownMenu>
                            <MenuItem onClick={() => onRemoveAction(screen, index)}>
                                Xoa
                            </MenuItem>
                        </MyDropdownMenu>
                    </div>
                </div>
                    <hr style={{ border: '1px solid #ccc' }} />
               </div>
            )) }
        </div>
    );
};


export default ActionsList;