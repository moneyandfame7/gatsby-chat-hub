/* lib  */
import React, { useCallback, useContext, useEffect, useState } from 'react'
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
import { CreateConversation } from './modal'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { ConversationContext } from '../layout'
import { LeftColumnContent } from './helpers/enum'

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
          _focusVisible={{ borderColor: 'primary' }}
          borderRadius={12}
          cursor="default"
          onKeyDown={e => {
            if (e.code === 'Escape') {
              e.currentTarget.blur()
              e.currentTarget.value = ''
            }
          }}
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

  const { onConversationCreateOpen } = useContext(ConversationContext)
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
        <ContextMenuItem icon={<BiGroup size="20px" color="#707579" />} onClick={onConversationCreateOpen}>
          New chat
        </ContextMenuItem>
        <ContextMenuItem
          icon={<BiLogOut color="#E53835" size="20px" />}
          color="red"
          onClick={authorizationStore.logout}
        >
          Log out
        </ContextMenuItem>
      </ContextMenu>
      {/* <CreateConversation isOpen={createConversationOpen} onClose={onClose} onOpen={onOpen} /> */}
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

enum ContentType {
  Main,
  NewConversation,
  Settings
}
export const ConversationsSidebar: React.FC = () => {
  const isFirstTabActive = false
  const [content, setContent] = useState<LeftColumnContent>(LeftColumnContent.ConversationList)
  const { isConversationCreateOpen } = useContext(ConversationContext)

  let contentType: ContentType = ContentType.Main
  switch (content) {
    case LeftColumnContent.NewConversationStep1:
    case LeftColumnContent.NewConversationStep2:
      contentType = ContentType.NewConversation
      break
    case LeftColumnContent.Settings:
      contentType = ContentType.Settings
      break
  }
  const handleReset = useCallback(() => {}, [content, isFirstTabActive])
  const mainContainer: Variants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.1 }
    },
    hidden: {
      scale: 0.5,
      opacity: 0
    }
  }

  // const renderContent = () => {
  //   switch (contentType) {
  //     case ContentType.NewConversation:
  //       return <CreateConversation />
  //     case ContentType.Settings:
  //       return <Settings />
  //     default:
  //       return <LeftMain />
  //   }
  // }

  return (
    <Box
      bg="white.alpha"
      backdropFilter="auto"
      backdropBlur="10px"
      h="100vh"
      w={{ base: 'full', sm: '390px' }}
      overflowX="hidden"
    >
      <motion.div variants={mainContainer} initial="open" animate={isConversationCreateOpen ? 'hidden' : 'open'}>
        <ConversationsHeader key={1} />
        <ConversationsTabs key={2} />
      </motion.div>
      <AnimatePresence mode="sync">{isConversationCreateOpen && <CreateConversation key={3} />}</AnimatePresence>
    </Box>
  )
}
