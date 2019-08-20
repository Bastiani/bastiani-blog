import DataLoader from 'dataloader';

import {
  connectionFromMongoCursor,
  mongooseLoader
} from '@entria/graphql-mongoose-loader';
import { ConnectionArguments } from 'graphql-relay';
import { Types } from 'mongoose';

import { IGraphQLContext } from '../../graphql/types/GraphQLContext';
import UserModel from './UserModel';
import { IUser } from './UserType';

interface IArgs {
  search?: string;
}

export default class User {
  public id: string;
  // tslint:disable-next-line:variable-name
  public _id: Types.ObjectId;
  public name: string;
  public email: string | null | undefined;
  public active: boolean | null | undefined;
  public isAdmin: boolean | null | undefined;
  constructor(data: IUser) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.active = data.active;
    this.isAdmin = data.isAdmin;
  }
}

export const getLoader = () =>
  new DataLoader((ids: string[]) => mongooseLoader(UserModel, ids));
// @ts-ignore
const viewerCanSee = (context, data) => true;

export const load = async (
  context: IGraphQLContext,
  id: string | object | Types.ObjectId
): Promise<User | null> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    // @ts-ignore
    data = await context.dataloaders.UserLoader.load(id);
  } catch (err) {
    return null;
  }
  // @ts-ignore
  return viewerCanSee(context, data) ? new User(data) : null;
};

export const clearCache = ({ dataloaders }: IGraphQLContext, id: string) =>
  dataloaders.UserLoader.clear(id.toString());

export const loadUsers = async (
  context: IGraphQLContext,
  args: ConnectionArguments & IArgs
) => {
  const { user } = context;
  if (!user) {
    throw new Error('Unauthorized user');
  }
  const { search } = args;
  const conditions = {
    ...(search != null
      ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } }
      : {})
  };

  const users = UserModel.find(conditions).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load
  });
};
