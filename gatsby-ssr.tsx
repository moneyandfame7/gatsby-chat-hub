import * as React from 'react'
import { GatsbyBrowser } from 'gatsby'
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { configurePersistable } from 'mobx-persist-store'

import { StoreProvider } from './src/store/provider'
import { Environment } from './src/utils/environment'
import { rootStore } from './src/store/root'

export const wrapRootElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),

    link: ApolloLink.from([
      new ApolloLink(() => {
        return null
      })
    ])
  })

  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={Environment.googleId}>
        <StoreProvider store={rootStore}>{element}</StoreProvider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  )
}
