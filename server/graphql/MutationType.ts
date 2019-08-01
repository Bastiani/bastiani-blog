import { GraphQLObjectType } from 'graphql';

import UserAddMutation from '../modules/User/mutations/UserAddMutation';
import UserLoginMutation from '../modules/User/mutations/UserLoginMutation';

import PostAddMutation from '../modules/Post/mutations/PostAddMutation';
import PostEditMutation from '../modules/Post/mutations/PostEditMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    UserLoginMutation,
    UserAddMutation,
    PostAddMutation,
    PostEditMutation
  }),
});
