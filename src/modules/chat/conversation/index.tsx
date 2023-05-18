import React, { useContext, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { Box, Slide, VStack } from '@chakra-ui/react'
import { navigate, useLocation } from '@reach/router'

import { useIsMobileScreen } from '@services/hooks'

import { CONVERSATION_ID_QUERY, ConversationByIdData, ConversationByIdInput } from '@utils/graphql/conversations'

import { ConversationContext } from '../layout'
import { ConversationHeader } from './header'

interface ConversationProps {
	id: string
}

export const Conversation: React.FC<ConversationProps> = ({ id }) => {
	// usePressEsc(onPressEsc)
	const { isConversationOpen, onConversationClose, onConversationOpen } = useContext(ConversationContext)

	const location = useLocation()
	const isMobileScreen = useIsMobileScreen()

	const { data } = useQuery<ConversationByIdData, ConversationByIdInput>(CONVERSATION_ID_QUERY, {
		variables: { id },
		fetchPolicy: 'cache-first',
	})
	useEffect(() => {
		if (data) {
			/* set participant id to localstorage for hint on create chat or search */
		}
	}, [data])
	useEffect(() => {
		if (id) {
			onConversationOpen()
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

	return (
		<VStack h='100vh' flex={1} margin='0px !important' border='1px solid' borderColor='gray.200'>
			{isMobileScreen ? (
				<Slide direction='right' in={isConversationOpen} style={{ zIndex: 10 }}>
					<Box bg='blue.300' h='full'>
						<ConversationHeader conversation={data?.conversation} />
					</Box>
				</Slide>
			) : (
				<Box h='full' w={{ base: undefined, md: 'full' }}>
					<ConversationHeader conversation={data?.conversation} />
				</Box>
			)}
		</VStack>
	)
}
