import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Types } from 'mongoose';

import { connectionDefinitions } from '../../graphql/connection/customConnection';
import { nodeInterface, registerType } from '../../interface/Node';

export interface IPost {
  id: string;
  _id: Types.ObjectId;
  image: string;
  slug: string;
  title: string;
  description: string;
  text: string;
  user?: Types.ObjectId;
  active?: boolean;
}

const PostType = registerType(
  new GraphQLObjectType({
    name: 'Post',
    description: 'Post type definition',
    fields: () => ({
      id: globalIdField('Post', post => post._id),
      // tslint:disable-next-line: object-literal-sort-keys
      _id: {
        type: GraphQLString,
        // tslint:disable-next-line:object-literal-sort-keys
        resolve: post => post._id
      },
      image: {
        type: GraphQLString,
        description: 'Image url'
      },
      slug: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Slug of the post'
      },
      title: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Title of the post'
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Description of the post'
      },
      text: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Text of the post'
      },
      user: {
        type: GraphQLString,
        description: 'User of the post'
      },
      createdAt: {
        type: GraphQLString,
        resolve: obj => obj.createdAt.toISOString()
      },
      active: {
        type: GraphQLBoolean,
        description: 'Active of the post'
      }
    }),
    interfaces: () => [nodeInterface]
  })
);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType
});

export default PostType;
