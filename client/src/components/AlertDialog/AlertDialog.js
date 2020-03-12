import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export const AlertDialog = ({
  button,
  title,
  message,
  handleSubmit,
  handleClose,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleSubmitDialog = () => {
    handleSubmit && handleSubmit();
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        {button}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant='subtitle1'>{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant='h3'>
              {message || `Do you wan't delete this item?`}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button variant='outlined' onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSubmitDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
