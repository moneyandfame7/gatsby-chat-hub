import React from 'react'

import { Conversation } from '@utils/graphql/conversations'

import { ConversationItem } from './item'

interface ConversationsListProps {
	conversations: Conversation[]
	containerRef: React.RefObject<HTMLDivElement>
}
export const ConversationsList: React.FC<ConversationsListProps> = ({ conversations, containerRef }) => {
	return (
		<>
			{conversations.map((c) => (
				<ConversationItem containerRef={containerRef} key={c.id} conversation={c} />
			))}
		</>
	)
}
