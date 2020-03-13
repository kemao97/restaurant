import {ApolloError, gql, SchemaDirectiveVisitor} from 'apollo-server-express';
import {defaultFieldResolver} from 'graphql';
import {camelCase, get, merge, groupBy, mapValues} from 'lodash';
import {decodeGlobalID} from '../../utils';
import fs from 'fs';
import path from 'path';
import {ValidationError} from 'yup';
import {OPERATIONS} from '../../utils/constants';

const readYupOfFile = (dirPath) => {
  const yupObject = {};
  fs.readdirSync(dirPath)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .map((file) => {
      const objectSchema = require(path.join(dirPath, file));
      return Object.keys(objectSchema)
        .filter((key) => /^yup/.test(key))
        .map((key) => {
          yupObject[key] = objectSchema[key];
        });
    });
  return yupObject;
};

export const directiveQueries = gql`
  directive @validate(
    yupName: String
    inputPath: String = "input"
  ) on FIELD_DEFINITION
  
  directive @retrieve(
    objectName: String
    idPath: String
    exportName: String
    modelName: String
    required: Boolean
    callResolver: Boolean
  ) on FIELD_DEFINITION
  
  directive @create(
    objectName: String
    modelName: String
    inputPath: String = "input"
  ) on FIELD_DEFINITION
  
  directive @update(
    objectName: String
    idPath: String = "id"
    modelName: String
    inputPath: String = "input"
  ) on FIELD_DEFINITION
  
  directive @delete(
    objectName: String
    idPath: String = "id"
    modelName: String
  ) on FIELD_DEFINITION
  
  directive @auth(
    operations: [String]
  ) on FIELD_DEFINITION
`;

export class ValidateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const {resolve = defaultFieldResolver} = field;
    const {yupName, inputPath} = this.args;
    let VALIDATE_MAP = readYupOfFile(path.join(__dirname, '../objects'));
    VALIDATE_MAP = merge(VALIDATE_MAP, readYupOfFile(path.join(__dirname, '../general')));
    if (!yupName) {
      throw new Error('yupName is undefined');
    }
    field['resolve'] = async (obj, args, context, info) => {
      const input = get(args, inputPath);
      if (!input) {
        throw new Error('inputPath for validate not valid');
      }
      const {validateFieldConfig, validateObjectFunc} = await VALIDATE_MAP[yupName](args, context, this.args);
      await validateFieldConfig.validate(input, {abortEarly: false})
        .catch((e) => {
          const groupField =
            groupBy(e.inner.map((field) => ({
              path: field.path,
              message: field.errors[0],
            })), 'path');
          const groupFieldVariant =
            mapValues(groupField, (arrayMessage) => arrayMessage.map((messageObj) =>
              messageObj.message,
            ));
          throw new ValidationError(groupFieldVariant);
        });
      validateObjectFunc && await validateObjectFunc();
      return resolve.call(this, obj, args, context, info);
    };
  }
}

export class RetrieveObject extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const {resolve = defaultFieldResolver} = field;
    const {callResolver = true} = this.args;
    field['resolve'] = async (obj, args, context, info) => {
      const object = await actionRetrieveObject(args, context, this.args);
      if (!callResolver) return object;
      return resolve.call(this, obj, args, context, info);
    };
  }
}

export const actionRetrieveObject = async (args, context, options) => {
  const {
    objectName,
    idPath = 'id',
    exportName = `${camelCase(objectName)}Retrieve`,
    modelName = `${objectName}Model`,
    required = true,
  } = options;
  const model = context.models[modelName];
  const encodeID = get(args, idPath);
  const id = decodeGlobalID(null, encodeID);
  const object = await model.findByPk(id);
  if (required && !object) {
    throw new Error(`Direction retrieve: ${objectName} can't retrieve id`);
  }
  context[exportName] = object;
  return object;
};


export class CreateObject extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    field['resolve'] = (obj, args, context, info) => {
      return actionCreateObject(args, context, this.args);
    };
  }
}

export const actionCreateObject = async (args, context, options) => {
  const {
    objectName,
    modelName = `${objectName}Model`,
    inputPath,
  } = options;
  const model = context.models[modelName];
  const input = get(args, inputPath);
  return model.create(input);
};

export class UpdateObject extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    field['resolve'] = (obj, args, context, info) => {
      return actionUpdateObject(args, context, this.args);
    };
  }
}

export const actionUpdateObject = async (args, context, options) => {
  const {
    inputPath,
  } = options;
  const input = get(args, inputPath);
  const objectRetrieve = await actionRetrieveObject(args, context, options);
  return objectRetrieve.update(input);
};

export class DeleteObject extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    field['resolve'] = (obj, args, context, info) => {
      return actionDeleteObject(args, context, this.args);
    };
  }
}

export const actionDeleteObject = async (args, context, options) => {
  const objectRetrieve = await actionRetrieveObject(args, context, options);
  return Boolean(await objectRetrieve.destroy());
};

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const {resolve = defaultFieldResolver} = field;
    field['resolve'] = async (obj, args, context, info) => {
      const isAccept = await actionAuthDirective(args, context, this.args);
      if (!isAccept) {
        throw new ApolloError(`You don't have permission`, 'AUTHORIZATION');
      }
      return resolve.call(this, obj, args, context, info);
    };
  }
}

export const actionAuthDirective = async (args, context, options) => {
  const {operations} = options;
  console.log(operations);
  const {OperationModel} = context.models;
  const operationIds = operations.map((operation) => {
    const operationId = get(OPERATIONS, operation);
    if (!operationId) {
      throw new Error(`Permission don't exist`);
    }
    return operationId;
  });
  const {viewer} = context;
  const result = await viewer.getRoles({
    include: [{
      model: OperationModel,
      required: true,
      where: {
        id: {
          $or: operationIds,
        },
      },
    }],
  });
  return !!result.length;
};
