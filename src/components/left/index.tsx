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
import { StyledMenuItem, StyledMenu } from '@components'
import { CreateConversation } from '../../modules/chat/sidebar/modal'
import { AnimatePresence } from 'framer-motion'
import { ConversationContext } from '../../modules/chat/layout'
import { LeftColumnContent } from '../../modules/chat/sidebar/helpers/enum'
import { Settings } from '@components/left/settings'
import { LeftMain } from '@components/left/main'
import { search } from '@store/search'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { ContentGroup, LeftColumnUiStore } from '@store/ui/left'

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
      <StyledMenu
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
        <StyledMenuItem icon={<BiGroup size="20px" color="#707579" />} onClick={onConversationCreateOpen}>
          New chat
        </StyledMenuItem>
        <StyledMenuItem icon={<BiLogOut color="#E53835" size="20px" />} color="red" onClick={authorizationStore.logout}>
          Log out
        </StyledMenuItem>
      </StyledMenu>
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

export const LeftColumn: React.FC = observer(() => {
  const leftColumnUiStore = useLocalObservable(() => new LeftColumnUiStore())

  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('')
  const [contactsQuery, setContactsQuery] = useState<string>('')

  const { searchByQueryGlobal } = search

  const handleSearchQuery = useCallback(
    (query: string) => {
      if (leftColumnUiStore.content === LeftColumnContent.Contacts) {
        setContactsQuery(query)
        return
      }

      /* leftColumnUiStore.setContent(LeftColumnContent.GlobalSearch) */

      searchByQueryGlobal(query)
    },
    [leftColumnUiStore.content]
  )

  function renderContent() {
    switch (leftColumnUiStore.contentGroup) {
      case ContentGroup.Settings:
        return <Settings leftColumnUiStore={leftColumnUiStore} />
      case ContentGroup.NewConversation:
        return <CreateConversation leftColumnUiStore={leftColumnUiStore} />
      default:
        return <LeftMain leftColumnUiStore={leftColumnUiStore} handleSearchQuery={handleSearchQuery} />
    }
  }

  const handlePressEscape = useCallback((e: KeyboardEvent) => {
    /* e.repeat for prevent keydown holding */
    if ((e.code === 'Escape' || e.key === 'Escape') && !e.repeat) {
      e.preventDefault()
      console.log('[REMOVED CONTENT]:', leftColumnUiStore.contentName)
      leftColumnUiStore.handleResetContent()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape, false)

    return () => {
      document.removeEventListener('keydown', handlePressEscape, false)
    }
  }, [])

  return (
    <Box bg="white" backdropFilter="auto" backdropBlur="10px" height="100vh" w={{ base: 'full', sm: '390px' }}>
      <AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
      {/**
       * @TODO Main conversation list мусить бути в motion div, а інші - в запхати в AnimatePresence?
       */}
      {/* <motion.div variants={mainContainer} initial="open" animate={isConversationCreateOpen ? 'hidden' : 'open'}>
        <ConversationsHeader key={1} />
        <ConversationsTabs key={2} />
      </motion.div>
      <AnimatePresence mode="sync">{isConversationCreateOpen && <CreateConversation key={3} />}</AnimatePresence> */}
    </Box>
  )
})
