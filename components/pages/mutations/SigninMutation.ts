import { commitMutation, graphql } from 'react-relay';

import Environment from '../../../lib/createRelayEnvironment';

const mutation = graphql`
  mutation SigninMutation($input: UserLoginInput!) {
    UserLoginMutation(input: $input) {
      error
      token
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
