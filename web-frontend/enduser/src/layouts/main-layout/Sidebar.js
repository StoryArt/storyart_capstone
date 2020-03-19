import React, { useContext } from 'react';
import { Link, withRouter }  from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { isUserAuth, getAuthUserInfo, isAdminAuth, isSysAdminAuth } from '../../config/auth';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, 
  ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Button } from '@material-ui/core';
import { Home as HomeIcon, AccountCircle, ChevronRight as ChevronRightIcon, 
  Menu as MenuIcon, MoveToInbox as InboxIcon, Mail as MailIcon, ChevronLeft as ChevronLeftIcon, 
MenuBook as MenuBookIcon, History as HistoryIcon, AddBox as AddBoxIcon } from '@material-ui/icons';

import UserService from '../../services/user.service';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    minHeight: '100vh'
  },
}));

const Sidebar = (props) => {

    const { openSidebar, handleSidebarClose } = props;

    const user = getAuthUserInfo();

    const currentRoute = props.location.pathname;
    const isRouteMatch = (route) => route === currentRoute; 
    const isRouteAdmin = currentRoute.indexOf('/admin') === 0;

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
  
    const navigateRoute = (route) => {
      props.history.push(route);
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={openSidebar}
            classes={{
              paper: classes.drawerPaper,
            }}
        >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleSidebarClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {/* guest routes navigation */}
        {!isRouteAdmin && (
            <List>
                <ListItem 
                    button 
                    onClick={() => navigateRoute('/home')} 
                    selected={ isRouteMatch('/home') }>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Trang chủ" />
                </ListItem>
                <ListItem 
                    button 
                    onClick={() => navigateRoute('/stories/search')} 
                    selected={ isRouteMatch('/stories/search') }>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tìm kiếm truyện" />
                </ListItem>
            </List>
        )}

        {/* admin routes navigation */}
        {(isRouteAdmin && isAdminAuth(user)) && (
              <List>
                <ListItem 
                  button 
                  onClick={() => navigateRoute('/admin/dashboard')} 
                  selected={ isRouteMatch('/admin/dashboard') }>
                    <ListItemIcon>
                      <HistoryIcon />
                      </ListItemIcon>
                    <ListItemText primary="Quản trị" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/users')} 
                    selected={ isRouteMatch('/admin/users') }>
                    <ListItemIcon>
                      <HistoryIcon />
                      </ListItemIcon>
                    <ListItemText primary="Quản lý người dùng" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/stories')} 
                    selected={ isRouteMatch('/admin/stories') }>
                    <ListItemIcon>
                      <HistoryIcon />
                      </ListItemIcon>
                    <ListItemText primary="Quản lý truyện" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/reports')} 
                    selected={ isRouteMatch('/admin/reports') }>
                    <ListItemIcon>
                      <HistoryIcon />
                      </ListItemIcon>
                    <ListItemText primary="Quản lý báo xấu" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/tags')} 
                    selected={ isRouteMatch('/admin/tags') }>
                    <ListItemIcon>
                      <HistoryIcon />
                      </ListItemIcon>
                    <ListItemText primary="Quản lý thẻ" />
                  </ListItem>
                  
              </List>
        )}

        {/* system admin routes navigation */}
        {(isRouteAdmin && isSysAdminAuth(user)) && (
            <List>
                <ListItem 
                button 
                onClick={() => navigateRoute('/admin/admin')} 
                selected={ isRouteMatch('/admin/admin') }>
                <ListItemIcon>
                    <HistoryIcon />
                    </ListItemIcon>
                <ListItemText primary="Quản lý tài khoản admin" />
                </ListItem>
            </List>
        )}
        <Divider />

        {/* auth user routes navigation */}
        {(!isRouteAdmin && isUserAuth(user)) && (
            <List>
             <ListItem 
               button 
               onClick={() => navigateRoute('/user/history')} 
               selected={ isRouteMatch('/user/history') }>
                 <ListItemIcon>
                   <HistoryIcon />
                   </ListItemIcon>
                 <ListItemText primary="Lịch sử" />
               </ListItem>
               <ListItem 
                 button 
                 onClick={() => navigateRoute('/user/edit-profile')} 
                 selected={ isRouteMatch('/user/edit-profile')}>
                 <ListItemIcon>
                   <AccountCircle />
                   </ListItemIcon>
                 <ListItemText primary="Quản lý tài khoản" />
               </ListItem>
               <ListItem 
                 button 
                 onClick={() => navigateRoute('/stories/create')} 
                 selected={ isRouteMatch('/stories/create')}>
                 <ListItemIcon>
                   <AddBoxIcon />
                   </ListItemIcon>
                 <ListItemText primary="Tạo truyên" />
               </ListItem>
           </List>
        )}
       
      </Drawer>
      
    );
};

export default withRouter(Sidebar);
