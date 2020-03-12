import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './assets/bootstrap/bootstrap.min.css';
import './App.css';

import HomePage from './pages/enduser/HomePage';
import StoryReadingPage from './pages/enduser/StoryReadingPage';
import CreateStoryPage from './pages/enduser/CreateStoryPage';
import SearchStoriesPage from './pages/enduser/SearchStoriesPage';
import StoryDetailsPage from './pages/enduser/StoryDetailsPage';
import UserProfilePage from './pages/enduser/UserProfilePage';
import UserHistoryPage from './pages/enduser/UserHistoryPage';

import LoginPage from './pages/common/LoginPage';
import RegisterPage from './pages/common/RegisterPage';
import AddUser from './pages/common/AddUser';
import DemoPage from './pages/common/DemoPage';

import DashboardPage from './pages/admin/DashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import StoryManagementPage from './pages/admin/StoryManagementPage';
import TagManagementPage from './pages/admin/TagManagementPage';
import ReportManagementPage from './pages/admin/ReportManagementPage';
import AdminManagementPage from './pages/admin/AdminManagementPage';
import NotFoundPage from './pages/common/NotFoundPage';
import AddAdmin from './pages/common/AddAdmin';

function App() {
  
  return (
    <Router>
      <Switch>
          {/* common routes */}
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/demo" component={DemoPage}/>

          {/* user routes */}
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/create-story" component={CreateStoryPage}/>
          <Route exact path="/search-stories" component={SearchStoriesPage}/>
          <Route exact path="/stories/details/" component={StoryDetailsPage}/>
          <Route exact path="/stories/read/:storyId" component={StoryReadingPage}/>
          <Route exact path="/user/profile" component={UserProfilePage}/>
          <Route exact path="/user/history" component={UserHistoryPage}/>

          {/* admin routes */}
          <Route exact path="/admin/add" component={AddAdmin}/>

          <Route exact path="/admin" component={DashboardPage}/>
          <Route exact path="/admin/users/add" component={AddUser}/>

          <Route exact path="/admin/dashboard" component={DashboardPage}/>
          <Route exact path="/admin/users" component={UserManagementPage}/>
          <Route exact path="/admin/stories" component={StoryManagementPage}/>
          <Route exact path="/admin/tags" component={TagManagementPage}/>
          <Route exact path="/admin/reports" component={ReportManagementPage}/>
          <Route exact path="/admin/admin" component={AdminManagementPage}/>
          

          {/* other routes */}
          <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default App;
