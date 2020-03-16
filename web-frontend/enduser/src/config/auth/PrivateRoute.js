import React from 'react';
import { Route, Redirect } from 'react-router-dom';
imp

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
    <Route
        {...rest}
        render={props =>
        auth.isAuthenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
        }
    />
    )
};

export default PrivateRoute;

