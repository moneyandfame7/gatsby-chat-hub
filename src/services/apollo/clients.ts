import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { createNetworkStatusNotifier } from 'react-apollo-network-status'

import { errorLink, httpLink, linkTokenToHeaders, withSubLink } from './links'

export const { link: networkStatusLink, useApolloNetworkStatus } = createNetworkStatusNotifier()
const cache = new InMemoryCache({})

export const secondaryClient = new ApolloClient({
	link: httpLink,
	cache,
})

export const client = new ApolloClient({
	link: ApolloLink.from([errorLink, linkTokenToHeaders, networkStatusLink, withSubLink]),
	cache,
})
