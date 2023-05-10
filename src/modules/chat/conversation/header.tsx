/* lib  */
import React, { FC, useCallback, useContext } from 'react'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { Box, CircularProgress, HStack, IconButton, MenuButton, Text, VStack } from '@chakra-ui/react'
import { ArrowLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import { MdOutlineMoreVert } from 'react-icons/md'

/* services  */
import { Conversation } from '@utils/graphql/conversations'
import { useIsMobileScreen } from '@hooks'
import { ConversationContext } from '../layout'

/* ui  */
import { ContextMenu, ContextMenuItem } from '@components'
import { ConversationAvatar } from '../sidebar/item'

interface MessagesHeaderProps {
  conversation?: Conversation
}
export const ConversationHeader: FC<MessagesHeaderProps> = ({ conversation }) => {
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
  return (
    <Box bg="white" w="full" h="55px" color="#fff" py="8px" pr="10px" pl="20px" userSelect="none" pos="relative">
      <HStack>
        {isMobileScreen && (
          <IconButton
            onClick={onGoBackClick}
            icon={<ArrowLeftIcon />}
            aria-label="Close chat"
            _hover={{ bg: 'whiteAlpha.50' }}
            size="md"
            color="gray.400"
            p={0}
            bg="transparent"
            borderRadius="50%"
          />
        )}
        {conversation ? (
          <>
            <Box flex={1}>
              <HStack cursor="pointer" onClick={toggleInfo} width="max-content">
                <ConversationAvatar size="sm" conversation={conversation} />
                <VStack align="start">
                  <Text fontSize="md" fontWeight={500} color="text.primary">
                    {conversation?.participants[0].username}
                  </Text>
                  {conversation?.participants && (
                    <Text fontSize="xs" m="0 !important" color="text.secondary" fontWeight={500}>
                      {showMembersStatus()}
                    </Text>
                  )}
                </VStack>
              </HStack>
            </Box>
            <Box>
              <ContextMenu
                placement="bottom-end"
                menuButton={
                  <MenuButton
                    as={IconButton}
                    aria-label="Menu"
                    color="gray.400"
                    bg="transparent"
                    borderRadius="50%"
                    fontSize={15}
                    _hover={{
                      bg: 'blackAlpha.50'
                    }}
                    icon={<MdOutlineMoreVert fontSize="15px" color="" />}
                  />
                }
              >
                <ContextMenuItem color="red" icon={<DeleteIcon fontSize={15} color="red" />}>
                  Delete chat
                </ContextMenuItem>
              </ContextMenu>
            </Box>
          </>
        ) : (
          <CircularProgress
            ml={20}
            transform="translateY(-50%)"
            pos="absolute"
            top="50%"
            isIndeterminate
            color="#8774E1"
            trackColor="transparent"
            size="20px"
          />
        )}
      </HStack>
    </Box>
  )
}
