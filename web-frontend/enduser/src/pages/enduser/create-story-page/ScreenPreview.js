import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle as MuiDialogTitle, IconButton, Typography,
    DialogContent as MuiDialogContent, DialogActions as MuiDialogActions  }  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import StringUtils from '../../../utils/string';
import ValidationUtils from '../../../utils/validation';
import ScreenShow from '../../../components/common/ScreenShow';

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


const ScreenPreview = (props) => {
    const { open, onClose, screen } = props;
    const [showScreen, setShowScreen] = useState(true);
    
    const toggleScreen = () => {
      if(showScreen){
        setShowScreen(false)
      } else {
        setShowScreen(true);
      }
    }

    return (
        <div>
            {!ValidationUtils.isEmpty(screen) && (
                <Dialog 
                  fullWidth={true}
                  maxWidth={'sm'}
                  onClose={onClose} 
                  aria-labelledby="customized-dialog-title" 
                  open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={onClose}>
                        { StringUtils.getObjTitle(screen) }
                    </DialogTitle>
                    <DialogContent dividers>
                          <ScreenShow 
                              showScreen={showScreen}
                              screen={screen}
                              onSelectAction={() => {}}
                          />
                            <Button onClick={toggleScreen} color="primary">
                                {showScreen ? 'Ẩn màn hình' : 'Hiện màn hình'}
                            </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleScreen} color="primary">
                            {showScreen ? 'Ẩn màn hình' : 'Hiện màn hình'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};


export default ScreenPreview;
