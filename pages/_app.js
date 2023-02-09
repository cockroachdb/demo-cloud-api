import React, { Fragment } from 'react'

import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppProvider } from '../context/app-context'
import Layout from '../components/layout'

import '../styles/globals.css'

const queryClient = new QueryClient()

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const cdnUrl = process.env.NEXT_PUBLIC_API_URL
  const seoTitle = 'Demo Cloud API'
  const seoDescription = 'A CockroachDB Cloud API Demo Application'
  const seoImage = 'open-graph-image.jpg'

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Fragment>
      <Head>
        <title>{seoTitle}</title>
        <link rel="canonical" href={cdnUrl} />
        <meta name="robots" content="max-snippet:-1" />

        {/* Primary Meta Tags */}
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <meta name="image" content={`${cdnUrl}/${seoImage}`} />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={cdnUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={`${cdnUrl}/${seoImage}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={cdnUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${cdnUrl}/${seoImage}`} />

        {/* favicon */}
        <link rel="icon" type="image/png" sizes="16x16" href={`${cdnUrl}/favicon-16x16.png`} data-react-helmet="true" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${cdnUrl}/favicon-32x32.png`} data-react-helmet="true" />
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
  )
}

export default App
