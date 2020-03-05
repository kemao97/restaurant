import {gql} from 'apollo-server-express';
import {encodeGlobalID} from '../../utils';
import {uuid} from 'uuidv4';
import fs from 'fs';

export const typename = 'FoodAttachment';

const foodAttachmentCRUD = gql`
  type FoodAttachment {
    id: ID!
    path: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  extend type Query {
    foodAttachment(id: ID!): FoodAttachment
      @retrieve(objectName: "FoodAttachment", callResolver: false)
  }
  
  extend type Mutation {
    createFoodAttachment(foodId: ID!, file: Upload!): Boolean
      @retrieve(objectName: "Food", idName: "foodId")
    deleteFoodAttachment(id: ID!): Boolean
      @delete(objectName: "FoodAttachment")
  }
`;

export const foodAttachmentQueries = [
  foodAttachmentCRUD,
];

export const generateFoodAttachmentResolvers = (models) => {
  return {
    Mutation: {
      createFoodAttachment: async (obj, args, context, info) => {
        const {foodRetrieve} = context;
        const {createReadStream, filename, minetype} = await args.file;
        const nameSplit = filename.split('.');
        const filenameStorage = `${uuid()}.${nameSplit[nameSplit.length - 1]}`;
        createReadStream().pipe(
          fs.createWriteStream(`./public/uploads/${filenameStorage}`),
        );
        const foodAttachment = {
          path: `/uploads/${filenameStorage}`,
        };
        await foodRetrieve.createFoodAttachment(foodAttachment);
        return true;
      },
    },
    FoodAttachment: {
      id: (obj, args, context, info) => encodeGlobalID(typename, obj.id),
    },
  };
};
