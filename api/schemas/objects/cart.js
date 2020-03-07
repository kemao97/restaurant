import {gql} from 'apollo-server-express';
import {encodeGlobalID} from '../../utils';

const typename = 'Cart';

export const cartQueries = gql`
  type Cart {
    id: ID!
    soldAt: Date
    cartDetail: [CartDetail!]!
  }
  
  extend type Mutation {
    createCart: Cart!
  }
`;

export const generateCartResolvers = (models) => {
  return {
    Cart: {
      id: (obj, args, context, info) => encodeGlobalID(typename, obj.id),
      cartDetail: (cart, args, context, info) => {
        return cart.getCartDetails();
      },
    },
    Mutation: {
      createCart: (obj, args, context, info) => {
        return context.viewer.createCart();
      },
    },
  };
};
