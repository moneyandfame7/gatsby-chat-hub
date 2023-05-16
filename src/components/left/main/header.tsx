/* lib  */
import React, { useCallback } from 'react'
import { HStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

/* services  */
import { LeftColumnContent } from '@modules/chat/sidebar/helpers/enum'
import { LeftColumnUI } from '../settings'

/* ui  */
import { SearchInput } from '@components/search-input'
import { useStores } from '@store/provider'
import { AnimatePresence } from 'framer-motion'
import { LeftDropdownMenu } from '../menu'
import { LeftGoBack } from '../go-back'

interface LeftMainHeaderProps extends LeftColumnUI {}
export const LeftMainHeader: React.FC<LeftMainHeaderProps> = observer(({ leftColumnUiStore }) => {
  const { authorizationStore, searchStore } = useStores()

  const handleSearchQuery = useCallback(
    (query: string) => {
      if (!Boolean(query)) {
        return
      }

      if (leftColumnUiStore.content === LeftColumnContent.Contacts) {
        searchStore.executeSearchQuery({ type: 'contacts', query })
        return
      }

      searchStore.executeSearchQuery({ type: 'global', query })
    },
    [leftColumnUiStore.content, searchStore.executeSearchQuery]
  )
  const searchInputPlaceholder =
    leftColumnUiStore.content === LeftColumnContent.Contacts ? 'Search contacts' : 'Search (⌘K)'

  const isSearchInputFocused =
    leftColumnUiStore.content === LeftColumnContent.Contacts ||
    leftColumnUiStore.content === LeftColumnContent.GlobalSearch

  const handleFocusInput = () => {
    if (leftColumnUiStore.content !== LeftColumnContent.GlobalSearch) {
      leftColumnUiStore.setContent(LeftColumnContent.GlobalSearch)
    }
  }

  const handleLogoutSelect = () => {
    authorizationStore.logout()
  }

  const handleNewChatSelect = () => {
    leftColumnUiStore.setContent(LeftColumnContent.NewConversationStep1)
  }

  const handleGoBack = () => {
    leftColumnUiStore.handleResetContent()
  }

  const renderContentActionButton = useCallback(() => {
    switch (leftColumnUiStore.content) {
      case LeftColumnContent.Conversations:
        return <LeftDropdownMenu onLogOutSelect={handleLogoutSelect} onNewChatSelect={handleNewChatSelect} />
      default:
        return <LeftGoBack onClick={handleGoBack} />
    }
  }, [leftColumnUiStore.content])

  return (
    <HStack justify="space-between" px={2} py={3}>
      <AnimatePresence initial={false}>{renderContentActionButton()}</AnimatePresence>
      <SearchInput
        isLoading={searchStore.isLoading}
        isFocused={isSearchInputFocused}
        handleFocus={handleFocusInput}
        handleChange={handleSearchQuery}
        placeholder={searchInputPlaceholder}
      />
    </HStack>
  )
})
