import {upperFirst, merge, camelCase} from 'lodash';
import {getPayloadFromToken} from '../utils/auth';
import path from 'path';
import fs from 'fs';
import {
  CreateObject,
  DeleteObject,
  RetrieveObject,
  UpdateObject,
  ValidateDirective,
} from './general/directive';
import {ApolloError} from 'apollo-server-express';
import {ValidationError} from 'yup';

const readSchemaOfFile = (models, dirPath) => {
  let typeDefs = [];
  let resolvers = {};
  fs.readdirSync(dirPath)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const objectSchema = require(path.join(dirPath, file));
      const fileName = camelCase(path.basename(file, '.js'));
      let query = objectSchema[`${fileName}Queries`];
      const resolverFunc = objectSchema[`generate${upperFirst(fileName)}Resolvers`];
      if (!(query instanceof Array) && (query instanceof Object)) {
        query = [query];
      }
      query && (typeDefs = [
        ...typeDefs,
        ...query,
      ]);
      resolverFunc && (resolvers = merge(
        resolvers,
        resolverFunc(models),
      ));
    });
  return {
    typeDefs,
    resolvers,
  };
};

const createSchema = (models) => {
  let typeDefs = [];
  let resolvers = {};

  const objectSchema = readSchemaOfFile(models, path.join(__dirname, 'objects'));
  const generalSchema = readSchemaOfFile(models, path.join(__dirname, 'general'));
  typeDefs = [
    ...typeDefs,
    ...objectSchema.typeDefs,
    ...generalSchema.typeDefs,
  ];
  resolvers = merge(
    resolvers,
    objectSchema.resolvers,
    generalSchema.resolvers,
  );

  const context = async ({req, res}) => {
    let viewer = null;

    const {headers, cookies} = req;
    const authorization = headers.Authorization || headers.authorization;
    const token = cookies.Authorization || authorization && authorization.slice('Bearer '.length);
    if (token) {
      const payload = getPayloadFromToken(token);
      const {UserModel} = models;
      viewer = await UserModel.findByPk(payload.userId);
    }

    return {viewer, models, res};
  };

  const formatError = (error) => {
    console.log('**************************************************');
    console.log('*                  Graphql Error                 *');
    console.log('**************************************************');
    console.log(error);
    if (error.originalError instanceof ValidationError) {
      return {
        type: 'VALIDATE_ERROR',
        fields: error.message,
      };
    }

    if (error.originalError instanceof ApolloError &&
      error.extensions.code === 'RES_MESSAGE') {
      return {
        type: 'RES_MESSAGE',
        message: error.message,
      };
    }

    return {
      type: 'INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
    };
  };

  return {
    typeDefs,
    resolvers,
    context,
    schemaDirectives: {
      validate: ValidateDirective,
      retrieve: RetrieveObject,
      create: CreateObject,
      update: UpdateObject,
      delete: DeleteObject,
    },
    formatError,
  };
};

export default createSchema;
