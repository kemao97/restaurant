import {gql} from 'apollo-server-express';
import {encodeGlobalID} from '../../utils';
import {head} from "lodash";

const typename = 'Cart';

export const cartQueries = gql`
  type Cart {
    id: ID!
    soldAt: Date
    cartDetails: [CartDetail!]!
  }
  
  extend type Mutation {
    createCart: Cart!
    checkoutCart: Cart!
  }
`;

export const generateCartResolvers = (models) => {
  return {
    Cart: {
      id: (obj, args, context, info) => encodeGlobalID(typename, obj.id),
      cartDetails: (cart, args, context, info) => {
        return cart.getCartDetails();
      },
    },
    Mutation: {
      createCart: (obj, args, context, info) => {
        return context.viewer.createCart();
      },
      checkoutCart: async (obj, args, context, info) => {
        const cart = head(await context.viewer.getCarts({
          where: {
            soldAt: null,
          },
        }));
        await cart.update({soldAt: new Date()});
        return cart;
      },
    },
  };
};
