import React from 'react';
import InputIcon from '@material-ui/icons/Input';
import {IconButton} from '@material-ui/core';
import {compose} from 'recompose';
import {makeStyles} from '@material-ui/styles';
import LogoutCTN from './LogoutCTN';
import PropTypes from 'prop-types';

const Logout = ({onLogout}) => {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.signOutButton}
      color="inherit"
      onClick={onLogout}
    >
      <InputIcon />
    </IconButton>
  );
};

const useStyles = makeStyles((theme) => ({
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

Logout.propTypes = {
  onLogout: PropTypes.func,
};

export default compose(
  LogoutCTN,
)(Logout);
