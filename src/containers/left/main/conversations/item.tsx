/* lib  */
import React, { PropsWithChildren } from 'react'

import { DeleteIcon } from '@chakra-ui/icons'

/* ui  */
import { useLocation } from '@reach/router'
import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from 'react-icons/md'
import { RxOpenInNewWindow } from 'react-icons/rx'

import { ContextMenu, ContextMenuItem } from '@ui/overlay'
import { ListItem } from '@ui/shared/list-item'

import { ROUTES } from '@utils/constants'
import { formatDate } from '@utils/functions'

/* services */
import { Conversation } from '@utils/graphql/conversations'
import { PropsWithConversation } from '@utils/types'

interface ConversationContextMenuProps extends PropsWithChildren {
	conversation?: Conversation
}
const ConversationContextMenu: React.FC<ConversationContextMenuProps> = ({ conversation, children }) => {
	const conversationItems = (
		<>
			<ContextMenuItem icon={<RxOpenInNewWindow size={21} color='#707579' />}>Open in new tab</ContextMenuItem>
			<ContextMenuItem icon={<MdOutlineMarkChatRead size={20} color='#707579' />}>Mark as read</ContextMenuItem>
			<ContextMenuItem icon={<MdOutlineMarkChatUnread size={20} color='#707579' />}>Mark as unread</ContextMenuItem>
			<ContextMenuItem color='red' icon={<DeleteIcon fontSize={20} color='red' />}>
				Delete
			</ContextMenuItem>
		</>
	)
	return <ContextMenu renderItems={conversationItems}>{children}</ContextMenu>
}

export const ConversationItem: React.FC<PropsWithConversation> = ({ conversation }) => {
	const { hash } = useLocation()
	const activeConversationId = hash.split('#')[1]
	const getDateForConversation = (c: Conversation) => {
		if (c?.lastMessage) {
			return c.lastMessage.createdAt
		}
		return c.createdAt
	}
	return (
		<ConversationContextMenu>
			<ListItem
				isActive={activeConversationId === conversation.id}
				date={formatDate(getDateForConversation(conversation))}
				key={conversation.id}
				avatar={conversation.participants[0].photo}
				title={conversation.participants[0].username}
				to={ROUTES.chat(conversation.id)}
				subtitle='Lorem ipsum dorem lasldlasdlalsdlasldaksdfkaskdfkaskdfkaksdfk'
			/>
		</ConversationContextMenu>
	)
}
