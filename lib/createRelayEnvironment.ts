import fetch from 'isomorphic-unfetch';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
// @ts-ignore
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

let relayEnvironment: Environment | null = null;

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
async function fetchQuery(
  // @ts-ignore
  operation,
  // @ts-ignore
  variables,
  // @ts-ignore
  cacheConfig,
  // @ts-ignore
  uploadables
) {
  const { token, ...newVariables } = variables.input || { token: '' };

  // Because we implement the graphql server, the client must to point to the same host
  // @ts-ignore
  const relayServer = process.browser
    ? 'http://localhost:3000/graphql'
    : process.env.GRAPHQL_URL;
  // @ts-ignore
  return fetch(relayServer, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: token || '',
      'Content-Type': 'application/json'
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables: { input: newVariables }
    })
  }).then((response: any) => response.json());
}

export default function initEnvironment({ records = {} } = {}) {
  // Create a network layer from the fetch function
  const network = Network.create(
    RelayNetworkLogger.wrapFetch(fetchQuery, () => '')
  );
  const store = new Store(new RecordSource(records));

  // Make sure to create a new Relay environment for every server-side request so that data
  // isn't shared between connections (which would be bad)
  // @ts-ignore
  if (!process.browser) {
    return new Environment({
      network,
      store
    });
  }

  // reuse Relay environment on client-side
  if (!relayEnvironment) {
    relayEnvironment = new Environment({
      network,
      store
    });
  }

  return relayEnvironment;
}
