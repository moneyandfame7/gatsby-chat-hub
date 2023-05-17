/* lib  */
import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'

/* ui  */
import { CreateConversation } from '../../modules/chat/sidebar/modal'
import { AnimatePresence } from 'framer-motion'
import { Settings } from '@components/left/settings'
import { LeftMain } from '@components/left/main'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { ContentGroup, LeftColumnUiStore } from '@store/ui/left'
import { isChatOpen } from '@utils/functions'
import { LeftColumnContent } from '@modules/chat/sidebar/helpers/enum'

export const LeftColumn: React.FC = observer(() => {
  const leftColumnUiStore = useLocalObservable(() => new LeftColumnUiStore())

  function renderContent() {
    switch (leftColumnUiStore.contentGroup) {
      case ContentGroup.Settings:
        return <Settings leftColumnUiStore={leftColumnUiStore} />
      case ContentGroup.NewConversation:
        return <CreateConversation leftColumnUiStore={leftColumnUiStore} />
      default:
        return <LeftMain leftColumnUiStore={leftColumnUiStore} />
    }
  }

  const handlePressEscape = (e: KeyboardEvent) => {
    /* e.repeat for prevent keydown holding */
    if (
      (e.code === 'Escape' || e.key === 'Escape') &&
      !e.repeat &&
      (!isChatOpen() || leftColumnUiStore.content !== LeftColumnContent.Conversations)
    ) {
      console.log('UAUAUAUAUAUUAUAUAUAUUAUA----------------')
      e.stopPropagation()
      leftColumnUiStore.handleResetContent()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape, true)

    return () => {
      document.removeEventListener('keydown', handlePressEscape, true)
    }
  }, [])
  return (
    <Box bg="white" backdropFilter="auto" backdropBlur="10px" height="100vh" w={{ base: 'full', sm: '390px' }}>
      <AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
    </Box>
  )
})
