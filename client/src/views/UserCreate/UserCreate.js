import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import {Alert} from '@material-ui/lab';
import UserCreateCTN from './UserCreateCTN';
import {get} from 'lodash';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const UserCreate = ({
  onChange,
  onSubmit,
  form,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar sizes='large' className={classes.avatar}>
          <FontAwesomeIcon icon={faUserPlus} />
        </Avatar>
        <Typography variant="h1">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={onSubmit}
        >
          {get(form, 'errors.general') && (
            <Alert variant='filled' severity='error'>
              {get(form, 'errors.general')}
            </Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!get(form, 'errors.email')}
            helperText={get(form, 'errors.email')}
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            error={!!get(form, 'errors.password')}
            helperText={get(form, 'errors.password')}
            autoComplete="current-password"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Address"
            name="address"
            error={!!get(form, 'errors.address')}
            helperText={get(form, 'errors.address')}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Phone"
            name="phone"
            error={!!get(form, 'errors.phone')}
            helperText={get(form, 'errors.phone')}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

UserCreate.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default compose(
  UserCreateCTN,
)(UserCreate);
