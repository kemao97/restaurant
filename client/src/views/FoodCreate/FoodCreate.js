import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {Alert} from '@material-ui/lab';
import {compose} from 'recompose';
import FoodCreateCTN from './FoodCreateCTN';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {get} from 'lodash';

const FoodCreate = ({
  onChange,
  onSubmit,
  form,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Food
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={onSubmit}
        >
          {alert.message && (
            <Alert variant='filled' severity={alert.color}>{alert.message}</Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            error={get(form, 'errors.name')}
            helperText={get(form, 'errors.name')}
            value={form.name}
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={form.price}
            InputLabelProps={{shrink: form.price}}
            error={get(form, 'errors.price')}
            helperText={get(form, 'errors.price')}
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
            value={form.description}
            error={get(form, 'errors.description')}
            helperText={get(form, 'errors.description')}
            rows={4}
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
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

FoodCreate.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object,
};

FoodCreate.defaultProps = {
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
}));

export default compose(
  FoodCreateCTN,
)(FoodCreate);
