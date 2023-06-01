import React, { useCallback, useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { observer } from 'mobx-react-lite'

import { useStores } from '@services/store'

import { ClientOnly } from '@components'
import { Animation } from '@components/animation'

import {
	CONVERSATIONS_QUERY,
	CONVERSATION_CREATED_SUBSCRIPTION,
	Conversation,
	ConversationCreatedSubscriptionData,
	ConversationsData,
} from '@utils/graphql/conversations'

import { ConversationsTabs } from './tabs'

const sortByLatestUpdated = (c: Conversation[]) =>
	[...c].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))

export const Conversations: React.FC = observer(() => {
	const { cacheStore } = useStores()
	const [conversations, setConversations] = useState<Conversation[]>([])

	const {
		data: all,
		loading: allLoading,
		subscribeToMore,
	} = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {
		fetchPolicy: 'cache-first',
	})

	const subscribeToNewConversations = useCallback(() => {
		subscribeToMore({
			document: CONVERSATION_CREATED_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }: { subscriptionData: ConversationCreatedSubscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const newConversation = subscriptionData.data.conversationCreated
				return Object.assign({}, prev, {
					conversations: sortByLatestUpdated([newConversation, ...prev.conversations]),
				})
			},
		})
	}, [])

	useEffect(() => {
		const fromCache = cacheStore.selectCache((cache) => cache.conversations)
		setConversations(fromCache)
		subscribeToNewConversations()
	}, [])

	useEffect(() => {
		if (all?.conversations) {
			const fetched = sortByLatestUpdated(all.conversations)
			setConversations(fetched)
			cacheStore.updateConversations(fetched)
		}
	}, [all?.conversations])

	return (
		<ClientOnly>
			<Animation.Scale
				left={0}
				top={0}
				bottom={0}
				pos='absolute'
				width='100%'
				id='ConversationsContainer'
				custom={{ open: 1, hidden: 0.8 }}
			>
				<ConversationsTabs all={conversations} allLoading={allLoading} />
			</Animation.Scale>
		</ClientOnly>
	)
})
