import { commitMutation, graphql } from 'react-relay';

import Environment from '../../../lib/createRelayEnvironment';

const mutation = graphql`
  mutation PostAddMutation($input: PostAddInput!) {
    PostAddMutation(input: $input) {
      error
      postEdge {
        node {
          id
          _id
          title
          text
        }
      }
    }
  }
`;

const environment = Environment();

function commit(
  input: object,
  onCompleted: (res: any) => void,
  onError: () => void
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input
    },
    onCompleted,
    onError
  });
}

export default { commit };
