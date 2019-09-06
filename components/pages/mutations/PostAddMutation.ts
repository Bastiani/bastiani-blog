import { commitMutation, graphql } from 'react-relay';

import { createEnvironment } from '../../../lib/createEnvironment';

const mutation = graphql`
  mutation PostAddMutation($input: PostAddInput!) {
    PostAddMutation(input: $input) {
      error
      postEdge {
        node {
          id
          _id
          title
          description
          text
        }
      }
    }
  }
`;

function commit(
  input: object,
  onCompleted: (res: any) => void,
  onError: () => void
) {
  // @ts-ignore
  const { token, ...newInput } = input;

  const environment = createEnvironment({
    token
  });
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { ...newInput }
    },
    onCompleted,
    onError
  });
}

export default { commit };
