/* lib  */
import React, { memo } from 'react'
import { Link } from 'gatsby'
import { Avatar, Badge, HStack, Text, ThemingProps, VStack } from '@chakra-ui/react'
import { ContextMenu as ChakraUiContextMenu } from 'chakra-ui-contextmenu'
import { RxOpenInNewWindow } from 'react-icons/rx'
import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from 'react-icons/md'
import { DeleteIcon } from '@chakra-ui/icons'

/* services  */
import { useStores } from '@store/provider'
import { formatDate } from '@utils/functions'
import { Conversation } from '@utils/graphql/conversations'
import { ROUTES } from '@utils/constants'

/* ui */
import { ContextMenuItem, ContextMenuList } from '@components'

interface ConversationItemProps {
  conversation: Conversation
}

interface ConversationAvatarProps extends ConversationItemProps {
  size?: ThemingProps<'Avatar'>['size']
}
export const ConversationAvatar: React.FC<ConversationAvatarProps> = memo(({ size, conversation }) => {
  const {
    userStore: { user }
  } = useStores()
  if (!user) {
    return null
  }

  const getAvatarContent = () => {
    /* фільтруємо учасників, виключачи себе зі списку */
    const participants = conversation.participants.filter(p => p.id !== user.id)

    /* якщо спільна конфа - повертаю її назву */
    if (participants.length > 1) {
      return {
        name: 'conver name'
      }
    } else {
      /* якщо 1x1 - аватарку співрозмовника */
      return {
        src: participants[0].photo
      }
    }
  }
  return <Avatar loading="lazy" size={size} {...getAvatarContent()} />
})

export const ConversationItem: React.FC<ConversationItemProps> = memo(({ conversation }) => {
  return (
    <ChakraUiContextMenu<HTMLDivElement>
      renderMenu={() => (
        <ContextMenuList>
          <ContextMenuItem
            icon={<RxOpenInNewWindow size={21} color="#707579" />}
            onClick={() => {
              window.open(`http://localhost:8000/${ROUTES.chat(conversation.id)}`, '_blank')
            }}
          >
            Open in new tab
          </ContextMenuItem>
          <ContextMenuItem icon={<MdOutlineMarkChatRead size={20} color="#707579" />}>Mark as read</ContextMenuItem>
          <ContextMenuItem icon={<MdOutlineMarkChatUnread size={20} color="#707579" />}>Mark as unread</ContextMenuItem>
          <ContextMenuItem
            color="red"
            icon={<DeleteIcon fontSize={20} color="red" />}
            onClick={() => {
              /* Delete with subscriptions */
            }}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuList>
      )}
    >
      {ref => (
        <HStack
          ref={ref}
          borderRadius={8}
          _hover={{ bg: 'gray.100' }}
          cursor="pointer"
          p="9px"
          w="full"
          userSelect="none"
          as={Link}
          to={ROUTES.chat(conversation.id)}
        >
          {/* якщо це спільний чат - назву в аватарку ( FIRST LETTER - FR), інакше - аватарку тіпа */}
          <ConversationAvatar conversation={conversation} />
          {/* Content */}
          <VStack align="start" flex={1}>
            <HStack justify="space-between" w="full">
              {/* Якщо учасників декілька - показати нік відправителя тут. */}
              <Text fontSize={14} fontWeight={600}>
                {conversation.participants[0].username}
              </Text>
              {/* виводити дату. якщо є останнє повідомлення - то його дату. інакше - дату створення розмови */}
              <Text fontSize={12} color="text.secondary">
                {formatDate(conversation.createdAt)}
              </Text>
            </HStack>
            <HStack w="full">
              <Text
                w="30px"
                overflowX="hidden"
                textOverflow="ellipsis"
                flex="1"
                fontSize={12}
                textColor="text.secondary"
                whiteSpace="nowrap"
              >
                lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet, consectetur adipiscing
              </Text>
              {conversation.unreadMessages && (
                <Badge transition="all 0.3s ease" borderTopRadius={2} borderRadius="0.75rem">
                  {conversation.unreadMessages}
                </Badge>
              )}
            </HStack>
          </VStack>
        </HStack>
      )}
    </ChakraUiContextMenu>
  )
})
