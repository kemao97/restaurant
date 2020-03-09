import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from 'recompose';
import HomeCTN from './HomeCTN';
import PropTypes from 'prop-types';
import {get, head} from 'lodash';
import Divider from '@material-ui/core/Divider';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {HomeNav} from '../../layouts';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundImage: 'url(\'./bg-food.jpg\')',
    height: '100vh',
    backgroundAttachment: 'fixed',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(6),
  },
  overlay: {
    backgroundColor: 'black',
    opacity: 0.3,
    height: '100%',
  },
  footerText: {
    color: '#FFFFFF',
  },
  foodPrice: {
    marginLeft: 12,
  },
  foodName: {
    flex: 1,
  },
  dFlex: {
    display: 'flex',
  },
}));

const Home = ({
  foods,
  handleAddToCart,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment >
      <CssBaseline />
      <HomeNav transparent />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <div className={classes.overlay}>

          </div>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {foods.map((food) => (
              <Grid item key={food.id} xs={12} sm={6} md={4}>
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
                  <CardActions>
                    <Button
                      variant='contained'
                      size="small"
                      color="primary"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={handleAddToCart(food.id)}
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography className={classes.footerText} variant="subtitle1" align="center" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

Home.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.object),
  handleAddToCart: PropTypes.func,
};

Home.defaultProps = {
  foods: [],
};

export default compose(
  HomeCTN,
)(Home);
