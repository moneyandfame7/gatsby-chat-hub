import React, { PropsWithChildren, useCallback, useMemo } from 'react'

import { DeleteIcon } from '@chakra-ui/icons'
import { useLocation } from '@reach/router'
import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from 'react-icons/md'
import { RxOpenInNewWindow } from 'react-icons/rx'

import { ContextMenu, ContextMenuItem } from '@ui/overlay'
import { ListItem } from '@ui/shared/list-item'

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

	const conversationItems = useMemo(
		() => (
			<>
				<ContextMenuItem icon={<RxOpenInNewWindow size={21} color='#707579' />} onClick={handleOpenNewTab}>
					Open in new tab
				</ContextMenuItem>
				{/* if has unread - mark as read, else mark as unread */}
				<ContextMenuItem icon={<MdOutlineMarkChatRead size={20} color='#707579' />} onClick={handleMarkAsRead}>
					Mark as read
				</ContextMenuItem>
				<ContextMenuItem icon={<MdOutlineMarkChatUnread size={20} color='#707579' />} onClick={handleMarkAsUnread}>
					Mark as unread
				</ContextMenuItem>
				<ContextMenuItem color='red' icon={<DeleteIcon fontSize={20} color='red' />} onClick={handleDelete}>
					Delete
				</ContextMenuItem>
			</>
		),
		[]
	)
	return (
		<ContextMenu containerRef={containerRef} renderItems={conversationItems}>
			{children}
		</ContextMenu>
	)
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, containerRef }) => {
	const { hash } = useLocation()
	const activeConversationId = hash.split('#')[1]
	const getDateForConversation = (c: Conversation) => {
		if (c?.lastMessage) {
			return c.lastMessage.createdAt
		}
		return c.createdAt
	}
	return (
		<ConversationContextMenu containerRef={containerRef} conversation={conversation}>
			<ListItem
				isActive={activeConversationId === conversation.id}
				date={formatDate(getDateForConversation(conversation))}
				key={conversation.id}
				avatar={conversation.participants[0].photo}
				title={conversation.name}
				to={ROUTES.chat(conversation.id)}
				subtitle='Lorem ipsum dorem lasldlasdlalsdlasldaksdfkaskdfkaskdfkaksdfk'
			/>
		</ConversationContextMenu>
	)
}
