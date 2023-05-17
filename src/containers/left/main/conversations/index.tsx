import React, { useEffect } from 'react'

import { useQuery } from '@apollo/client'

import { Animation } from '@ui/animation'

import {
	CONVERSATIONS_QUERY,
	CONVERSATION_CREATED_SUBSCRIPTION,
	ConversationCreatedSubscriptionData,
	ConversationsData,
} from '@utils/graphql/conversations'

import { ConversationsTabs } from './tabs'

export const Conversations: React.FC = () => {
	const {
		data: all,
		loading: allLoading,
		subscribeToMore,
	} = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {
		fetchPolicy: 'cache-first',
	})
	const { data: unread, loading: unreadLoading } = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {
		fetchPolicy: 'cache-first',
	})

	const subscribeToNewConversations = () => {
		subscribeToMore({
			document: CONVERSATION_CREATED_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }: { subscriptionData: ConversationCreatedSubscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const newConversation = subscriptionData.data.conversationCreated

				return Object.assign({}, prev, {
					conversations: [newConversation, ...prev.conversations],
				})
			},
		})
	}

	/**
	 * викликати subscriptions on mount
	 */
	useEffect(() => {
		subscribeToNewConversations()
	}, [])

	return (
		<Animation.Scale left={0} top={0} bottom={0} pos='absolute' width='100%'>
			<ConversationsTabs
				all={all?.conversations}
				allLoading={allLoading}
				unread={unread?.conversations}
				unreadLoading={unreadLoading}
			/>
		</Animation.Scale>
	)
}
