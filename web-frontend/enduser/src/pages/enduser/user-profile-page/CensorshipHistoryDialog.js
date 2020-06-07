import React from 'react';
import CensorshipHistory from '../../admin/story_management_page/CensorshipHistory';
import { Dialog, DialogContent, TextField, Button, DialogActions } from '@material-ui/core';

const CensorshipHistoryDialog = (props) => {
    const { story, open, onClose, note, onChange, onSaveRequestCensorship } = props;
    
    const submitCensorship = (e) => {
        e.preventDefault();
        onSaveRequestCensorship(story);
    }

    return (

        <div>
            <Dialog maxWidth="lg" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
            <DialogContent >
                {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
                </DialogContentText> */}
                <form onSubmit={submitCensorship} className="my-5">
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nội dung yêu cầu..."
                        multiline
                        rows="2"
                        fullWidth
                        value={note}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <Button style={{ float: 'right' }} onClick={onSaveRequestCensorship} color="primary">
                        Gửi yêu cầu kiểm duyệt 
                    </Button>

                </form>
                <CensorshipHistory censorships={story.censorships}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
            </Dialog>
            
        </div>
    );
};


export default CensorshipHistoryDialog;