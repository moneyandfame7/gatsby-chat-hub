import * as React from 'react'

import { GatsbyBrowser } from 'gatsby'

import { ApolloProvider } from '@apollo/client'

import { client } from './src/services/apollo/clients'
import { StoreProvider } from './src/services/store/provider'
import { rootStore } from './src/services/store/root'

export const wrapRootElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
	return (
		<ApolloProvider client={client}>
			<StoreProvider store={rootStore}>{element}</StoreProvider>
		</ApolloProvider>
	)
}

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = (args) => {
	// eslint-disable-next-line no-console
	console.log('Route updated')
}
