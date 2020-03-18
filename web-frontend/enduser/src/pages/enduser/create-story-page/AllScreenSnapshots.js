import React from 'react';
// import { Tooltip } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import ValidationUtils from '../../../utils/validation';
import StringUtils from '../../../utils/string';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: '100%',
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    text: {
        fontSize: '10px'
    }
}));

const AllScreenSnapshots = (props) => {
    const { screens, setCurrentScreen, currentScreen, onRemoveScreen } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {screens.map((screen, index) => (
                <ListItem 
                    selected={index === currentScreen} 
                    button  
                    key={screen.id} onClick={() => setCurrentScreen(index)}>
                    <div className="d-flex">
                        <div className="">
                            <ListItemText 
                                className={classes.text} s
                                primary={`#${index + 1 } (${ValidationUtils.isEmpty(screen.title) ? 'Chưa có tiêu đề' : screen.title})`} />
                            <small>{ StringUtils.truncate(StringUtils.removeHtml(screen.content), 50) }</small>
                        </div>
                        <div className="ml-1">
                            <ListItemSecondaryAction>
                                <Tooltip title="Xoa man hinh">
                                    <IconButton edge="end" aria-label="delete" onClick={() => onRemoveScreen(screen)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </div>
                    </div>
                </ListItem>
            ))}
            
        </div>
    );
};


export default AllScreenSnapshots;
