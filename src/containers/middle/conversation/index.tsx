import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import { navigate, useLocation } from '@reach/router'
import { Variants } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useStores } from '@services/store'
import { selectConversationById } from '@services/store/cache'

import { CONVERSATION_ID_QUERY, ConversationByIdData, ConversationByIdInput } from '@utils/graphql/conversations'
import { Conversation as ConversationType } from '@utils/graphql/conversations'

import { ConversationHeader } from './header'

interface ConversationProps {
	id: string
}

const CHAT_ANIMATIONS: Variants = {
	open: {
		x: 0,
		transition: { duration: 0.3 },
	},
	hidden: {
		x: '100%',
		transition: { duration: 0.3 },
	},
}
export const Conversation: React.FC<ConversationProps> = observer(({ id }) => {
	const { cacheStore } = useStores()
	const [conversation, setConversation] = useState<ConversationType>()

	const location = useLocation()

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

	const handlePressEscape = (e: KeyboardEvent) => {
		if ((e.code === 'Escape' || e.key === 'Escape') && !e.repeat) {
			e.stopPropagation()
			navigate(location.pathname)
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handlePressEscape, false)

		return () => {
			document.removeEventListener('keydown', handlePressEscape, false)
		}
	}, [])

	if (!conversation) {
		return null
	}

	return (
		<VStack h='100vh' flex={1} margin='0px !important' border='1px solid' borderColor='gray.200'>
			<ConversationHeader conversation={conversation} />
		</VStack>
	)
})
