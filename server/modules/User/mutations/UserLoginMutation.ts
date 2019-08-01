import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import UserModel from '../UserModel';

import { generateToken } from '../../../helper';

export default mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, password }) => {
    if (!email || !password) {
      return {
        token: null,
        error: 'Email ou senha inválidos',
      };
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return {
        token: null,
        error: 'Email ou senha inválidos',
      };
    }

    if (!user.password) {
      return {
        token: null,
        error: 'Email ou senha inválidos',
      };
    }

    let correctPassword = null;
    try {
      correctPassword = await user.authenticate(password);
    } catch (err) {
      return {
        token: null,
        error: 'Email ou senha inválidos',
      };
    }

    if (!correctPassword) {
      return {
        token: null,
        error: 'Email ou senha inválidos',
      };
    }

    const token = generateToken(user);

    return {
      token,
      error: null,
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
