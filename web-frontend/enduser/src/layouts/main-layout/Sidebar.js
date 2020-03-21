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

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    color: '#fff',
    width: drawerWidth,
    // backgroundColor: '#F0F0C5',
    // backgroundColor: '#d6c494',
    backgroundColor: '#b09c63',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  icon: {
    color: '#fff'
  }
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
                    <ListItemIcon><HomeIcon className={classes.icon}/></ListItemIcon>
                    <ListItemText  primary="Trang chủ" />
                </ListItem>
                <ListItem 
                    button 
                    onClick={() => navigateRoute('/stories/search')} 
                    selected={ isRouteMatch('/stories/search') }>
                    <ListItemIcon>
                        <MenuBookIcon className={classes.icon} />
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
                      <HistoryIcon className={classes.icon} />
                      </ListItemIcon>
                    <ListItemText primary="Quản trị" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/users')} 
                    selected={ isRouteMatch('/admin/users') }>
                    <ListItemIcon>
                      <HistoryIcon className={classes.icon} />
                      </ListItemIcon>
                    <ListItemText primary="Quản lý người dùng" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/stories')} 
                    selected={ isRouteMatch('/admin/stories') }>
                    <ListItemIcon>
                      <HistoryIcon className={classes.icon} />
                      </ListItemIcon>
                    <ListItemText primary="Quản lý truyện" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/reports')} 
                    selected={ isRouteMatch('/admin/reports') }>
                    <ListItemIcon>
                      <HistoryIcon className={classes.icon} />
                      </ListItemIcon>
                    <ListItemText primary="Quản lý báo xấu" />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigateRoute('/admin/tags')} 
                    selected={ isRouteMatch('/admin/tags') }>
                    <ListItemIcon>
                      <HistoryIcon className={classes.icon} />
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
                    <HistoryIcon className={classes.icon} />
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
                   <HistoryIcon className={classes.icon} />
                   </ListItemIcon>
                 <ListItemText primary="Lịch sử" />
               </ListItem>
               <ListItem 
                 button 
                 onClick={() => navigateRoute('/user/edit-profile')} 
                 selected={ isRouteMatch('/user/edit-profile')}>
                 <ListItemIcon>
                   <AccountCircle className={classes.icon} />
                   </ListItemIcon>
                 <ListItemText primary="Quản lý tài khoản" />
               </ListItem>
               <ListItem 
                 button 
                 onClick={() => navigateRoute('/stories/create')} 
                 selected={ isRouteMatch('/stories/create')}>
                 <ListItemIcon>
                   <AddBoxIcon className={classes.icon} />
                   </ListItemIcon>
                 <ListItemText primary="Tạo truyên" />
               </ListItem>
           </List>
        )}
       
      </Drawer>
      
    );
};

export default withRouter(Sidebar);