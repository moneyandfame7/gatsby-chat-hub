import React, { useEffect } from 'react'

import { PageProps, navigate } from 'gatsby'

import { Badge, Center } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { Conversation, ConversationLayout } from '@modules/chat'
import { validateId } from '@modules/chat/conversation/helpers/validateId'

import { Animation } from '@ui/animation'

import { pageHead } from '@components/page-head'

import { LeftColumn } from '@containers/left'

import { ROUTES } from '@utils/constants'

const ConversationPage: React.FC<PageProps> = ({ location }) => {
	const currentConversationId = location.hash.split('#')[1]

	const isValidId = validateId(currentConversationId)
	useEffect(() => {
		if (!isValidId) {
			navigate(ROUTES.chat(), { replace: true })
		}
	}, [isValidId, currentConversationId])
	return (
		<ConversationLayout>
			<>
				<LeftColumn />
				{/* <MiddleColumn />

				
				<RightColumn /> */}
			</>
			<AnimatePresence initial={false}>{isValidId && <Conversation id={currentConversationId} />}</AnimatePresence>

			{!isValidId && (
				<Center height='100vh' display={{ base: 'none', md: 'flex' }} flex={1}>
					<Badge userSelect='none' bg='blackAlpha.400' color='#fff'>
						Select a conversation to start chatting
					</Badge>
				</Center>
			)}
		</ConversationLayout>
	)
}

export default ConversationPage

export const Head = pageHead({ title: 'ChatHub', postfix: false })
