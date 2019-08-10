import fetch from 'isomorphic-unfetch';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
// @ts-ignore
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

async function fetchQuery(
  operation: { text: string; },
  variables: any,
): Promise<{}> {
  const relayServer = process.env.GRAPHQL_URL ? 'http://localhost:3000/graphql' : process.env.GRAPHQL_URL;
  // @ts-ignore
  const response = await fetch(relayServer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const modernEnvironment: Environment = new Environment({
  network: Network.create(RelayNetworkLogger.wrapFetch(fetchQuery, () => '')),
  store: new Store(new RecordSource()),
});

export default modernEnvironment;
