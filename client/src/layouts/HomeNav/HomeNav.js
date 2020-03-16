import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import {Avatar, Badge, IconButton} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Logout} from '../../components/Logout';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import HomeNavCTN from './HomeNavCTN';
import {compose} from 'recompose';

const useStyles = makeStyles((theme) => ({
  dFlex: {
    display: 'flex',
  },
  nav: {
    position: 'fixed',
  },
  navTransparent: {
    background: 'transparent',
  },
  navSecondary: {
    background: 'secondary',
  },
  textWhite: {
    color: 'white',
  },
  signIn: {
    marginLeft: 20,
  },
  split: {
    flex: 1,
  },
}));

const HomeNav = ({transparent, isLogged}) => {
  const classes = useStyles();

  return (
    <AppBar className={`${classes.nav} ${
      transparent ? classes.navTransparent : classes.navSecondary
    }`} position="relative">
      <Container disableGutters maxWidth='xl'>
        <Toolbar>
          <Link href="/">
            <img
              alt="Logo"
              src="/images/logos/logo--white.svg"
            />
          </Link>
          <div className={classes.split} />
          <IconButton href='/cart'>
            <Badge
              badgeContent={null}
              color="secondary"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <ShoppingCartIcon className={classes.textWhite} />
            </Badge>
          </IconButton>
          {isLogged ?
            (<Button href='/account'>
              <Avatar alt='' src='' />
            </Button>) :
            (<div>
              <Button
                className={classes.signIn}
                href='/login'
                variant='contained'
                color='secondary'
                startIcon={<AccountCircleIcon fontSize='large' />}
              >
                Sign In
              </Button>
              <Button
                className={classes.signIn}
                href='/signup'
                variant='contained'
                color='primary'
                startIcon={<AccountCircleIcon fontSize='large' />}
              >
                Sign Up
              </Button>
            </div>)
          }
          {isLogged && <Logout />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

HomeNav.propTypes = {
  transparent: PropTypes.bool,
  isLogged: PropTypes.bool,
};

HomeNav.defaultProps = {
  transparent: false,
  isLogged: false,
};

export default compose(
  HomeNavCTN,
)(HomeNav);
