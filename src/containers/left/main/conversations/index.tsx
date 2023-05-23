import React, { memo, useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'

import { client, getPersistor } from '@services/apollo/clients'
import { useStores } from '@services/store'

import { Animation } from '@components/animation'

import {
	CONVERSATIONS_QUERY,
	CONVERSATION_CREATED_SUBSCRIPTION,
	Conversation,
	ConversationCreatedSubscriptionData,
	ConversationsData,
} from '@utils/graphql/conversations'

import { ConversationsTabs } from './tabs'

export const Conversations: React.FC = observer(() => {
	const { cacheStore } = useStores()
	const [conversations, setConversations] = useState<Conversation[]>([])

	const {
		data: all,
		loading: allLoading,
		subscribeToMore,
	} = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {
		fetchPolicy: 'cache-and-network',
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

	useEffect(() => {
		const fromCache = cacheStore.selectCache((cache) => cache.conversations)
		console.log({ fromCache })
		setConversations(fromCache)
		subscribeToNewConversations()
	}, [])

	useEffect(() => {
		if (all?.conversations) {
			const fetched = all?.conversations
			console.log({ fetched })
			setConversations(fetched)
			cacheStore.updateConversations(fetched)
		}
	}, [all?.conversations])

	return (
		<Animation.Scale left={0} top={0} bottom={0} pos='absolute' width='100%'>
			<ConversationsTabs all={conversations} allLoading={allLoading} />
		</Animation.Scale>
	)
})
