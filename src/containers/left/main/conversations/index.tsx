import React, { memo, useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'

import { client, getPersistor } from '@services/apollo/clients'
import { useStores } from '@services/store'

import { Animation } from '@ui/animation'

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
	const {
		data: all,
		loading: allLoading,
		subscribeToMore,
	} = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {
		fetchPolicy: 'cache-and-network',
	})

	const [data, setData] = useState<Conversation[]>([])

	useEffect(() => {
		const cachedData = cacheStore.globalCache.conversations?.data

		if (cachedData) {
			setData(cachedData)
		}
		// eslint-disable-next-line @typescript-eslint/no-extra-semi
	}, [])

	useEffect(() => {
		if (data && all?.conversations && JSON.stringify(all.conversations) !== JSON.stringify(data)) {
			console.log('cache not equal')
			cacheStore.update({ conversations: { data: all.conversations } })
			setData(all.conversations)
		}
	}, [data, all?.conversations])
	const { data: unread, loading: unreadLoading } = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {})

	// const subscribeToNewConversations = () => {
	// 	subscribeToMore({
	// 		document: CONVERSATION_CREATED_SUBSCRIPTION,
	// 		updateQuery: (prev, { subscriptionData }: { subscriptionData: ConversationCreatedSubscriptionData }) => {
	// 			if (!subscriptionData.data) {
	// 				return prev
	// 			}
	// 			const newConversation = subscriptionData.data.conversationCreated

	// 			return Object.assign({}, prev, {
	// 				conversations: [newConversation, ...prev.conversations],
	// 			})
	// 		},
	// 	})
	// }

	// /**
	//  * викликати subscriptions on mount
	//  */
	// useEffect(() => {
	// 	subscribeToNewConversations()
	// }, [])

	return (
		<Animation.Scale left={0} top={0} bottom={0} pos='absolute' width='100%'>
			{data.length > 0 && (
				<ConversationsTabs all={data} allLoading={false} unread={data} unreadLoading={unreadLoading} />
			)}
		</Animation.Scale>
	)
})
