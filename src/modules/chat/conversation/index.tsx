import React, { useContext, useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { Box, Slide, VStack } from '@chakra-ui/react'
import { navigate, useLocation } from '@reach/router'
import { observer } from 'mobx-react-lite'

import { useIsMobileScreen } from '@services/hooks'
import { useStores } from '@services/store'
import { selectConversationById } from '@services/store/cache'

import { CONVERSATION_ID_QUERY, ConversationByIdData, ConversationByIdInput } from '@utils/graphql/conversations'
import { Conversation as ConversationType } from '@utils/graphql/conversations'

import { ConversationContext } from '../layout'
import { ConversationHeader } from './header'

interface ConversationProps {
	id: string
}

export const Conversation: React.FC<ConversationProps> = observer(({ id }) => {
	// usePressEsc(onPressEsc)
	const { cacheStore } = useStores()
	const [conversation, setConversation] = useState<ConversationType>()
	const { isConversationOpen, onConversationClose, onConversationOpen } = useContext(ConversationContext)

	const location = useLocation()
	const isMobileScreen = useIsMobileScreen()

	const { data, loading } = useQuery<ConversationByIdData, ConversationByIdInput>(CONVERSATION_ID_QUERY, {
		variables: { id },
		fetchPolicy: 'cache-and-network',
	})
	useEffect(() => {
		if (data) {
			setConversation(data.conversation)
			cacheStore.updateConversationById(data.conversation)
			/* set participant id to localstorage for hint on create chat or search */
		}
	}, [data])

	useEffect(() => {
		if (id) {
			onConversationOpen()
			const cached = cacheStore.selectCache(selectConversationById(id))

			setConversation(cached)
		}
	}, [id])

	const handlePressEscape = (e: KeyboardEvent) => {
		/* e.repeat for prevent keydown holding */
		if ((e.code === 'Escape' || e.key === 'Escape') && !e.repeat) {
			e.stopPropagation()
			onConversationClose()
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
			{isMobileScreen ? (
				<Slide direction='right' in={isConversationOpen} style={{ zIndex: 10 }}>
					<Box bg='blue.300' h='full'>
						<ConversationHeader conversation={conversation} />
					</Box>
				</Slide>
			) : (
				<Box h='full' w={{ base: undefined, md: 'full' }}>
					<ConversationHeader conversation={conversation} />
				</Box>
			)}
		</VStack>
	)
})
