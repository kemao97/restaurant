import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import ProfileCTN from './ProfileCTN';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = ({className, viewer}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src=''
        to="/account"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {viewer.email}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  viewer: PropTypes.object,
};

export default compose(
  ProfileCTN,
)(Profile);
