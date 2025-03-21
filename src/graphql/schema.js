import { gql } from 'apollo-server';
import { postTypeDefs } from './post/typedefs.js';
import { postResolvers } from './post/resolvers.js';
import { apiFiltersRersolvers } from './api-filters/resolvers.js';
import { apiFiltersTypeDefs } from './api-filters/typedefs.js';
import { userTypesDefs } from './user/typedefs.js';
import { userResolvers } from './user/resolvers.js';

const rootType = gql`
  type Query {
    _empty: Boolean
  }
`;

const rootResolver = {
  Query: {
    _empty: () => true,
  },
};

export const typeDefs = [
  rootType,
  postTypeDefs,
  userTypesDefs,
  apiFiltersTypeDefs,
];
export const resolvers = [
  rootResolver,
  postResolvers,
  userResolvers,
  apiFiltersRersolvers,
];
