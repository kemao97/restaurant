import {gql} from 'apollo-server-express';
import {createToken, comparePassword} from '../../utils/auth';

export const authQueries = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    login(input: LoginInput!): User!
    logout: Boolean!
  }
`;

export const generateAuthResolvers = (models) => {
  const {UserModel} = models;
  return {
    Mutation: {
      login: async (obj, args, context, info) => {
        const {viewer, res} = context;
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
        const token = await createToken({userId: user.id});
        res.cookie('Authorization', token, {
          httpOnly: true,
          secure: false,
          maxAge: 86400 * 1000 * 7,
        });
        return user;
      },
      logout: (obj, args, context, info) => {
        const {res} = context;
        res.clearCookie('Authorization');
        return true;
      },
    },
  };
};
