import nextCookie from 'next-cookies';
import Router from 'next/router';
import React from 'react';

const AuthLayout = ({ children }: any) => <>{children}</>;

AuthLayout.getInitialProps = (ctx: any) => {
  const { token } = nextCookie(ctx);

  const redirectOnNotLogin = () => {
    // @ts-ignore
    if (process.browser) {
      Router.push('/signin');
      return {};
    } else {
      ctx.res.writeHead(301, { Location: '/signin' });
      ctx.res.end();
      return {};
    }
  };

  if (!token) {
    return redirectOnNotLogin();
  }
  return {};
};

export default AuthLayout;
