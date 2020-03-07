import {gql} from 'apollo-server-express';
import {head} from 'lodash';
import {encodeGlobalID} from '../../utils';

export const cartDetailQueries = gql`
  type CartDetail {
    id: ID!
    quantity: Int!
    food: Food!
  }
  
  input CartDetailInput {
    foodId: ID!,
    quantity: Int!,
  }
  
  extend type Mutation {
    upsertCartDetail(input: CartDetailInput): CartDetail
      @retrieve(objectName: "Food", idPath: "input.foodId")
    deleteCartDetail(id: ID!): Boolean
      @delete(objectName: "CartDetail")
  }
`;

const typename = 'CartDetail';

export const generateCartDetailResolvers = (models) => {
  return {
    CartDetail: {
      id: (obj, args, context, info) => encodeGlobalID(typename, obj.id),
      food: (cartDetail, args, context, info) => {
        return cartDetail.getFood();
      },
    },
    Mutation: {
      upsertCartDetail: async (obj, args, context, info) => {
        const {CartDetailModel} = context.models;
        const {foodRetrieve} = context;
        const {quantity} = args.input;
        const cart = head(await context.viewer.getCarts({
          where: {
            soldAt: null,
          },
        }));
        const cartDetail = head(await cart.getCartDetails({
          where: {
            foodId: foodRetrieve.id,
          },
        }));
        let cartDetailCreated;
        if (cartDetail) {
          cartDetailCreated = await cartDetail.update({quantity});
        } else {
          cartDetailCreated = await CartDetailModel.create({
            cartId: cart.id,
            foodId: foodRetrieve.id,
            quantity: quantity,
          });
        }
        return cartDetailCreated;
      },
    },
  };
};
