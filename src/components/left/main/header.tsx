/* lib  */
import React, { useCallback, useMemo } from 'react'
import { Box, HStack } from '@chakra-ui/react'
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

interface LeftMainHeaderProps extends LeftColumnUI {
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const LeftMainHeader: React.FC<LeftMainHeaderProps> = observer(({ handleChangeQuery, leftColumnUiStore }) => {
  const { authorizationStore } = useStores()

  const searchInputPlaceholder = leftColumnUiStore.content === LeftColumnContent.Contacts ? 'Search contacts' : 'Search'

  const isSearchInputFocused =
    leftColumnUiStore.content === LeftColumnContent.Contacts ||
    leftColumnUiStore.content === LeftColumnContent.GlobalSearch

  const handleFocusInput = () => {
    leftColumnUiStore.setContent(LeftColumnContent.GlobalSearch)
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
        isFocused={isSearchInputFocused}
        handleFocus={handleFocusInput}
        handleChange={handleChangeQuery}
        placeholder={searchInputPlaceholder}
      />
    </HStack>
  )
})
