import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GatsbyBrowser } from 'gatsby'
import { configurePersistable } from 'mobx-persist-store'

import { Environment } from './src/utils/environment'
import { client } from './src/utils/apollo/clients'
export const wrapRootElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  configurePersistable({
    storage: localStorage
    // debugMode: true
  })
  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={Environment.googleId}>{element}</GoogleOAuthProvider>
    </ApolloProvider>
  )
}
