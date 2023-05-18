import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { CachePersistor } from 'apollo3-cache-persist'

import { hasWindow } from '@utils/functions'

import { errorLink, httpLink, linkTokenToHeaders, withSubLink } from './links'

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
	link: ApolloLink.from([errorLink, linkTokenToHeaders, withSubLink]),
	cache,
})
