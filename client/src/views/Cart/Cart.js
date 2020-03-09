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
import CartCTN from './CartCTN';
import Count from '../../components/Count/Count';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const Cart = ({
  classes,
  cart,
  handleCountChange,
  handleDeleteCart,
  handleCheckout,
}) => {
  return (
    <div>
      <CssBaseline />
      <HomeNav />
      <main className={classes.main}>
        <Container className={classes.container} maxWidth='md'>
          {(!cart.cartDetails) ?
            (<Paper className={classes.empty} hidden>
              <Typography variant='h4' component='div'>
                Cart is empty, please go back and find product
              </Typography>
            </Paper>) :
            <div>
              {(() => (
                cart.cartDetails.map((cartDetail) => {
                  const {quantity, food} = cartDetail;
                  return (
                    <Card className={classes.card} key={food.id}>
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
                        <div className={classes.dFlex}>
                          <div className={classes.flex1}>
                            <Count
                              count={quantity}
                              cbChange={handleCountChange(food)}
                            />
                          </div>
                          <IconButton onClick={handleDeleteCart(cartDetail.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ))()}
            </div>
          }
          <div className={classes.calc}>
            <Paper className={classes.totalMoney}>
              <Typography variant='h3'>Total: ${cart.totalMoney}</Typography>
            </Paper>
            <Button
              variant='contained'
              color='primary'
              className={classes.order}
              fullWidth
              onClick={handleCheckout}
            >
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
  flex1: {
    flex: 1,
  },
});

Cart.propTypes = {
  classes: PropTypes.func,
  cart: PropTypes.object,
  handleCountChange: PropTypes.func,
  handleDeleteCart: PropTypes.func,
  handleCheckout: PropTypes.func,
};

Cart.defaultProps = {
  cart: {},
};

export default compose(
  withStyles(style),
  CartCTN,
)(Cart);
