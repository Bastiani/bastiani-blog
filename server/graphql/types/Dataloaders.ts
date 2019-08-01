import Dataloader from 'dataloader';

import { IPost } from '../../modules/Post/PostType';
import { IUser } from '../../modules/User/UserType';

export type DataLoaderKey = string;

export interface IDataloaders {
  UserLoader: Dataloader<DataLoaderKey, IUser>;
  PostLoader: Dataloader<DataLoaderKey, IPost>;
}
