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


const AppNavbar = (props) => {
    const { openSidebar, handleSidebarOpen } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openAccountMenu, setOpenAccountMenu] = React.useState(null);

    const user = getAuthUserInfo();
    const classes = useStyles();

    const currentRoute = props.location.pathname;
    const isRouteMatch = (route) => route === currentRoute; 
    const isRouteAdmin = currentRoute.indexOf('/admin') === 0;

    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openSidebar,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleSidebarOpen}
            edge="start"
            className={clsx(classes.menuButton, openSidebar && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flexGrow: 1 }} edge="end" variant="h6" noWrap>
            StoryArt
          </Typography>
            
            {(!isRouteAdmin && !isUserAuth(user)) && (
                <>
                    <Button edge="end" color="inherit">Đăng nhập</Button>
                    <Button color="inherit">Đăng ký</Button>
                </>
            )}
           
            {(isUserAuth(user) || isAdminAuth(user) || isSysAdminAuth(user)) && (
                <>
                    <Button color="inherit">Đăng xuất</Button>
                    <div >
                        <IconButton
                            
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openAccountMenu}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={() => {}}>Tài khoản</MenuItem>
                            <MenuItem onClick={() => {}}>Profile</MenuItem>
                        </Menu>
                    </div>
                </>
            )}
            
        </Toolbar>
      
      </AppBar>
      
    );
};


export default withRouter(AppNavbar);
