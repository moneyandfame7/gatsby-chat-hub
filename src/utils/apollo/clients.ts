import { InMemoryCache, ApolloClient, ApolloLink } from '@apollo/client'
import { httpLink, errorLink, linkTokenToHeaders } from './links'

const cache = new InMemoryCache()
export const secondaryClient = new ApolloClient({
  link: httpLink(),
  cache
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink(), linkTokenToHeaders(), httpLink()]),
  cache
})
