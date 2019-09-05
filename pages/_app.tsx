import { PageTransition } from 'next-page-transitions';
import App, { Container } from 'next/app';
import Link from 'next/link';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import {
  Aside,
  Header,
  Layout,
  Main,
  ProfileAuthor
} from '../components/pages/template/layout';
import { themeLight } from '../components/pages/template/theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    background-color: #FFFFFF;
    font-family: 'Open Sans', sans-serif;
    color: #74797F;
    .page-transition-enter {
      opacity: 0;
    }
    .page-transition-enter-active {
      opacity: 1;
      transition: opacity 300ms;
    }
    .page-transition-exit {
      opacity: 1;
    }
    .page-transition-exit-active {
      opacity: 0;
      transition: opacity 300ms;
    }
  }
`;

// @ts-ignore
class MyApp extends App {
  public render() {
    // @ts-ignore
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <GlobalStyle />
        <PageTransition timeout={300} classNames='page-transition'>
          <ThemeProvider theme={themeLight}>
            <>
              <Layout>
                <Header>
                  <Link href='/'>
                    <a>
                      <h3>Rafael de Bastiani - Desenvolvedor Fullstack</h3>
                    </a>
                  </Link>
                </Header>
                <Aside>
                  <ProfileAuthor>
                    <Link href='/'>
                      <a>
                        <h1>Rafael de Bastiani</h1>
                      </a>
                    </Link>
                    <small>Desenvolvedor Fullstack</small>
                    <br />
                    <a
                      href='https://www.linkedin.com/in/bastiani/'
                      target='_blank'
                    >
                      Linkedin
                    </a>
                    <br />
                    <a href='https://github.com/Bastiani' target='_blank'>
                      GitHub
                    </a>
                  </ProfileAuthor>
                </Aside>
                <Main>
                  <Component {...pageProps} />
                </Main>
              </Layout>
            </>
          </ThemeProvider>
        </PageTransition>
      </Container>
    );
  }
}

export default MyApp;
