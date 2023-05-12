/**
 * The main group of the column, which includes: Search, ConversationList, Contacts
 */
/* ib */
import React, { useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { AnimatePresence, Variants, motion } from 'framer-motion'

/* services  */
import { LeftColumnContent } from '@modules/chat/sidebar/helpers/enum'

/* ui */
import { Animated } from '@components'
import { LeftSearch } from '../search'
import { ContactList } from './contact-list'
import { Conversations } from './conversations'
import { LeftMainHeader } from './header'
import { LeftColumnUI } from '../settings'
import { Scrollable } from '@components/ui'

interface LeftMainProps extends LeftColumnUI {
  handleSearchQuery: (query: string) => void
}
export const SCALE_ANIMATION: Variants = {
  open: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.1 }
  },
  hidden: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.1 }
  }
}
export const SLIDE_ANIMATION: Variants = {
  open: {
    x: 0,
    transition: { delay: 0.1, duration: 0.15 }
  },
  hidden: {
    x: '100%',
    transition: { duration: 0.2 }
  }
}
export const FADE_ANIMATION: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1 }
  },
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.1 }
  }
}

export const LeftMain: React.FC<LeftMainProps> = observer(({ leftColumnUiStore, handleSearchQuery }) => {
  const renderContent = useCallback(() => {
    switch (leftColumnUiStore.content) {
      case LeftColumnContent.ConversationList:
        return <Conversations key={LeftColumnContent.ConversationList} />
      case LeftColumnContent.GlobalSearch:
        return <LeftSearch leftColumnUiStore={leftColumnUiStore} key={LeftColumnContent.GlobalSearch} />
      case LeftColumnContent.Contacts:
        return <ContactList key={LeftColumnContent.Contacts} />
      default:
        return null
    }
  }, [leftColumnUiStore.content])

  const handleChangeQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value)
      handleSearchQuery(e.currentTarget.value)
    },
    [handleSearchQuery]
  )

  return (
    <Animated
      // variants={SCALE_ANIMATION}
      initial="hidden"
      animate="open"
      exit="hidden"
      // animate={leftColumnUiStore.contentGroup !== ContentGroup.Main}
      display="flex"
      flexDirection="column"
      height="100%"
      pos="relative"
    >
      <LeftMainHeader handleChangeQuery={handleChangeQuery} leftColumnUiStore={leftColumnUiStore} />

      {/**
       * @TODO винести анімований блок в окремий компонент, в пропсах анімації, або розбити на різні компоненти +
       * задати паддінг і так далі
       */}
      <Scrollable pos="relative" id="LeftWrapper" height="100%" width="100%" overflowY="scroll">
        <AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
      </Scrollable>
    </Animated>
  )
})
