import React, { useEffect } from 'react'

import { PageProps, navigate } from 'gatsby'

import { HStack } from '@chakra-ui/react'

import { pageHead } from '@components/page-head'

import { LeftColumn } from '@containers/left'
import { MiddleColumn } from '@containers/middle'
import { validateId } from '@containers/middle/helpers'
import { RightColumn } from '@containers/right'

import { ROUTES } from '@utils/constants'

const ConversationPage: React.FC<PageProps> = ({ location }) => {
	const conversationId = location.hash.split('#')[1]

	const isValidId = validateId(conversationId)

	useEffect(() => {
		if (!isValidId) {
			navigate(ROUTES.chat(), { replace: true })
		}
	}, [isValidId, conversationId])

	return (
		<HStack>
			<LeftColumn />
			<MiddleColumn conversationId={isValidId ? conversationId : null} />
			<RightColumn />
		</HStack>
	)
}

export default ConversationPage

export const Head = pageHead({ title: 'ChatHub', postfix: false })
