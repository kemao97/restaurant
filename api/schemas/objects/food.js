import {gql} from 'apollo-server-express';
import {encodeGlobalID} from '../../utils';
import {get} from 'lodash';
import {number, object, string} from 'yup';

export const typename = 'Food';

const foodInput = gql`
  input CreateFoodInput {
    name: String!
    description: String!
    price: Int!
  }
  
  input UpdateFoodInput {
    name: String!
    description: String!
    price: Int!
  }
  
  input FoodSearch {
    name: String
    description: String
  }
  
  input FoodPageOptions {
    pagination: Pagination
    search: FoodSearch
  }
`;

const foodPage = gql`
  type FoodPage {
    foods: [Food!]!
    meta: PageMeta!
  }
  
  extend type Query {
    foods(options: FoodPageOptions): FoodPage
  }
`;

const foodCRUD = gql`
  type Food {
    id: ID!
    name: String!
    description: String!
    price: Int
    createdAt: DateTime
    updatedAt: DateTime
    foodAttachments: [FoodAttachment!]!
  }
  
  extend type Query {
    food(id: ID!): Food
      @retrieve(objectName: "Food", callResolver: false)
      @auth(operations: ["food.read"])
  }
  
  extend type Mutation {
    createFood(input: CreateFoodInput!): Food
      @create(objectName: "Food")
      @validate(yupName: "yupFood")
      @auth(operations: ["food.create"])
    updateFood(id: ID!, input: UpdateFoodInput!): Food
      @update(objectName: "Food")
      @validate(yupName: "yupFood")
      @auth(operations: ["food.update"])
    deleteFood(id: ID!): Boolean
      @delete(objectName: "Food")
      @auth(operations: ["food.delete"])
  }
`;

export const foodQueries = [
  foodInput,
  foodPage,
  foodCRUD,
];

export const yupFood = async (args, context, options) => {
  const validateFieldConfig = object({
    name: string()
      .required()
      .max(100),
    price: number()
      .required()
      .min(1)
      .max(1000),
    description: string()
      .required()
      .max(500),
  });
  return {
    validateFieldConfig,
  };
};

export const generateFoodResolvers = (models) => {
  const {FoodModel} = models;
  return {
    Query: {
      foods: async (obj, args, context, info) => {
        const options = args.options;
        const name = get(options, 'search.name');
        const description = get(options, 'search.description');
        const offset = get(options, 'pagination.offset');
        const limit = get(options, 'pagination.limit');
        const optionSearch = {
          where: {
            name: {$like: `%${name || ''}%`},
            description: {$like: `%${description || ''}%`},
          },
        };
        const foods = await FoodModel.findAll({
          ...optionSearch,
          offset: offset,
          limit: limit,
        });
        const totalRecord = await FoodModel.count(optionSearch);
        return {
          foods,
          meta: {
            totalRecord,
          },
        };
      },
    },
    Food: {
      id: (obj, args, context, info) => encodeGlobalID(typename, obj.id),
      foodAttachments: (food, args, context, info) => {
        return food.getFoodAttachments();
      },
    },
  };
};
