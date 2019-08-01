import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Types } from 'mongoose';

import { connectionDefinitions } from '../../graphql/connection/customConnection';
import { nodeInterface, registerType } from '../../interface/Node';

export interface IPost {
  id: string;
  _id: Types.ObjectId;
  title: string;
  text: string;
  user: Types.ObjectId;
  active?: boolean;
}

const PostType = registerType(
  new GraphQLObjectType({
    name: 'Post',
    description: 'Post type definition',
    fields: () => ({
      id: globalIdField('Post', (post) => post._id),
      // tslint:disable-next-line: object-literal-sort-keys
      _id: {
        type: GraphQLString,
        // tslint:disable-next-line:object-literal-sort-keys
        resolve: (post) => post._id,
      },
      title: {
        type: GraphQLString,
        description: 'Title of the post',
      },
      text: {
        type: GraphQLString,
        description: 'Text of the post',
      },
      user: {
        type: GraphQLString,
        description: 'User of the post',
      },
      active: {
        type: GraphQLBoolean,
        description: 'Active of the post',
      },
    }),
    interfaces: () => [nodeInterface],
  }),
);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

export default PostType;
