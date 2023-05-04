import * as React from 'react'
import { GatsbyBrowser } from 'gatsby'
import { ApolloProvider } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { configurePersistable } from 'mobx-persist-store'

import { StoreProvider } from './src/store/provider'
import { Environment } from './src/utils/environment'
import { rootStore } from './src/store/root'
import { client } from './src/utils/apollo/clients'

export const wrapRootElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  configurePersistable({
    storage: typeof window !== undefined ? localStorage : undefined,
    debugMode: true
  })

  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={Environment.googleId}>
        <StoreProvider store={rootStore}>{element}</StoreProvider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  )
}
