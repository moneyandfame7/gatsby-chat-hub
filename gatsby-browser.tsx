import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import { GatsbyBrowser } from 'gatsby'
import { client } from './src/utils/apollo'

export const wrapRootElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
