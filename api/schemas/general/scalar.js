import {gql} from 'apollo-server-express';
import {GraphQLDate, GraphQLDateTime} from 'graphql-iso-date';

export const scalarQueries = gql`
  scalar Date
  scalar DateTime
`;

export const generateScalarResolvers = (models) => {
  return {
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
  };
};
