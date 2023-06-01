import React, { createRef, useEffect, useRef, useState } from 'react'

import { useQuery } from '@apollo/client'
import { Box, Flex, VStack } from '@chakra-ui/react'
import { navigate } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { v4 } from 'uuid'

import { usePressEsc } from '@services/hooks'
import { useStores } from '@services/store'
import { CachedMessage, selectConversationById, selectMessagesByConversationId } from '@services/store/cache'

import { ClientOnly } from '@components/client-only'

import { ROUTES } from '@utils/constants'
import { CONVERSATION_ID_QUERY, ConversationByIdData, ConversationByIdInput } from '@utils/graphql/conversations'
import { Conversation as ConversationType } from '@utils/graphql/conversations'
import { Message } from '@utils/graphql/message'

import gradient from '@assets/gradient.png'

import { MessagesList } from '../message/list'
import { ConversationHeader } from './header'
import { ConversationInput } from './input'

interface ConversationProps {
	id: string
}

export const Conversation: React.FC<ConversationProps> = observer(({ id }) => {
	const { cacheStore, rightColumnUiStore, userStore } = useStores()
	const [conversation, setConversation] = useState<ConversationType | undefined>(
		cacheStore.selectCache(selectConversationById(id))
	)

	const { data, loading } = useQuery<ConversationByIdData, ConversationByIdInput>(CONVERSATION_ID_QUERY, {
		variables: { id },
		fetchPolicy: 'cache-first',
	})
	useEffect(() => {
		if (data) {
			setConversation(data.conversation)
			cacheStore.updateConversationById(data.conversation)
		}
	}, [data])

	useEffect(() => {
		if (id) {
			const cached = cacheStore.selectCache(selectConversationById(id))

			setConversation(cached)
		}
	}, [id])

	useEffect(() => {
		console.log('state')
	}, [conversation])

	const closeConversation = () => {
		if (!rightColumnUiStore.isInDom) {
			navigate(ROUTES.chat(), { replace: true })
		}
	}

	const currentUser = userStore.user

	const openConversation = ({ id }: { id: string }) => {
		const conversation = cacheStore.selectCache(selectConversationById(id))
		if (conversation) {
			navigate(ROUTES.chat(id))
		}
	}

	usePressEsc(closeConversation)

	if (!conversation) {
		return null
	}

	const [messages, setMessages] = useState<CachedMessage[]>(cacheStore.selectCache(selectMessagesByConversationId(id)))
	const handleInputSend = (text: string) => {
		if (!currentUser) {
			return
		}
		const newMessage: CachedMessage = {
			content: {
				id: v4(),
				text,
				createdAt: new Date(),
				updatedAt: new Date(),
				sender: currentUser,
			},
			conversationId: id,
		}
		setMessages((prev) => [...prev, newMessage])
		cacheStore.addMessageById({ id: newMessage.content.id, message: newMessage })
	}

	return (
		<Flex
			flexDir='column'
			h='100vh'
			flex={1}
			margin='0px !important'
			border='1px solid'
			borderColor='gray.200'
			data-component-name='MiddleColumn'
			bgImage={gradient}
			bgSize='cover'
			bgRepeat='no-repeat'
		>
			<ConversationHeader conversation={conversation} loading={loading} />
			<MessagesList messages={messages} />
			<ConversationInput onSend={handleInputSend} />
		</Flex>
	)
})
