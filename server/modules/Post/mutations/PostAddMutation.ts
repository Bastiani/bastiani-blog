import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import PostModel from '../PostModel';

import { IGraphQLContext } from '../../../graphql/types/GraphQLContext';
import PostLoader from '../PostLoader';
import { PostConnection } from '../PostType';

const mutation = mutationWithClientMutationId({
  name: 'PostAdd',
  inputFields: {
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLNonNull(GraphQLString)
    },
    text: {
      type: GraphQLNonNull(GraphQLString)
    },
    active: {
      type: GraphQLBoolean
    }
  },
  mutateAndGetPayload: async (args, context: IGraphQLContext) => {
    const { user } = context;
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const { title, description, text, active } = args;

    const newPost = await new PostModel({
      title,
      description,
      text,
      user: user._id,
      active
    }).save();

    return {
      post: newPost,
      error: null
    };
  },
  outputFields: {
    postEdge: {
      type: PostConnection.edgeType,
      resolve: ({ post }) => {
        const node = new PostLoader(post);
        return {
          cursor: toGlobalId('Post', post.id),
          node
        };
      }
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});

export default mutation;
