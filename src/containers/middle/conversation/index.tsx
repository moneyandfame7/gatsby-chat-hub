import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import { navigate } from '@reach/router'
import { observer } from 'mobx-react-lite'

import { usePressEsc } from '@services/hooks'
import { useStores } from '@services/store'
import { selectConversationById } from '@services/store/cache'

import { ROUTES } from '@utils/constants'
import { CONVERSATION_ID_QUERY, ConversationByIdData, ConversationByIdInput } from '@utils/graphql/conversations'
import { Conversation as ConversationType } from '@utils/graphql/conversations'

import gradient from '@assets/gradient.png'

import { ConversationHeader } from './header'

interface ConversationProps {
	id: string
}

export const Conversation: React.FC<ConversationProps> = observer(({ id }) => {
	const { cacheStore, rightColumnUiStore } = useStores()
	const [conversation, setConversation] = useState<ConversationType | undefined>(
		cacheStore.selectCache(selectConversationById(id))
	)

	const { data } = useQuery<ConversationByIdData, ConversationByIdInput>(CONVERSATION_ID_QUERY, {
		variables: { id },
		fetchPolicy: 'cache-and-network',
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

	const closeConversation = () => {
		if (!rightColumnUiStore.isInDom) {
			navigate(ROUTES.chat(), { replace: true })
		}
	}

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

	return (
		<VStack
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
			<ConversationHeader conversation={conversation} />
		</VStack>
	)
})
