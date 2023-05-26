import { createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { Environment } from '@services/environment'
import { rootStore } from '@services/store/root'

import { getAccessTokenPromise } from './helpers'

export const httpLink = createHttpLink({
	uri: Environment.apiUrl,
})

export const wsLink =
	typeof window !== 'undefined'
		? new GraphQLWsLink(
				createClient({
					url: Environment.apiWsUrl,
					connectionParams: async () => ({
						isWebsocket: true,
						headers: {
							authorization: `Bearer ${await getAccessTokenPromise()}`,
						},
					}),
				})
		  )
		: null

export const withSubLink =
	typeof window !== 'undefined' && wsLink != null
		? split(
				({ query }) => {
					const definition = getMainDefinition(query)
					return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
				},
				wsLink,
				httpLink
		  )
		: httpLink

export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		for (const err of graphQLErrors) {
			console.log({ err })
		}
	}
	if (networkError) {
		console.log('[Network Error]: ', networkError)
	}
})

export const linkTokenToHeaders = setContext(async ({ operationName }, { headers }) => {
	let accessToken
	if (operationName !== 'Login') {
		accessToken = await getAccessTokenPromise()
	} else {
		console.log('Its just LOGIN')
	}

	console.log({ accessToken, operationName })
	return {
		headers: {
			...headers,
			authorization: accessToken ? `Bearer ${accessToken}` : '',
		},
	}
})
