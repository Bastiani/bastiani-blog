import App, { Container } from 'next/app';
import Link from 'next/link';
import React from 'react';
import { ReactRelayContext } from 'react-relay';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import {
  Aside,
  Layout,
  Main,
  ProfileAuthor
} from '../components/pages/template/layout';
import { themeLight } from '../components/pages/template/theme';
import initEnvironment from '../lib/createRelayEnvironment';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    background-color: #FFFFFF;
    font-family: 'Nunito', sans-serif;
  }
`;

class MyApp extends App {
  public render() {
    const environment = initEnvironment();
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ReactRelayContext.Provider value={{ environment, variables: {} }}>
          <GlobalStyle />
          <ThemeProvider theme={themeLight}>
            <>
              <Layout>
                <Aside>
                  <ProfileAuthor>
                    <Link href='/'>
                      <a>
                        <h1>Rafael de Bastiani</h1>
                      </a>
                    </Link>
                    <small>Desenvolvedor Fullstack</small>
                  </ProfileAuthor>
                </Aside>
                <Main>
                  <Component {...pageProps} />
                </Main>
              </Layout>
            </>
          </ThemeProvider>
        </ReactRelayContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
