import React from 'react';
import { CircularProgress } from '@material-ui/core';

const MySpinner2 = ({size}) => {
    return (
            <CircularProgress size={size}
                            color="secondary" />
    );
};


export default MySpinner2;
