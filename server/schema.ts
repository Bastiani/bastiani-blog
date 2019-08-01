import { GraphQLSchema } from 'graphql';

import Mutation from './graphql/MutationType';
import Query from './graphql/QueryType';

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default schema;
