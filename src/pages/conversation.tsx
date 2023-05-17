import React from 'react'

import { PageProps } from 'gatsby'

import { Badge, Center } from '@chakra-ui/react'

import { Conversation, ConversationLayout } from '@modules/chat'

import { ClientOnly } from '@components/client-only'
import { pageHead } from '@components/page-head'

const ConversationPage: React.FC<PageProps> = ({ location }) => {
	const currentConversationId = location.hash.split('#')[1]

	return (
		<ConversationLayout>
			{currentConversationId ? (
				/**
				 * @TODO validate id, if not uuid then not open chat?
				 */
				<Conversation id={currentConversationId} />
			) : (
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
