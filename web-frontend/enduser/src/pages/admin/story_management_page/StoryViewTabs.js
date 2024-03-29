import React from 'react';
import PropTypes from 'prop-types';
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
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
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
  
  

const StoryViewTabs = (props) => {
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
            <Tab label="Nội dung được admin chấp thuận gần nhất" icon={<MenuBookIcon />} {...a11yProps(0)} />
            <Tab label="Nội dung cần kiểm duyệt" icon={<MenuBookIcon />} {...a11yProps(1)} />
            <Tab label="Kiểm duyệt" icon={<SupervisorAccountIcon />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {props.children}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {props.children}
        </TabPanel>
        <TabPanel value={value} index={2}>
            {props.children}
        </TabPanel>
        
        
      </div>
    );
};


export default StoryViewTabs;





