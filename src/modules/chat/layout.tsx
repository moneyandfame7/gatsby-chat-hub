/* lib */
import React, { createContext, type FC, type PropsWithChildren } from 'react'
import { HStack, useDisclosure } from '@chakra-ui/react'

/* services  */
import { Protected } from '@components/protected-route'
import { LeftColumn } from '../../components/left'
import { ConversationInformation } from './information'

interface ConversationContextValues {
  isConversationOpen: boolean
  onConversationClose: () => void
  onConversationOpen: () => void

  isConversationCreateOpen: boolean
  onConversationCreateOpen: () => void
  onConversationCreateClose: () => void

  isInfoOpen: boolean
  toggleInfo: () => void
}

export const ConversationContext = createContext<ConversationContextValues>({} as ConversationContextValues)

export const ConversationLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen: isConversationOpen, onClose: onConversationClose, onOpen: onConversationOpen } = useDisclosure()
  const { isOpen: isInfoOpen, onToggle: toggleInfo } = useDisclosure()
  const {
    isOpen: isConversationCreateOpen,
    onClose: onConversationCreateClose,
    onOpen: onConversationCreateOpen
  } = useDisclosure()

  return (
    <ConversationContext.Provider
      value={{
        isConversationOpen,
        onConversationClose,
        onConversationOpen,
        isInfoOpen,
        toggleInfo,
        isConversationCreateOpen,
        onConversationCreateClose,
        onConversationCreateOpen
      }}
    >
      <Protected>
        <HStack>
          <LeftColumn />
          {children}
          <ConversationInformation />
        </HStack>
      </Protected>
    </ConversationContext.Provider>
  )
}
