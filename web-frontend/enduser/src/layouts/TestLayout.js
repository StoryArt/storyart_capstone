import React from 'react';
import { Link, withRouter }  from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, 
  ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Button } from '@material-ui/core';

import { Home as HomeIcon, AccountCircle, ChevronRight as ChevronRightIcon, 
  Menu as MenuIcon, MoveToInbox as InboxIcon, Mail as MailIcon, ChevronLeft as ChevronLeftIcon, 
MenuBook as MenuBookIcon, History as HistoryIcon, AddBox as AddBoxIcon } from '@material-ui/icons';

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

function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openAccountMenu = Boolean(anchorEl);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigateRoute = (route) => {
    props.history.push(route);
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const currentRoute = props.location.pathname;
  const isRouteMatch = (route) => route === currentRoute; 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flexGrow: 1 }} edge="end" variant="h6" noWrap>
            StoryArt
          </Typography>
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
            <Button edge="end" color="inherit">Đăng nhập</Button>
            <Button color="inherit">Đăng ký</Button>
            <Button color="inherit">Đăng xuất</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
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
        <Divider />
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
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
       
        {props.children}
      </main>
    </div>
  );
}

export default withRouter(PersistentDrawerLeft)