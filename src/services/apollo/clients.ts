/* lib  */
import { InMemoryCache, ApolloClient, ApolloLink } from '@apollo/client'

/* services  */
import { httpLink, errorLink, linkTokenToHeaders, withSubLink } from './links'

const cache = new InMemoryCache({})
export const secondaryClient = new ApolloClient({
  link: httpLink,
  cache
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, linkTokenToHeaders, withSubLink]),
  cache
})
