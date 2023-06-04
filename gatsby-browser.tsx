import * as React from 'react'

import { GatsbyBrowser } from 'gatsby'

import { ApolloProvider } from '@apollo/client'
import { I18NProvider } from '@ayub-begimkulov/i18n'

import { ClientOnly } from './src/components/client-only'
import { client } from './src/services/apollo/clients'
import { initialize } from './src/services/init'
import { StoreProvider } from './src/services/store/provider'
import { rootStore } from './src/services/store/root'
import './src/styles/index.scss'
import { i18n } from './src/utils/i18n'

let first = true
export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
	if (first) {
		void initialize()
		first = false
	}

	return (
		<I18NProvider i18n={i18n}>
			<ApolloProvider client={client}>
				<StoreProvider store={rootStore}>{element}</StoreProvider>
			</ApolloProvider>
		</I18NProvider>
	)
}

// export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] = (props) => {
// }

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
	return <ClientOnly>{element}</ClientOnly>
}

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = (args) => {
	// eslint-disable-next-line no-console
}
