import React, { useContext, useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { Box, Slide, VStack } from '@chakra-ui/react'
import { navigate, useLocation } from '@reach/router'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useIsMobileScreen } from '@services/hooks'
import { useStores } from '@services/store'
import { selectConversationById } from '@services/store/cache'

import { Animation } from '@ui/animation'
import { Backdrop } from '@ui/overlay'

import { CONVERSATION_ID_QUERY, ConversationByIdData, ConversationByIdInput } from '@utils/graphql/conversations'
import { Conversation as ConversationType } from '@utils/graphql/conversations'

import { ConversationContext } from '../layout'
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
	// usePressEsc(onPressEsc)
	const { cacheStore } = useStores()
	const [conversation, setConversation] = useState<ConversationType>()
	const { isConversationOpen, onConversationClose, onConversationOpen } = useContext(ConversationContext)

	const location = useLocation()
	const isMobileScreen = useIsMobileScreen()

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
			onConversationOpen()
			const cached = cacheStore.selectCache(selectConversationById(id))

			setConversation(cached)
		}
	}, [id])

	const handlePressEscape = (e: KeyboardEvent) => {
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

	const renderContent = () => {
		switch (true) {
			case isConversationOpen && isMobileScreen:
				return (
					<div key='id12312'>
						<motion.div
							key='second'
							style={{
								position: 'fixed',
								left: 0,
								top: 0,
								height: '100vh',
								width: '100vw',
								background: 'black',
								opacity: 0.3,
							}}
							initial={{
								opacity: 0.1,
							}}
							animate={{
								opacity: 0.3,
							}}
							exit={{
								opacity: 0,
								transition: { delay: 0.2 },
							}}
						/>

						<motion.div
							key='firstssds'
							style={{
								position: 'fixed',
								left: 0,
								top: 0,
								height: '100vh',
								background: 'white',
								margin: 0,
								width: '100%',
							}}
							initial={{ x: '100%' }}
							animate={{
								x: 0,
								transition: { duration: 0.25 },
							}}
							exit={{
								x: '100%',
								transition: { duration: 0.25 },
							}}
						>
							<ConversationHeader conversation={conversation} />
						</motion.div>
					</div>
				)
			case isConversationOpen && !isMobileScreen:
				/* 
				@todo fix animation
				*/
				return (
					<Box h='100vh' w='full'>
						<ConversationHeader conversation={conversation} />
					</Box>
				)
			default:
				return <>pavapepe</>
		}
	}
	return (
		<VStack h='100vh' flex={1} margin='0px !important' border='1px solid' borderColor='gray.200'>
			<AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
		</VStack>
	)
})
