import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './assets/bootstrap/bootstrap.min.css';
import './App.css';

import GlobalContext from './context';

import HomePage from './pages/enduser/home-page/HomePage';
import StoryReadingPage from './pages/enduser/story-reading-page/StoryReadingPage';
import CreateStoryPage from './pages/enduser/create-story-page/CreateStoryPage';
import SearchStoriesPage from './pages/enduser/search-stories-page/SearchStoriesPage';
import StoryDetailsPage from './pages/enduser/story-details-page/StoryDetailsPage';
import UserProfilePage from './pages/enduser/user-profile-page/UserProfilePage';
import UserPublicProfilePage from './pages/enduser/user-profile-page/UserPublicProfilePage';
import UserHistoryPage from './pages/enduser/user-history-page/UserHistoryPage';

import LoginPage from './pages/common/LoginPage';
import RegisterPage from './pages/common/RegisterPage';

import DashboardPage from './pages/admin/DashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';

import AddUser from './pages/common/AddUser';
import DemoPage from './pages/common/DemoPage';

import StoryManagementPage from './pages/admin/StoryManagementPage';
import TagManagementPage from './pages/admin/TagManagementPage';
import ReportManagementPage from './pages/admin/ReportManagementPage';
import AdminManagementPage from './pages/admin/AdminManagementPage';
import NotFoundPage from './pages/common/NotFoundPage';


import AddAdmin from './pages/common/AddAdmin';

import PrivateRoute from './pages/common/auth/PrivateRoute';


import { getTokenFromLocal, setAuthHeader, interceptResponse } from './config/auth';
import ValidationUtils from './utils/validation';
import { ROLE_NAMES } from './common/constants';
import UserService from './services/user.service';

function App() {

  const redirectToLoginPage = () => {
    window.location.href = '/login';
  }

  // redirect to login page when response status is 401 or 403
  interceptResponse(() => {
    UserService.logout();
  });

  //get token from local storage when access the website
  useEffect(() => {
    const token = getTokenFromLocal();
    if(ValidationUtils.isEmpty(token)){
      setAuthHeader(null);
    } else {
      setAuthHeader(token);
    }
  }, []);

  return (
    <GlobalContext>
      <Router>
        <Switch>
            {/* common routes */}
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/demo" component={DemoPage}/>

            {/* user routes */}
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/stories/search" component={SearchStoriesPage}/>
            <Route exact path="/stories/details/:storyId" component={StoryDetailsPage}/>
            <Route exact path="/stories/read/:storyId" component={StoryReadingPage}/>
            <Route exact path="/user/profile/:userId" component={UserPublicProfilePage}/>

            <PrivateRoute 
              exact 
              path="/stories/create" 
              roleName={ROLE_NAMES.ROLE_USER} 
              component={CreateStoryPage}/>
            
            <PrivateRoute 
              exact 
              path="/user/edit-profile" 
              roleName={ROLE_NAMES.ROLE_USER}  
              component={UserProfilePage}/>
           
            <PrivateRoute 
              exact 
              path="/user/history" 
              roleName={ROLE_NAMES.ROLE_USER} 
              component={UserHistoryPage}/>


            {/* system admin routes */}
            <PrivateRoute exact path="/admin/add" roleName={ROLE_NAMES.ROLE_SYSTEM_ADMIN}  component={AddAdmin}/>
            <PrivateRoute exact path="/admin/admin" roleName={ROLE_NAMES.ROLE_SYSTEM_ADMIN} component={AdminManagementPage}/>


            {/* admin routes */}            
            <PrivateRoute exact path="/admin" roleName={ROLE_NAMES.ROLE_ADMIN} component={DashboardPage}/>
            <PrivateRoute exact path="/admin/users/add" roleName={ROLE_NAMES.ROLE_ADMIN} component={AddUser}/>
            <PrivateRoute exact path="/admin/dashboard" roleName={ROLE_NAMES.ROLE_ADMIN} component={DashboardPage}/>
            <PrivateRoute exact path="/admin/users" roleName={ROLE_NAMES.ROLE_ADMIN} component={UserManagementPage}/>
            <PrivateRoute exact path="/admin/stories" roleName={ROLE_NAMES.ROLE_ADMIN} component={StoryManagementPage}/>
            <PrivateRoute exact path="/admin/tags" roleName={ROLE_NAMES.ROLE_ADMIN} component={TagManagementPage}/>
            <PrivateRoute exact path="/admin/reports" roleName={ROLE_NAMES.ROLE_ADMIN} component={ReportManagementPage}/>
            

            {/* other routes */}
            <Route component={NotFoundPage}/>
            <Route exact path="/notfound" component={NotFoundPage}/>
        </Switch>
      </Router>
    </GlobalContext>
  );
}

export default App;
