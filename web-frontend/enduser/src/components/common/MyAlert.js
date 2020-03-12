import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';


const MyAlert = (props) => {

    const { content, type, open } = props;
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        setOpenAlert(open);
    }, [open]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false);
    };

    return (
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                {content}
            </Alert>
        </Snackbar>
    );
};


export default MyAlert;
