import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { CachePersistor } from 'apollo3-cache-persist'
import { createNetworkStatusNotifier } from 'react-apollo-network-status'

import { hasWindow } from '@utils/functions'

import { errorLink, httpLink, linkTokenToHeaders, withSubLink } from './links'

export const { link: networkStatusLink, useApolloNetworkStatus } = createNetworkStatusNotifier()
const cache = new InMemoryCache({})

export const getPersistor = () => {
	if (hasWindow()) {
		return new CachePersistor({
			cache,
			storage: window.localStorage,
			key: 'SOOSOSOSOSOSOSO',
		})
	}
}

export const secondaryClient = new ApolloClient({
	link: httpLink,
	cache,
})

export const client = new ApolloClient({
	link: ApolloLink.from([errorLink, linkTokenToHeaders, networkStatusLink, withSubLink]),
	cache,
})
