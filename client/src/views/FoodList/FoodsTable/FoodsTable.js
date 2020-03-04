import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FoodsTableCTN from './FoodsTableCTN';
import {compose} from 'recompose';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const FoodsTable = ({
  className,
  foods,
  count,
  pagination,
  changePaginate,
  handleDelete,
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foods.map((food) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={food.id}
                  >
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.price}</TableCell>
                    <TableCell>{food.description}</TableCell>
                    <TableCell>
                      {moment(food.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(food.updatedAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <IconButton href={`/food/${food.id}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={(e) => handleDelete(e, food.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <Pagination count={count} page={pagination.offset} onChange={changePaginate} />
      </CardActions>
    </Card>
  );
};

FoodsTable.propTypes = {
  className: PropTypes.string,
  foods: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  changePaginate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

FoodsTable.defaultProps = {
  foods: [],
  count: undefined,
};

export default compose(
  FoodsTableCTN,
)(FoodsTable);
