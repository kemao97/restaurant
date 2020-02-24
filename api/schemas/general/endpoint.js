import {gql} from 'apollo-server-express';

export const endpointQueries = gql`
  type Query {
    meta: String
  }
  
  type Mutation {
    meta: String
  }
`;
