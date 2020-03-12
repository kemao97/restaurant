import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import {compose} from 'recompose';
import UsersTableCTN from './UsersTableCTN';
import {Pagination} from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {AlertDialog} from '../../../components';

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

const UsersTable = ({
  className,
  users,
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
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.avatarUrl}
                        >
                          {user.name}
                        </Avatar>
                        <Typography variant="body1">{user.email}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(user.updatedAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <AlertDialog
                        button={
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        }
                        handleSubmit={handleDelete(user.id)}
                      />
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

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  changePaginate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

UsersTable.defaultProps = {
  users: [],
  count: undefined,
};

export default compose(
  UsersTableCTN,
)(UsersTable);
