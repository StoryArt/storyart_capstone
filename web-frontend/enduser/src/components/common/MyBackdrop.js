import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: 200,
      color: '#fff',
    },
  }));

const MyBackdrop = (props) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Backdrop 
                className={classes.backdrop} 
                open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};


export default MyBackdrop;
