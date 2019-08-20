import App, { Container } from 'next/app';
import React from 'react';
import { ReactRelayContext } from 'react-relay';

import initEnvironment from '../lib/createRelayEnvironment';

class MyApp extends App {
  public render() {
    const environment = initEnvironment();
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ReactRelayContext.Provider value={{ environment, variables: {} }}>
          <Component {...pageProps} />
        </ReactRelayContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
