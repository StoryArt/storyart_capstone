import React from 'react';
import { CircularProgress } from '@material-ui/core';

const MySpinner = () => {
    return (
        <div className="text-center">
            <CircularProgress 
                variant="determinate"
                size={24}
                thickness={4}
                color="secondary" />
        </div>
    );
};


export default MySpinner;
