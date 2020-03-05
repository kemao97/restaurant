import {gql} from 'apollo-server-express';
import {createToken, comparePassword} from '../../utils/auth';
import {ApolloError} from 'apollo-server-express';
import {object, string} from 'yup';

export const authQueries = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    login(input: LoginInput!): User!
      @validate(yupName: "yupLogin")
    logout: Boolean!
  }
`;

export const yupLogin = async (args, context, options) => {
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

export const generateAuthResolvers = (models) => {
  const {UserModel} = models;
  return {
    Mutation: {
      login: async (obj, args, context, info) => {
        const {viewer, res} = context;
        if (viewer) {
          throw new ApolloError(`You was logged`, 'RES_MESSAGE');
        }
        const {email, password} = args.input;
        const user = await UserModel.findOne({
          where: {
            email,
          },
        });
        if (!user || !(await comparePassword(password, user.password))) {
          throw new ApolloError('Email or password not valid', 'RES_MESSAGE');
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
