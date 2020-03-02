import {capitalize, merge} from 'lodash';
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

const readSchemaOfFile = (models, dirPath) => {
  let typeDefs = [];
  let resolvers = {};
  fs.readdirSync(dirPath)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const objectSchema = require(path.join(dirPath, file));
      const fileName = path.basename(file, '.js');
      let query = objectSchema[`${fileName}Queries`];
      const resolverFunc = objectSchema[`generate${capitalize(fileName)}Resolvers`];
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
  };
};

export default createSchema;
