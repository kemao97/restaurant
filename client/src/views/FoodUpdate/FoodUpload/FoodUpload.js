import React from 'react';
import {IconButton, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BackupIcon from '@material-ui/icons/Backup';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import FoodUploadCTN from './FoodUploadCTN';
import {Img} from '../../../components/Img';
import DeleteIcon from '@material-ui/icons/Delete';
import {AlertDialog} from '../../../components';

const FoodUpload = ({handleChange, foodAttachments, handleDelete}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.sidebarRight}>
      <div className={classes.dFlex}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <div className={classes.uploadContainer}>
          <input
            type="file"
            id='upload'
            onChange={handleChange}
            hidden
          />
          <label htmlFor="upload">
            <IconButton component='span'>
              <BackupIcon />
            </IconButton>
          </label>
        </div>
      </div>
      <Divider variant='fullWidth' />
      <div>
        {foodAttachments.map((attachment) => {
          return (
            <div className={classes.imageItem} key={attachment.id}>
              <div>
                <Img className={classes.image} src={attachment.path} />
              </div>
              <div className={classes.flex1}>
                <AlertDialog
                  button={
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  }
                  handleSubmit={handleDelete(attachment.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

FoodUpload.propTypes = {
  handleChange: PropTypes.func,
  foodAttachments: PropTypes.arrayOf(PropTypes.object),
};

FoodUpload.defaultProps = {
  foodAttachments: [],
};

const useStyles = makeStyles((theme) => ({
  sidebarRight: {
    width: 350,
    height: 'calc(100% - 64px)',
    overflow: 'auto',
    position: 'fixed',
    right: 0,
    background: '#FFFFFF',
    padding: 20,
  },
  dFlex: {
    display: 'flex',
  },
  flex1: {
    flex: 1,
  },
  uploadContainer: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  imageItem: {
    display: 'flex',
    marginTop: 10,
  },
}));

export default compose(
  FoodUploadCTN,
)(FoodUpload);
