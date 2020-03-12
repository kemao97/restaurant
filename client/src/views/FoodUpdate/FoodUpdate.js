import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import FoodUpdateCTN from './FoodUpdateCTN';
import Grid from '@material-ui/core/Grid';
import {FoodUpload} from '../FoodUpdate';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {get} from 'lodash';

const FoodUpdate = ({
  onChange,
  onSubmit,
  form,
}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar sizes='large' className={classes.avatar}>
            <FastfoodIcon />
          </Avatar>
          <Typography variant="h1">
            Update Food
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={onSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={form.name}
              error={get(form, 'errors.name')}
              helperText={get(form, 'errors.name')}
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              InputLabelProps={{shrink: form.price}}
              error={get(form, 'errors.price')}
              helperText={get(form, 'errors.price')}
              value={form.price}
              name="price"
              label="Price"
              type="number"
              id="price"
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              error={get(form, 'errors.description')}
              helperText={get(form, 'errors.description')}
              value={form.description}
              name="description"
              label="Description"
              type="description"
              id="description"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              UPDATE
            </Button>
          </form>
        </div>
      </Container>
      <FoodUpload />
    </Grid>
  );
};

FoodUpdate.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object,
};

FoodUpdate.defaultProps = {
  form: {},
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
  sidebarRight: {
    width: 350,
    height: 'calc(100% - 64px)',
    position: 'fixed',
    right: 0,
    background: '#FFFFFF',
  },
  container: {
    paddingRight: 350,
    boxSizing: 'content-box',
  },
}));

export default compose(
  FoodUpdateCTN,
)(FoodUpdate);
