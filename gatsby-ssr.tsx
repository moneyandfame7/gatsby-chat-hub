/* lib  */
import * as React from 'react'
import { GatsbyBrowser } from 'gatsby'
import { ApolloProvider } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { configurePersistable } from 'mobx-persist-store'
import { Toaster } from 'react-hot-toast'

/* services  */
import { StoreProvider } from './src/store/provider'
import { Environment } from './src/utils/environment'
import { rootStore } from './src/store/root'
import { client } from './src/utils/apollo/clients'
import { hasWindow } from './src/utils/functions'

export const wrapRootElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  configurePersistable({
    storage: hasWindow() ? window.localStorage : undefined
  })

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={rootStore}>{element}</StoreProvider>
    </ApolloProvider>
  )
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  return (
    <>
      <Toaster />
      {element}
    </>
  )
}
