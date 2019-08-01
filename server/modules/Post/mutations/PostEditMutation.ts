import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import { IGraphQLContext } from '../../../graphql/types/GraphQLContext';
import * as PostLoader from '../PostLoader';
import PostModel from '../PostModel';
import PostType from '../PostType';

const mutation = mutationWithClientMutationId({
  name: 'PostEdit',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
    },
    active: {
      type: GraphQLBoolean,
    },
  },
  mutateAndGetPayload: async (args, context: IGraphQLContext) => {
    const { id, title, text, active } = args;

    const post = await PostModel.findOne({
      _id: fromGlobalId(id).id,
    });

    // If not, throw an error
    if (!post) {
      return {
        error: 'Post inválido',
      };
    }

    // Edit record
    await post.update({ id, title, text, active });

    // Clear dataloader cache
    PostLoader.clearCache(context, post._id);

    return {
      id: post._id,
      error: null,
    };
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }, _, context) => {
        const newPost = await PostLoader.load(context, id);

        if (!newPost) {
          return null;
        }

        return newPost;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
