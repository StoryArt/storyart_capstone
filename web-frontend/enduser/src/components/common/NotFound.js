import React from 'react';

const NotFound = (props) => {
    const { message } = props;
    return (
        <div>
            <h3 className="text-center">{message}</h3>
        </div>
    );
};

export default NotFound;
