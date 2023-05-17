import React from 'react'

import { GatsbyBrowser } from 'gatsby'

import { ApolloProvider } from '@apollo/client'

import { ClientOnly } from './src/components/client-only'
import { client } from './src/services/apollo/clients'
import { StoreProvider } from './src/services/store/provider'
import { rootStore } from './src/services/store/root'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
	return (
		<ApolloProvider client={client}>
			<StoreProvider store={rootStore}>{element}</StoreProvider>
		</ApolloProvider>
	)
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
	return <ClientOnly>{element}</ClientOnly>
}
