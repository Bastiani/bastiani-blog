import { IUser } from '../../modules/User/UserType';
import { IDataloaders } from './Dataloaders';

export interface IGraphQLContext {
  user?: IUser;
  dataloaders: IDataloaders;
}
