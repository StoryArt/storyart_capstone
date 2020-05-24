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

    const { open, onClose, story, changeCurrentStory, setAlert } = props;
    const classes = withStyles(styles);

    useEffect(() => {
        if(!ValidationUtils.isEmpty(story)){
            changeCurrentScreen(story.firstScreenId);
            setCensorship({ 
                adminNote: story.adminNote, 
                censorshipStatus: story.censorshipStatus, 
                storyId: story.id 
            })
        }
    }, [story]);

    const [currentScreen, setCurrentScreen] = useState(null);
    const [storyTab, setStoryTab] = useState(0);
    const [censorShip, setCensorship] = useState({ censorshipStatus: '', adminNote: '' });

    const handleSelectAction = (action) => {
         if (action.type === ACTION_TYPES.REDIRECT) {
            window.open(action.value, '_blank');
        } else if (action.type === ACTION_TYPES.NEXT_SCREEN) {
            changeCurrentScreen(action.value);
        }
    }

    const changeCurrentScreen = (screenId) => {
        const screen = story.screens.find(scr => scr.id === screenId);
        setCurrentScreen(screen);
    }

    const getScreenById = (screenId) => {
        return story.screens.find(scr => scr.id === screenId);
    }

    const closeAlert = () => window.setTimeout(() => setAlert({ content: '', open: false }), 3000);

    const getStoryUrls = () => {
        const urls = [];
        story.screens.forEach(scr => {
            scr.actions.forEach(action => {
                if(action.type === ACTION_TYPES.REDIRECT){
                    urls.push(action.value);
                }
            })
        });
        return urls;
    }

    const changeCensorship = (prop, value) => {
        setCensorship({ ...censorShip, [prop]: value });
    }

    const saveCensorship = async (e) => {
        e.preventDefault();
        console.log(censorShip);
        try {
            const res = await StoryService.saveCensorship(censorShip);
            console.log(res);
            const { success, errors } = res.data;
            if(success){
                setAlert({ content: 'Cập nhật thành công', type: "success", open: true });  
                changeCurrentStory(censorShip);
                // onClose();
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

        closeAlert();
    }

    return (
        <div>
              <Dialog 
                  fullScreen
                  // fullWidth={true}
                  // maxWidth={'sm'}
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
                                   <div className="container">
                                       <div className="row">
                                            <div className="col-sm-4">
                                                <img src={story.image} className="img-fluid" />
                                            </div>
                                            <div className="col-sm-8">
                                                <List  aria-label="main mailbox folders">
                                                    <ListItem button>
                                                        <div>
                                                            <strong>Tiêu đề: </strong> {story.title}
                                                        </div>
                                                    </ListItem>
                                                    <ListItem button>
                                                        <div>
                                                            <strong>Tác giả: </strong> 
                                                            <a href={`/user/profile/${story.user.id}`} target="_blank">{story.user.name}</a>
                                                        </div>
                                                    </ListItem>
                                                    <ListItem button>
                                                        <div>
                                                            <strong>Hiệu ứng: </strong> {story.animation}
                                                        </div>
                                                    </ListItem>
                                                    <ListItem button>
                                                       <div>
                                                        <strong>Thể loại: </strong> <TagList tags={story.tags} />
                                                       </div>
                                                    </ListItem>
                                                    <ListItem button>
                                                        <div>
                                                            <div className="font-weight-bold">Thông tin: </div>
                                                            {story.informations.map(info => (
                                                                <div key={info.id}>
                                                                    <div className="pl-2">
                                                                        {info.name}: {info.value} ({info.type === INFORMATION_TYPES.NUMBER ? 'Số': 'Chuối kí tự'})
                                                                    </div>
                                                                    <div className="pl-4">
                                                                        <strong>Điều kiện:</strong>
                                                                        {info.conditions.map(cond => (
                                                                            <div key={cond.id}>
                                                                                <strong>{info.name} {cond.type} {cond.value}</strong> ({getScreenById(cond.nextScreenId).title})
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </ListItem>
                                                    <ListItem button>
                                                       <div>
                                                        <strong>Các đường dẫn: </strong>
                                                            {getStoryUrls().map(url => (
                                                                <div className="pl-2 mb-2"><a href={url} target="_blank">{url}</a></div>
                                                            ))}
                                                       </div>
                                                    </ListItem>
                                                </List>
                                            </div>
                                    
                                       </div>
                                   </div>
                                )}
                                {storyTab === 1 && (
                                    <div className="container-fluid">
                                        <div className="row my-5">
                                            <div className="col-sm-5">
                                                <StoryPreview 
                                                    firstScreenId={story.firstScreenId} 
                                                    screens={story.screens} 
                                                    setCurrentScreen={(screenId) => changeCurrentScreen(screenId)}/>
                                                    <br/>
                                                    <ScreenTypes />
                                            </div>
                                            
                                            <div className="col-sm-7">
                                                {!ValidationUtils.isEmpty(currentScreen) && (
                                                    <Paper style={{ padding: '20px' }}>
                                                        
                                                        <h4 className="font-weight-bold">{currentScreen.title}</h4>
                                                        <div style={{ fontSize:'1em' }} className="ql-editor">
                                                            {StringUtils.parseHtml(currentScreen.content)}
                                                        </div>
                                                        <div className="row screen-card-body">
                                                        {currentScreen.actions.map(action => (
                                                            <div
                                                                className={`${currentScreen.actions.length > 1 ? 'col-sm-6' : 'col-12'}`}
                                                                key={action.id}>
                                                                    <div
                                                                        style={{ fontSize: '1.2em' }}
                                                                        onClick={() => handleSelectAction(action)}
                                                                        className="action-content text-center">
                                                                        <span>{action.content}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Paper>
                                                )}
                                            </div>
                                        
                                        </div>
                                    </div>
                                )}
                                
                                {storyTab === 2 && (
                                     <Container component="main" maxWidth="xs">
                                     <CssBaseline />
                                     <div className={classes.paper}>
                                       <Avatar className={classes.avatar}>
                                         <SupervisorAccountIcon />
                                       </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Bản Kiểm Duyệt
                                        </Typography>
                                       <form className={classes.form} noValidate onSubmit={saveCensorship}>

                                            <FormControl variant="outlined" style={{ width: '100%', marginTop: '20px' }}>
                                                <InputLabel>Trạng thái kiểm duyệt</InputLabel>
                                                <Select
                                                    value={censorShip.censorshipStatus}
                                                    onChange={(e) => changeCensorship('censorshipStatus', e.target.value)}
                                                >
                                                    {censorShips.map((censorship) => (
                                                        <MenuItem key={censorship.value} value={censorship.value}>
                                                            {censorship.title}
                                                        </MenuItem>
                                                    ))}
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
                                )}
                            </StoryViewTabs>
                          
                       )}
                        
                    </DialogContent>
                </Dialog>
            
        </div>
    );
};

export default StoryView;