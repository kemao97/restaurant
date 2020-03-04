import React from 'react';
import {makeStyles} from '@material-ui/styles';
import FoodsTable from './FoodsTable';
import FoodsToolbar from './FoodsToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const FoodList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FoodsToolbar />
      <div className={classes.content}>
        <FoodsTable />
      </div>
    </div>
  );
};

export default FoodList;
