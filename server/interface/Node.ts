import { GraphQLObjectType } from 'graphql';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

const registeredTypes = {};

export function registerType(type: GraphQLObjectType) {
  // @ts-ignore
  registeredTypes[type.name] = type;
  return type;
}

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);
    // @ts-ignore
    const loader = context.dataloaders[`${type}Loader`];
    return (loader && loader.load(id)) || null;
  },
  // @ts-ignore
  (object) => registeredTypes[object.constructor.name] || null,
);
