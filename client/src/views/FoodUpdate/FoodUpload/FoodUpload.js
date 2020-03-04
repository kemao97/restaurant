import React from 'react';
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {IconButton} from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import FoodUploadCTN from './FoodUploadCTN';
import {Img} from '../../../components/Img';

const FoodUpload = ({handleChange, foodAttachments}) => {
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
            <Img className={classes.image} src={attachment.path} key={attachment.id} />
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
  uploadContainer: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
}));

export default compose(
  FoodUploadCTN,
)(FoodUpload);
