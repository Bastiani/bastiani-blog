import {
  connectionFromMongoCursor,
  mongooseLoader,
} from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import { ConnectionArguments } from 'graphql-relay';
import { Types } from 'mongoose';

import { IGraphQLContext } from '../../graphql/types/GraphQLContext';
import PostModel from './PostModel';
import { IPost } from './PostType';

interface IArgs {
  search: string;
}

export default class Post {
  public id: string;
  // tslint:disable-next-line:variable-name
  public _id: Types.ObjectId;
  public title: string;
  public text: string;
  public user: Types.ObjectId;
  public active?: boolean;
  constructor(data: IPost) {
    this.id = data.id;
    this._id = data._id;
    this.title = data.title;
    this.text = data.text;
    this.user = data.user;
    this.active = data.active;
  }
}

export const getLoader = () =>
  new DataLoader((ids: string[]) => mongooseLoader(PostModel, ids));
// @ts-ignore
const viewerCanSee = (context, data) => true;

export const load = async (
  context: IGraphQLContext,
  id: string | object | Types.ObjectId,
): Promise<Post | null> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    // @ts-ignore
    data = await context.dataloaders.PostLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Post(data) : null;
};

export const clearCache = ({ dataloaders }: IGraphQLContext, id: string) =>
  dataloaders.PostLoader.clear(id.toString());

export const loadPosts = async (
  context: IGraphQLContext,
  args: ConnectionArguments & IArgs,
) => {
  const { search } = args;
  const conditions = {
    ...(search != null ? { title: { $regex: new RegExp(args.search, 'ig') } } : {}),
  };

  const posts = PostModel.find(conditions).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: posts,
    context,
    args,
    loader: load,
  });
};
