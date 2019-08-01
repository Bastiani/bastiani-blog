/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';

import { jwtSecret } from './config';
// @ts-ignore
import * as UserLoader from './modules/User/UserLoader';

/**
 * Return user and seller given a JWT token
 * @param token - jwt token with userId
 * @returns {*}
 */

interface IUserType {
  user: {
    id: string,
    _id: string
    name: string,
    email: string,
    active: boolean,
    isAdmin: boolean,
  },
};

interface IUserTypeToken {
  _id: string,
}

export const getUser = async (dataloaders: any, token: string): Promise<IUserType | { user: null }> => {
  if (!token) {
    return { user: null };
  }

  try {
    const decodedToken = jwt.verify(token.replace('JWT', '').trim(), jwtSecret);
    // @ts-ignore
    const user = await UserLoader.load({ dataloaders }, decodedToken.id);

    if (!user) {
      return { user: null };
    }
    // @ts-ignore
    return { user };
  } catch (err) {
    return { user: null };
  }
};

export const getDataloaders = (loaders: any): any => Object.keys(loaders).reduce(
  (prev, loaderKey: string) => ({
    ...prev,
    [loaderKey]: loaders[loaderKey].getLoader ? loaders[loaderKey].getLoader() : undefined,
  }),
  {},
);

export function generateToken(user: IUserTypeToken): string {
  return `JWT ${jwt.sign({ id: user._id }, jwtSecret)}`;
}
