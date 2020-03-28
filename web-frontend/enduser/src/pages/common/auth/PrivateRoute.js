import React, { useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../../context/user.context';
import { ROLE_NAMES } from '../../../common/constants';
import { getAuthUserInfo, isUserAuth, isAdminAuth, isSysAdminAuth, clearTokenFromLocal, setAuthHeader, getTokenFromLocal } from '../../../config/auth';
import UserService from '../../../services/user.service';

const PrivateRoute = ({ component: Component, roleName, ...rest }) => {
    const user = getAuthUserInfo();
   
    return (
        <Route
            {...rest}
            render={props => {
                switch(roleName){
                    case ROLE_NAMES.ROLE_USER: 
                         return isUserAuth(user) ? (<Component {...props} />) : (<Redirect to="/home" />)
                    case ROLE_NAMES.ROLE_ADMIN:
                        return isAdminAuth(user) ? (<Component {...props} />) : (<Redirect to="/login" />)
                    case ROLE_NAMES.ROLE_SYSTEM_ADMIN:
                        return isSysAdminAuth(user) ? (<Component {...props} />) : (<Redirect to="/login" />)
                }
            }}
        />
    )
};

export default PrivateRoute;

