import App, { Container } from 'next/app';
import React from 'react';
import { RelayEnvironmentProvider } from 'relay-hooks';

import modernEnvironment from '../lib/relayEnvironment';

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <RelayEnvironmentProvider environment={modernEnvironment}>
          <Component {...pageProps} />
        </RelayEnvironmentProvider>
      </Container>
    );
  }
}

export default MyApp;
