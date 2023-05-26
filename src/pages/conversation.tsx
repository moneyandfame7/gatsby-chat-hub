import React, { useEffect } from 'react'

import { PageProps, navigate } from 'gatsby'

import { HStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { ProtectedRoute } from '@modules/authentication'

import { useStores } from '@services/store'

import { pageHead } from '@components/page-head'

import { LeftColumn } from '@containers/left'
import { MiddleColumn } from '@containers/middle'
import { validateId } from '@containers/middle/helpers'
import { RightColumn } from '@containers/right'

import { ROUTES } from '@utils/constants'

const ConversationPage: React.FC<PageProps> = observer(({ location }) => {
	const { cacheStore } = useStores()
	const conversationId = location.hash.split('#')[1]

	const isValidId = validateId(conversationId)
	const rtl = cacheStore.selectCache((cache) => cache.rtl)
	useEffect(() => {
		if (Boolean(conversationId) && !isValidId) {
			navigate(ROUTES.chat(), { replace: true })
		}
	}, [isValidId, conversationId])

	return (
		<ProtectedRoute>
			<HStack flexDir={rtl ? 'row-reverse' : 'row'} data-component-name='Wrapper'>
				<LeftColumn />
				<MiddleColumn conversationId={isValidId ? conversationId : null} />
				<RightColumn />
			</HStack>
		</ProtectedRoute>
	)
})

export default ConversationPage

export const Head = pageHead({ title: 'ChatHub', postfix: false })
