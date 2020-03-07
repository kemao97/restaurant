import React from 'react';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {compose} from 'recompose';
import {withStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import CountCTN from './CountCTN';

const Count = ({classes, count, increase, minus, onChange}) => {
  return (
    <ButtonGroup size='small' variant="outlined" color="primary">
      <Button onClick={minus}>-</Button>
      <TextField
        className={classes.quantity}
        value={count}
        onChange={onChange}
      />
      <Button onClick={increase}>+</Button>
    </ButtonGroup>
  );
};

const style = () => ({
  quantity: {
    width: 50,
    borderRadius: 0,
  },
});

Count.propTypes = {
  classes: PropTypes.object,
  count: PropTypes.number,
  increase: PropTypes.func,
  minus: PropTypes.func,
  onChange: PropTypes.func,
};

Count.defaultProps = {
  count: 0,
};

export default compose(
  withStyles(style),
  CountCTN,
)(Count);
