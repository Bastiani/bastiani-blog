import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Types } from 'mongoose';

import { connectionDefinitions } from '../../graphql/connection/customConnection';
import { nodeInterface, registerType } from '../../interface/Node';

export interface IUser {
  id: string;
  _id: Types.ObjectId;
  name: string;
  password: string;
  email: string;
  active?: boolean;
  isAdmin?: boolean;
  authenticate(plainText: string): Promise<string | boolean>;
  encryptPassword(password: string): Promise<string>;
}

const UserType = registerType(
  new GraphQLObjectType({
    name: 'User',
    description: 'User type definition',
    fields: () => ({
      id: globalIdField('User', (user) => user._id),
      _id: {
        type: GraphQLString,
        // tslint:disable-next-line:object-literal-sort-keys
        resolve: (user) => user._id,
      },
      name: {
        type: GraphQLString,
        description: 'Name of the user',
      },
      password: {
        type: GraphQLString,
        description: 'Password of the user',
      },
      email: {
        type: GraphQLString,
        description: 'Email of the user',
      },
      active: {
        type: GraphQLBoolean,
        description: 'Active of the user',
      },
      isAdmin: {
        type: GraphQLBoolean,
        description: 'isAdmin of the user',
      },
    }),
    interfaces: () => [nodeInterface],
  }),
);

export const UserConnection = connectionDefinitions({
  name: 'User',
  // @ts-ignore
  nodeType: GraphQLNonNull(UserType),
});

export default UserType;
