import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import { navigate, useLocation } from '@reach/router'
import { Variants } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { getIsOverlayOpen } from '@services/actions/ui'
import { usePressEsc } from '@services/hooks'
import { LeftColumnContent, useStores } from '@services/store'
import { selectConversationById } from '@services/store/cache'
import { RightColumnContent } from '@services/store/ui/right-column'

import { ROUTES } from '@utils/constants'
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
	const { cacheStore, rightColumnUiStore, leftColumnUiStore } = useStores()
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
			console.log(leftColumnUiStore.contentGroup, leftColumnUiStore.content)
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
		<VStack h='100vh' flex={1} margin='0px !important' border='1px solid' borderColor='gray.200'>
			<ConversationHeader conversation={conversation} />
		</VStack>
	)
})
