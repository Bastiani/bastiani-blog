import { commitMutation, graphql } from 'react-relay';

import { createEnvironment } from '../../../lib/createEnvironment';

const mutation = graphql`
  mutation SigninMutation($input: UserLoginInput!) {
    UserLoginMutation(input: $input) {
      error
      token
    }
  }
`;

function commit(
  input: object,
  onCompleted: (res: any) => void,
  onError: () => void
) {
  const environment = createEnvironment(
    '',
    JSON.stringify({
      // @ts-ignore
      queryID: undefined
    })
  );

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
