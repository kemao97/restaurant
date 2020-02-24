import {gql} from 'apollo-server-express';
import {createToken, comparePassword} from '../../utils/auth';

export const authQueries = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    login(input: LoginInput!): String!
  }
`;

export const generateAuthResolvers = (models) => {
  const {UserModel} = models;
  return {
    Mutation: {
      login: async (obj, args, context, info) => {
        const viewer = context.viewer;
        if (viewer) {
          throw new Error(`You was logged`);
        }
        const {email, password} = args.input;
        const user = await UserModel.findOne({
          where: {
            email,
          },
        });
        if (!user || !(await comparePassword(password, user.password))) {
          throw new Error('Email or password not valid');
        }
        return createToken({userId: user.id});
      },
    },
  };
};
