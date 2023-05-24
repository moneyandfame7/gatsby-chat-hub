import React, { FC, useCallback, useContext, useEffect, useState } from 'react'

import { navigate } from 'gatsby'

import { Avatar, Box, CircularProgress, HStack, MenuButton, MenuDivider, Text, VStack } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { observer } from 'mobx-react-lite'

import { useConversationAvatar } from '@services/actions/ui/conversations'
import { useLayout } from '@services/hooks'
import { useStores } from '@services/store'
import { RightColumnContent } from '@services/store/ui/right-column'

import { ClientOnly } from '@components/client-only'
import { ColumnHeader } from '@components/column-header'
import { ArrowBack, BellIcon, DeleteIcon, InfoIcon, MoreVerticalIcon, SearchIcon } from '@components/icons'
import { StyledMenu, StyledMenuItem } from '@components/overlay'
import { IconButton } from '@components/shared/buttons'
import { ListItemAvatar } from '@components/shared/list-item'

import { Conversation } from '@utils/graphql/conversations'

interface MessagesHeaderProps {
	conversation: Conversation
}
export const ConversationHeader: FC<MessagesHeaderProps> = observer(({ conversation }) => {
	const { userStore, rightColumnUiStore } = useStores()
	const { isMobile } = useLayout()
	const conversationAvatar = useConversationAvatar(conversation)
	const location = useLocation()

	const handleClickGoBack = () => {
		navigate(location.pathname)
	}

	const handleClickOnInfo = () => {
		rightColumnUiStore.setContent(RightColumnContent.Information)
	}

	const handleClickOnSearch = () => {
		rightColumnUiStore.setContent(RightColumnContent.MessagesSearch)
	}

	const showMembersStatus = useCallback(() => {
		if (conversation) {
			if (conversation?.participants.length > 2) {
				return `${conversation?.participants.length} members`
			}
			return 'Last seen in'
		}
	}, [conversation])

	return (
		<ColumnHeader w='full' userSelect='none' pos='relative' boxShadow='0 2px 2px rgb(114 114 114 / 17%)'>
			<ClientOnly>
				{isMobile && <IconButton onClick={handleClickGoBack} icon={<ArrowBack />} aria-label='Close chat' p={0} />}
				<Box flex={1}>
					<HStack cursor='pointer' onClick={handleClickOnInfo}>
						<ListItemAvatar {...conversationAvatar} />
						<VStack align='start'>
							<Text fontSize='md' fontWeight={500} color='text.primary'>
								{conversation.name || conversation.participants.filter((p) => p.id !== userStore.user?.id)[0].username}
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
					<IconButton
						icon={<SearchIcon />}
						aria-label='Search messages'
						onClick={handleClickOnSearch}
						hidden={isMobile}
					/>
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
								icon={<MoreVerticalIcon /* fontSize='15px' color='' */ />}
							/>
						}
					>
						<StyledMenuItem icon={<BellIcon />}>Mute</StyledMenuItem>
						{isMobile && <StyledMenuItem icon={<SearchIcon />}>Search</StyledMenuItem>}
						<StyledMenuItem icon={<InfoIcon />}>Information</StyledMenuItem>
						<MenuDivider my='2px' />
						<StyledMenuItem color='red' icon={<DeleteIcon color='red' fill='none' />}>
							Delete chat
						</StyledMenuItem>
					</StyledMenu>
				</Box>
			</ClientOnly>
		</ColumnHeader>
	)
})

// {conversation ? (
// 	<>
// 		<Box flex={1}>
// 		</Box>
// 		<Box>

// 		</Box>
// 	</>
// ) : (
// 	<CircularProgress
// 		ml={20}
// 		transform='translateY(-50%)'
// 		pos='absolute'
// 		top='50%'
// 		isIndeterminate
// 		color='#8774E1'
// 		trackColor='transparent'
// 		size='20px'
// 	/>
// )}
