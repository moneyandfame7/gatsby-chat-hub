import React, { FC, useCallback, useContext } from 'react'

import { navigate } from 'gatsby'

import { ArrowLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import { Avatar, Box, CircularProgress, HStack, IconButton, MenuButton, Text, VStack } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { MdOutlineMoreVert } from 'react-icons/md'

import { useConversationAvatar } from '@services/actions/ui/conversations'
import { useIsMobileScreen } from '@services/hooks'
import { useStores } from '@services/store'

import { StyledMenu, StyledMenuItem } from '@ui/overlay'
import { ListItemAvatar } from '@ui/shared/list-item'

import { Conversation } from '@utils/graphql/conversations'

import { ConversationContext } from '../layout'

interface MessagesHeaderProps {
	conversation: Conversation
}
export const ConversationHeader: FC<MessagesHeaderProps> = ({ conversation }) => {
	const { userStore } = useStores()
	const isMobileScreen = useIsMobileScreen()
	const location = useLocation()
	const { onConversationClose, toggleInfo } = useContext(ConversationContext)
	const onGoBackClick = () => {
		onConversationClose()
		setTimeout(() => {
			navigate(location.pathname)
		}, 100)
	}

	const showMembersStatus = useCallback(() => {
		if (conversation) {
			if (conversation?.participants.length > 2) {
				return `${conversation?.participants.length} members`
			}
			return 'Last seen in'
		}
	}, [conversation])

	const conversationAvatar = useConversationAvatar(conversation)
	return (
		<HStack
			bg='white'
			w='full'
			h='55px'
			color='#fff'
			userSelect='none'
			pos='relative'
			py='8px'
			pr='10px'
			pl='20px'
			boxShadow='0 2px 2px rgb(114 114 114 / 17%)'
		>
			{isMobileScreen && (
				<IconButton
					onClick={onGoBackClick}
					icon={<ArrowLeftIcon />}
					aria-label='Close chat'
					_hover={{ bg: 'whiteAlpha.50' }}
					size='md'
					color='gray.400'
					p={0}
					bg='transparent'
					borderRadius='50%'
				/>
			)}
			{conversation ? (
				<>
					<Box flex={1}>
						<HStack cursor='pointer' onClick={toggleInfo} width='max-content'>
							{/* @todo переробити avatar */}
							<ListItemAvatar {...conversationAvatar} />
							<VStack align='start'>
								<Text fontSize='md' fontWeight={500} color='text.primary'>
									{conversation.name ||
										conversation.participants.filter((p) => p.id !== userStore.user?.id)[0].username}
								</Text>
								{conversation?.participants && (
									<Text fontSize='xs' m='0 !important' color='text.secondary' fontWeight={500}>
										{showMembersStatus()}
									</Text>
								)}
							</VStack>
						</HStack>
					</Box>
					<Box>
						<StyledMenu
							placement='bottom-end'
							menuButton={
								<MenuButton
									as={IconButton}
									aria-label='Menu'
									color='gray.400'
									bg='transparent'
									borderRadius='50%'
									fontSize={15}
									_hover={{
										bg: 'blackAlpha.50',
									}}
									icon={<MdOutlineMoreVert fontSize='15px' color='' />}
								/>
							}
						>
							<StyledMenuItem color='red' icon={<DeleteIcon fontSize={15} color='red' />}>
								Delete chat
							</StyledMenuItem>
						</StyledMenu>
					</Box>
				</>
			) : (
				<CircularProgress
					ml={20}
					transform='translateY(-50%)'
					pos='absolute'
					top='50%'
					isIndeterminate
					color='#8774E1'
					trackColor='transparent'
					size='20px'
				/>
			)}
		</HStack>
	)
}
