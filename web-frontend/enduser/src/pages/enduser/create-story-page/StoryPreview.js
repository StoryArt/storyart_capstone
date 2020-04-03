import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle as MuiDialogTitle, IconButton, Typography,
    DialogContent as MuiDialogContent, DialogActions as MuiDialogActions  }  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import StringUtils from '../../../utils/string';
import ValidationUtils from '../../../utils/validation';
import StoryGraph from '../../../components/common/StoryGraph';
import { ACTION_TYPES, SCREEN_COLORS } from '../../../common/constants';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const StoryPreview = (props) => {
    const { open, onClose, story, screens, setCurrentScreen } = props;

    const edges = [];
    screens.forEach((s, i) => {
        s.first = false;
        s.ending = false;
        
        const haveNextScreenAction = s.actions.some(a => a.type === ACTION_TYPES.NEXT_SCREEN || a.type === ACTION_TYPES.UPDATE_INFORMATION)
        
        if(haveNextScreenAction){
            s.actions.forEach((a, i) => {
                if(a.type === ACTION_TYPES.NEXT_SCREEN){
                    edges.push({
                        from: s.id,
                        to: a.value
                    })
                } else if(a.type === ACTION_TYPES.UPDATE_INFORMATION){
                    edges.push({
                        from: s.id,
                        to: a.nextScreenId
                    })
                } 
            })
        } else {
          s.ending = true;
        }

        if(s.id === story.firstScreenId) {
          s.first = true;
        }
    })

    const nodes = screens.map((s, i) => ({
        id: s.id,
        title: `#${i + 1}: ${StringUtils.getObjTitle(s)}`,
        label: `#${i + 1}: ${StringUtils.getObjTitle(s)}`,
        index: i,
        ending: s.ending,
        first: s.first,
        color: s.ending ? SCREEN_COLORS.ENDING_SCREEN : (s.first ? SCREEN_COLORS.FIRST_SCREEN: SCREEN_COLORS.NORMAL_SCREEN)
    }));
    
    return (
        <div>
            {/* <Dialog 
                fullScreen={true}
                onClose={onClose} 
                open={open}>
                <DialogTitle onClose={onClose}>
                    { StringUtils.getObjTitle(story) }
                </DialogTitle>
                <DialogContent 
                    style={{ minHeight: '200px' }}
                    dividers>
                   
                </DialogContent>
              
            </Dialog> */}
            <StoryGraph
                setCurrentScreen={setCurrentScreen}
                nodes={nodes}
                edges={edges}
            />
        </div>
    );
};


export default StoryPreview;
