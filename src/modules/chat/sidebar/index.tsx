/* lib  */
import React, { useEffect, useState } from 'react'
import { Box, HStack, IconButton, Input, InputGroup, InputLeftElement, MenuButton } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { BiGroup } from '@react-icons/all-files/bi/BiGroup'
import { BiLogOut } from '@react-icons/all-files/bi/BiLogOut'

/* services  */
import { useDebounce } from '@hooks'
import { useStores } from '@store/provider'

/* ui  */
import { ContextMenuItem, ContextMenu } from '@components'
import { ConversationsTabs } from './tabs'
import { CreateConversationModal } from './modal'

const ConversationsSearch: React.FC = () => {
  const EL_POSITION = '30%'
  const TEXT_POSITION = '30%'

  const [iconStyle, setIconStyle] = useState<any>({
    left: EL_POSITION
  })
  const [inputStyle, setInputStyle] = useState<any>({
    left: TEXT_POSITION
  })

  const [conversation, setConversation] = useState('')
  const handleChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setConversation(e.target.value)
  }
  const debouncedConversation = useDebounce(conversation, 500)
  useEffect(() => {
    ;(async () => {
      if (debouncedConversation.length > 0) {
        /* Search conversations with name */
      }
    })()
  }, [debouncedConversation])

  return (
    <HStack width="full">
      <InputGroup cursor="default">
        <InputLeftElement
          transition="ease .3s"
          style={{
            ...iconStyle
          }}
          pointerEvents="none"
          children={<SearchIcon color="gray.600" fontSize={12} />}
        />
        <Input
          _focusVisible={{ borderColor: '#454B55' }}
          borderRadius={12}
          cursor="default"
          type="search"
          variant="filled"
          onChange={handleChangeSearch}
          placeholder="Search"
          _placeholder={{
            transition: 'ease .3s',
            color: 'gray.400',
            ml: 10,
            position: 'absolute',
            top: '50%',
            fontSize: 12,
            transform: 'translateY(-50%)',
            ...inputStyle
          }}
          onBlur={() => {
            setInputStyle({
              left: TEXT_POSITION
            })
            if (conversation.length === 0) {
              setIconStyle({
                left: EL_POSITION
              })
            }
          }}
          onFocus={() => {
            setInputStyle({
              left: 10
            })
            setIconStyle({
              left: 0
            })
          }}
        />
      </InputGroup>
    </HStack>
  )
}
const DropdownMenu: React.FC = () => {
  const { authorizationStore } = useStores()
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <Box>
      <ContextMenu
        menuButton={
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            size="md"
            color="gray.400"
            p={0}
            aria-label="Open menu"
            _hover={{
              bg: 'blackAlpha.50'
            }}
            bg="transparent"
            borderRadius="50%"
          />
        }
      >
        <ContextMenuItem icon={<BiGroup size="20px" color="#707579" />} onClick={onOpen}>
          New chat
        </ContextMenuItem>
        <ContextMenuItem
          icon={<BiLogOut color="#E53835" size="20px" />}
          color="red"
          onClick={() => {
            authorizationStore.logout()
          }}
        >
          Log out
        </ContextMenuItem>
      </ContextMenu>
      <CreateConversationModal isOpen={open} onClose={onClose} onOpen={onOpen} />
    </Box>
  )
}
const ConversationsHeader: React.FC = () => {
  return (
    <HStack justify="space-between" px={2} py={3}>
      <DropdownMenu />
      <ConversationsSearch />
    </HStack>
  )
}
export const ConversationsSidebar: React.FC = () => {
  return (
    <Box
      bg="white.alpha"
      backdropFilter="auto"
      backdropBlur="10px"
      h="100vh"
      w={{ base: 'full', sm: '390px' }}
      overflowX="hidden"
    >
      <ConversationsHeader />
      <ConversationsTabs />
    </Box>
  )
}
