import React, { PropsWithChildren, useCallback } from 'react'

import { useLocation } from '@reach/router'

import { useConversationAvatar } from '@services/actions/ui/conversations'
import { useIsAnimated, useLayout } from '@services/hooks'
import { useStores } from '@services/store'

import { Animation } from '@components/animation'
import { DeleteIcon, MarkReadIcon, MarkUnreadIcon, NewTabIcon } from '@components/icons'
import { ListItem } from '@components/list-item'
import { ContextMenu, ContextMenuItem } from '@components/overlay'

import { ROUTES } from '@utils/constants'
import { formatDate } from '@utils/functions'
import { Conversation } from '@utils/graphql/conversations'

interface ConversationItemProps extends PropsWithChildren {
	conversation: Conversation
	containerRef: React.RefObject<HTMLDivElement>
}
const ConversationContextMenu: React.FC<ConversationItemProps> = ({ containerRef, conversation, children }) => {
	const handleOpenNewTab = useCallback(() => {
		window.open(`${ROUTES.chat(conversation.id)}`, '_blank')
	}, [conversation])

	const handleMarkAsRead = useCallback(() => {
		//
	}, [])

	const handleMarkAsUnread = useCallback(() => {
		//
	}, [])

	const handleDelete = useCallback(() => {
		//
	}, [])

	const conversationItems = (
		<>
			<ContextMenuItem icon={<NewTabIcon />} onClick={handleOpenNewTab}>
				Open in new tab
			</ContextMenuItem>
			{/* if has unread - mark as read, else mark as unread */}
			<ContextMenuItem icon={<MarkReadIcon />} onClick={handleMarkAsRead}>
				Mark as read
			</ContextMenuItem>
			<ContextMenuItem icon={<MarkUnreadIcon />} onClick={handleMarkAsUnread}>
				Mark as unread
			</ContextMenuItem>
			<ContextMenuItem color='red' icon={<DeleteIcon fontSize={20} color='red' fill='none' />} onClick={handleDelete}>
				Delete
			</ContextMenuItem>
		</>
	)

	const container = document.getElementById('ConversationsContainer')
	return (
		<ContextMenu container={container} containerRef={containerRef} renderItems={conversationItems}>
			{children}
		</ContextMenu>
	)
}
const getDateForConversation = (c: Conversation) => {
	if (c?.lastMessage) {
		return c.lastMessage.updatedAt
	}
	return c.createdAt
}
export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, containerRef }) => {
	const { userStore } = useStores()
	const { hash } = useLocation()
	const activeConversationId = hash.split('#')[1]

	const avatar = useConversationAvatar(conversation)
	const { isMobile } = useLayout()
	return (
		<ConversationContextMenu containerRef={containerRef} conversation={conversation}>
			<ListItem
				isActive={!isMobile && activeConversationId === conversation.id}
				date={formatDate(getDateForConversation(conversation))}
				key={conversation.id}
				avatar={avatar}
				title={conversation.name || conversation.participants.filter((p) => p.id !== userStore.user?.id)[0].username}
				to={ROUTES.chat(conversation.id)}
				subtitle={conversation.lastMessage?.text}
			/>
		</ConversationContextMenu>
	)
}
