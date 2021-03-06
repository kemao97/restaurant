import {ApolloError, gql} from 'apollo-server-express';
import {encodeGlobalID} from '../../utils';
import {hashPassword} from '../../utils/auth';
import {object, string} from 'yup';
import {get, head} from 'lodash';

export const typename = 'User';

const userInputs = gql`
  input CreateUserInput {
    email: String!
    password: String!
    address: String
    phone: String
  }
  
  input UpdateUserInput {
    address: String
    phone: String
  }
  
  input UserSearch {
    email: String
  }
  
  input Pagination {
    offset: Int!
    limit: Int!
  }
  
  input UserPageOptions {
    pagination: Pagination
    search: UserSearch
  }
`;

const userPage = gql`
  type PageMeta {
    totalRecord: Int!
  }
  
  type UserPage {
    users: [User!]!
    meta: PageMeta!
  }
  
  extend type Query {
    users(options: UserPageOptions): UserPage!
      @auth(operations: ["user.read"])
  }
`;

const userCRUD = gql`
  type User {
    id: ID!
    email: String!
    address: String!
    phone: String
    createdAt: DateTime
    updatedAt: DateTime
    cartWorking: Cart
  }
  
  extend type Query {
    viewer: User
    user(id: ID!): User
      @retrieve(objectName: "User", callResolver: false)
  }
  
  extend type Mutation {
    createUser(input: CreateUserInput!): User
      @validate(yupName: "yupCreateUser")
    updateProfile(input: UpdateUserInput!): User
      @validate(yupName: "yupUpdateUser")
    deleteUser(id: ID!): Boolean
      @delete(objectName: "User")
      @auth(operations: ["user.delete"])
  }
`;

export const userQueries = [
  userInputs,
  userPage,
  userCRUD,
];

export const yupCreateUser = async (args, context, options) => {
  const validateFieldConfig = object({
    email: string()
      .required()
      .max(50)
      .email(),
    password: string()
      .required()
      .min(8)
      .max(50),
  });
  return {
    validateFieldConfig,
  };
};

export const yupUpdateUser = async (args, context, options) => {
  const validateFieldConfig = object({
    phone: string()
      .max(20)
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, {
        message: 'You must enter valid phone',
        excludeEmptyString: true,
      }),
    address: string()
      .max(200),
  });
  return {
    validateFieldConfig,
  };
};

export const generateUserResolvers = (models) => {
  const {UserModel, RoleModel} = models;
  return {
    Query: {
      viewer: (obj, args, context, info) => {
        return context.viewer;
      },
      users: async (obj, args, context, info) => {
        const options = args.options;
        const email = get(options, 'search.email');
        const offset = get(options, 'pagination.offset');
        const limit = get(options, 'pagination.limit');
        const optionSearch = {
          where: {
            email: {
              $like: `%${email || ''}%`,
            },
          },
        };
        const users = await UserModel.findAll({
          ...optionSearch,
          offset: offset,
          limit: limit,
        });
        const totalRecord = await UserModel.count(optionSearch);
        return {
          users,
          meta: {
            totalRecord,
          },
        };
      },
    },
    Mutation: {
      createUser: async (obj, args, context, info) => {
        const input = args.input;
        const {viewer} = context;
        input['password'] = await hashPassword(input['password']);
        const {email} = input;
        const user = await UserModel.findOne({
          where: {
            email,
          },
        });
        if (user) {
          throw new ApolloError('Email was taken', 'RES_MESSAGE');
        }
        const userCreated = await UserModel.create(input);
        const adminRole = await RoleModel.findOne({
          where: {
            name: viewer ? 'admin' : 'customer',
          },
        });
        await userCreated.addRole(adminRole);
        return userCreated;
      },
      updateProfile: async (obj, args, context, info) => {
        const input = args.input;
        const viewer = context.viewer;
        const {UserModel} = context.models;
        const user = await UserModel.findByPk(viewer.id);
        if (!user) {
          throw new ApolloError('please login before perform this action', 'RES_MESSAGE');
        }
        return user.update(input);
      },
    },
    User: {
      id: (obj, args, context, info) => encodeGlobalID(typename, obj.id),
      cartWorking: async (user, args, context, info) => {
        const cart = head(await user.getCarts({
          where: {
            soldAt: null,
          },
        }));
        if (cart) return cart;
        return context.viewer.createCart();
      },
    },
  };
};
