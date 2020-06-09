import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle as MuiDialogTitle, IconButton, Typography,
    DialogContent as MuiDialogContent, DialogActions as MuiDialogActions, Slide, Paper, List, ListItem, Container, CssBaseline, Avatar, TextField, FormControl, InputLabel, Select, MenuItem  }  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import StringUtils from '../../../utils/string';
import ValidationUtils from '../../../utils/validation';
import { ACTION_TYPES, STRING_CONDITIONS, INFORMATION_TYPES, CENSORSHIP_STATUS, getCensorshipStatus } from '../../../common/constants';
import StoryPreview from '../../enduser/create-story-page/StoryPreview';
import ScreenTypes from '../../enduser/create-story-page/ScreenTypes';
import StoryTabs from '../../enduser/create-story-page/StoryTabs';
import StoryViewTabs from './StoryViewTabs';
import TagList from '../../../components/common/TagList';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import StoryService from '../../../services/story.service';
import CensorshipService from '../../../services/censorship.service';
import CensorshipHistory from './CensorshipHistory';
import CensorshipStoryDetails from './CensorshipStoryDetails';


const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    fullHeight: {
      height: '100%'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

  
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const censorShips = getCensorshipStatus();

const StoryView = (props) => {

    const { open, onClose, story, oldStory, changeCurrentStory, setAlert, setOpenBackdrop } = props;
    const classes = withStyles(styles);

    useEffect(() => {
        if(!ValidationUtils.isEmpty(story)){
            setCensorship({ 
                adminNote: '', 
                censorshipStatus: story.censorshipStatus === CENSORSHIP_STATUS.PENDING ? CENSORSHIP_STATUS.APPROVED : story.censorshipStatus, 
                storyId: story.id 
            })
        }
    }, [story]);

    const [storyTab, setStoryTab] = useState(0);
    const [censorShip, setCensorship] = useState({ censorshipStatus: '', adminNote: '' });

   
    const closeAlert = () => window.setTimeout(() => setAlert({ content: '', open: false }), 3000);

   
    const changeCensorship = (prop, value) => {
        setCensorship({ ...censorShip, [prop]: value });
       
    }

    const handleCensorshipByAdmin = async (e) => {
        e.preventDefault();
        setOpenBackdrop(true);
        try {
            const res = await CensorshipService.handleCensorshipByAdmin(censorShip);
            console.log(res);
            const { success, errors } = res.data;
            if(success){
                setAlert({ content: 'Cập nhật thành công', type: "success", open: true });  
                changeCurrentStory(censorShip);
                onClose();
            } else {
                setAlert({ content: Object.values(errors), type: 'error', open: true });
            }
        } catch (error) {
            console.log(error);
            if (!ValidationUtils.isEmpty(error.response)) {
                setAlert({ content: Object.values(error.response.data)[0], type: 'error', open: true });
            } else {
                setAlert({ content: 'Không thể lưu kiểm duyệt', type: 'error', open: true });
            }
        }
        setOpenBackdrop(false);
        closeAlert();
    }

    return (
        <div>
              <Dialog 
                  fullScreen
                  TransitionComponent={Transition}
                  onClose={onClose} 
                  open={open}>
                    <DialogTitle onClose={onClose} style={{ backgroundColor: '#877AA3', color: '#fff' }}>
                        { story.title }
                    </DialogTitle>
                    <DialogContent 
                      style={{ minHeight: '100vh', padding: 0, fontSize: 'inherit', backgroundColor: '#F7F7F7' }}
                      dividers>
                       {!ValidationUtils.isEmpty(story) && (
                           
                            <StoryViewTabs
                                value={storyTab}
                                onChange={(e, value) => setStoryTab(value)}
                            >
                                {storyTab === 0 && (
                                    <CensorshipStoryDetails story={oldStory} />
                                )}

                                {storyTab === 1 && (
                                   <CensorshipStoryDetails story={story} />
                                )}
                                
                                {storyTab === 2 && (
                                   <div>
                                        <Container component="main" maxWidth="xs">
                                        <CssBaseline />
                                        <div className={classes.paper}>
                                        <Avatar className={classes.avatar}>
                                            <SupervisorAccountIcon />
                                        </Avatar>
                                            <Typography component="h1" variant="h5">
                                                Kiểm Duyệt
                                            </Typography>
                                        <form className={classes.form} noValidate 
                                            onSubmit={handleCensorshipByAdmin}>

                                                <FormControl variant="outlined" style={{ width: '100%', marginTop: '20px' }}>
                                                    <InputLabel>Trạng thái kiểm duyệt</InputLabel>
                                                    <Select
                                                        value={censorShip.censorshipStatus}
                                                        onChange={(e) => changeCensorship('censorshipStatus', e.target.value)}
                                                    >
                                                        {censorShips.map((censorship) => {
                                                            return censorship.value !== CENSORSHIP_STATUS.PENDING ? (
                                                                <MenuItem 
                                                                    key={censorship.value} 
                                                                    value={censorship.value}>
                                                                    {censorship.title}
                                                                </MenuItem>
                                                            ) : null
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    style={{ marginTop: '20px', marginBottom: '20px' }}
                                                    multiline={true}
                                                    rows={2}
                                                    fullWidth
                                                    value={censorShip.adminNote}
                                                    label="Admin note"
                                                    onChange={e => changeCensorship("adminNote", e.target.value)}
                                                    autoFocus
                                                />

                                        
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                >
                                                Lưu
                                                </Button>
                                        </form>
                                        
                                        </div>
                                    </Container>
                                        <div className="container mt-5">
                                        
                                            <div className="col-sm-8 mx-auto">
                                                <CensorshipHistory censorships={story.censorships} />
                                            </div>
                                        </div>
                                   </div>
                                )}
                            </StoryViewTabs>
                          
                       )}
                        
                    </DialogContent>
                </Dialog>
            
        </div>
    );
};

export default StoryView;