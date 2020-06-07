import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { makeStyles  } from '@material-ui/core/styles';
import { MenuBook as MenuBookIcon, VideoLabel as VideoLabelIcon } from '@material-ui/icons';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));
  

const UserStoriesTabs = (props) => {
    const classes = useStyles();
    const { value, onChange } = props;

    return (
        <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={onChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Nháp" {...a11yProps(0)} />
            <Tab label="Chấp thuận kiểm duyệt" {...a11yProps(1)} />
            <Tab label="Đang chờ kiểm duyệt" {...a11yProps(2)} />
            <Tab label="Từ chối kiểm duyệt" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        {/* <TabPanel value={value} index={0}>
            {props.children}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {props.children}
        </TabPanel>
        <TabPanel value={value} index={2}>
            {props.children}
        </TabPanel>
        <TabPanel value={value} index={3}>
            {props.children}
        </TabPanel> */}
        
      </div>
    );
};


export default UserStoriesTabs;

