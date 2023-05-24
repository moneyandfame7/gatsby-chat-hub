import React from 'react'

import { GatsbyBrowser } from 'gatsby'

import { ApolloProvider } from '@apollo/client'
import { configure } from 'mobx'

import { ClientOnly } from './src/components/client-only'
import { client } from './src/services/apollo/clients'
import { StoreProvider } from './src/services/store/provider'
import { rootStore } from './src/services/store/root'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
	configure({ enforceActions: 'always' })

	return (
		<ApolloProvider client={client}>
			<StoreProvider store={rootStore}>{element}</StoreProvider>
		</ApolloProvider>
	)
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
	return <ClientOnly>{element}</ClientOnly>
}
