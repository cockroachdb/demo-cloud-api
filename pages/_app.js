import React, { Fragment } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProvider } from '../context/app-context';
import Layout from '../components/layout';

import '../styles/globals.css';

const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Fragment>
      <Head>
        <title>Cockroach Labs</title>
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {getLayout(
            <AppProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AppProvider>
          )}
        </QueryClientProvider>
      </SessionProvider>
    </Fragment>
  );
};

export default App;
