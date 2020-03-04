import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField} from '@material-ui/core';
import {compose} from 'recompose';
import AccountDetailsCTN from './AccountDetailsCTN';

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const {className, profile, handleChange, handleSubmit, ...rest} = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                required
                value={profile.email}
                variant="outlined"
                disabled
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={profile.phone}
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={profile.address}
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type='submit'
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
  updateProfile: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AccountDetails.defaultProps = {
  profile: {},
};

export default compose(
  AccountDetailsCTN,
)(AccountDetails);
