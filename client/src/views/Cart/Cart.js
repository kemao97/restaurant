import React from 'react';
import {compose} from 'recompose';
import HomeNav from '../../layouts/HomeNav';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import {get, head} from 'lodash';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Count from '../../components/Count/Count';

const food = {
  id: 1,
  name: 'Xoài',
  price: 123,
  description: 'Hoa quả tráng miệng sau mỗi bữa ăn. Thực phẩm được nhập khẩu từ trang trại khép kín theo tiêu chuẩn TCN',
  foodAttachments: [
    {
      id: 2,
      path: '/uploads/057462cf-9052-421e-84fd-03ac5902e4b7.jpeg',
    },
  ],
};

const Cart = ({
  classes,
}) => {
  return (
    <div>
      <CssBaseline />
      <HomeNav />
      <main className={classes.main}>
        <Container className={classes.container} maxWidth='md'>
          {false && (
            <Paper className={classes.empty} hidden>
              <Typography variant='h4' component='div'>
                Cart is empty, please go back and find product
              </Typography>
            </Paper>
          )}
          <div>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={
                  get(food.foodAttachments, '[0].path') ?
                    `${process.env.REACT_APP_ATTACH_PREFIX}${get(head(food.foodAttachments), 'path')}` :
                    './food-default.jpg'
                }
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.dFlex}>
                  <Typography className={classes.foodName} gutterBottom variant="h5" component="h2">
                    {food.name}
                  </Typography>
                  <Typography className={classes.foodPrice} gutterBottom variant="h5" component="h2">
                    ${food.price}
                  </Typography>
                </div>
                <Divider variant='fullWidth' />
                <Typography>
                  {food.description}
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={
                  get(food.foodAttachments, '[0].path') ?
                    `${process.env.REACT_APP_ATTACH_PREFIX}${get(head(food.foodAttachments), 'path')}` :
                    './food-default.jpg'
                }
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.dFlex}>
                  <Typography className={classes.foodName} gutterBottom variant="h5" component="h2">
                    {food.name}
                  </Typography>
                  <Typography className={classes.foodPrice} gutterBottom variant="h5" component="h2">
                    ${food.price}
                  </Typography>
                </div>
                <Divider variant='fullWidth' />
                <Typography>
                  {food.description}
                </Typography>
                <Divider className={classes.divider} variant='fullWidth' />
                <Count />
              </CardContent>
            </Card>
          </div>
          <div className={classes.calc}>
            <Paper className={classes.totalMoney}>
              <Typography variant='h3'>Total: $200</Typography>
            </Paper>
            <Button variant='contained' color='primary' className={classes.order} fullWidth>
              Order
            </Button>
          </div>
        </Container>
      </main>
    </div>
  );
};

const style = () => ({
  main: {
    paddingTop: 64,
  },
  container: {
    marginTop: 20,
    display: 'flex',
  },
  empty: {
    minHeight: 300,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calc: {
    width: 250,
    marginLeft: 20,
    maxHeight: 100,
  },
  totalMoney: {
    height: 100,
    padding: 20,
  },
  order: {
    marginTop: 20,
  },
  card: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
  cardMedia: {
    width: '56.25%',
  },
  dFlex: {
    display: 'flex',
  },
  foodPrice: {
    marginLeft: 12,
  },
  foodName: {
    flex: 1,
  },
  divider: {
    marginBottom: 10,
  },
});

Cart.propTypes = {
  classes: PropTypes.func,
};

Cart.defaultProps = {
};

export default compose(
  withStyles(style),
)(Cart);
