import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { nodeField } from '../interface/Node';
import PostType, { PostConnection } from '../modules/Post/PostType';
import UserType, { UserConnection } from '../modules/User/UserType';

import * as PostLoader from '../modules/Post/PostLoader';
import * as UserLoader from '../modules/User/UserLoader';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    me: {
      type: UserType,
      description: 'Me is the logged user',
      resolve: async context =>
        UserLoader.load(context, context.user && context.user.id)
    },
    users: {
      type: GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString
        }
      },
      // @ts-ignore
      resolve: async (obj, args, context) =>
        await UserLoader.loadUsers(context, args)
    },
    postBySlug: {
      type: PostType,
      description: 'Post by slug',
      args: {
        slug: {
          type: GraphQLString
        }
      },
      resolve: async (_, args) => PostLoader.loadBySlug(args)
    },
    posts: {
      type: PostConnection.connectionType,
      args: {
        ...connectionArgs,
        slug: {
          type: GraphQLString
        },
        search: {
          type: GraphQLString
        }
      },
      resolve: async (_, args, context) => PostLoader.loadPosts(context, args)
    }
  })
});
