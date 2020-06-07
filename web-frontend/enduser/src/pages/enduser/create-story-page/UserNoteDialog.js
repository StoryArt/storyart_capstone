import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const UserNoteDialog = (props) => {
    const { open, onClose, note, onChange, onSaveRequestCensorship } = props;
  
    return (
        <div>
     
            <Dialog  open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
            <DialogContent style={{ width: '500px'}}>
                {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nội dung yêu cầu kiểm duyệt..."
                    multiline
                    rows="2"
                    fullWidth
                    value={note}
                    onChange={(e) => onChange(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                 Hủy
                </Button>
                <Button onClick={onSaveRequestCensorship} color="primary">
                    Lưu 
                </Button>
            </DialogActions>
            </Dialog>
      </div>
    );
};

export default UserNoteDialog;