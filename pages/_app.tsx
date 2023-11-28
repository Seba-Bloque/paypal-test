import React, { useEffect } from 'react';
import App from 'next/app';
import { SessionProvider as AuthProvider } from 'next-auth/react';

class MyApp extends App {

  render() {
    const { Component, pageProps, session } = this.props;

    return (
      <AuthProvider session={session}>
          <Component {...pageProps} />
      </AuthProvider>
    );
  }
}

export default MyApp;
