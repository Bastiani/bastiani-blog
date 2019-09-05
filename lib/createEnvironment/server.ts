import RelaySSR from 'react-relay-network-modern-ssr/node8/server';
import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-modern/node8';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

export default {
  initEnvironment: () => {
    const source = new RecordSource();
    const store = new Store(source);
    const relaySSR = new RelaySSR();

    return {
      relaySSR,
      environment: new Environment({
        store,
        network: new RelayNetworkLayer([
          urlMiddleware({
            url: () =>
              process.env.RELAY_ENDPOINT_SERVER ||
              'http://localhost:3000/graphql'
          }),
          relaySSR.getMiddleware()
        ])
      })
    };
  },
  createEnvironment: (relayData: any, key: any) => {
    const source = new RecordSource();
    const store = new Store(source);

    return new Environment({
      store,
      network: Network.create(
        () => relayData.find(([dataKey]: any) => dataKey === key)[1]
      )
    });
  }
};
