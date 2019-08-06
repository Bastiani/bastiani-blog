import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import User from '../UserModel';

import * as UserLoader from '../UserLoader';
import UserType from '../UserType';

const mutation = mutationWithClientMutationId({
  name: 'UserAdd',
  inputFields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    active: {
      type: GraphQLBoolean,
    },
  },
  mutateAndGetPayload: async (args) => {
    if (process.env.NODE_ENV === 'production') { throw new Error('Not user add allowed!'); }
    const { name, password, email, active } = args;

    const newUser = await new User({
      name,
      password,
      email,
      active,
    }).save();

    return {
      id: newUser._id,
      error: null,
    };
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: async ({ id }, _, context) => {
        const newUser = await UserLoader.load(context, id);

        if (!newUser) {
          return null;
        }

        return newUser;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
