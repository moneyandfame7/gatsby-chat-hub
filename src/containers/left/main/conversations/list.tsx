import React from 'react'

import { Conversation } from '@utils/graphql/conversations'

import { ConversationItem } from './item'

interface ConversationsListProps {
	conversations: Conversation[]
}
export const ConversationsList: React.FC<ConversationsListProps> = ({ conversations }) => {
	return (
		<>
			{conversations.map((c) => (
				<ConversationItem key={c.id} conversation={c} />
			))}
		</>
	)
}
