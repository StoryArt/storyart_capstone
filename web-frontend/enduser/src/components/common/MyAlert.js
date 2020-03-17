import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';



const MyAlert = (props) => {
    const { alert } = props;
    const { content, type, open } = alert;
    
    const [openAlert, setOpenAlert] = useState(true);

    useEffect(() => {
        setOpenAlert(alert.open);
    }, [alert]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false);
    };

    return (
        <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert elevation={6} variant="filled" onClose={handleClose} severity={type}>
                {content}
            </Alert>
        </Snackbar>
    );
};



export default MyAlert;
