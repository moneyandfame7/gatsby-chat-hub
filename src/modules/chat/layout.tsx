/* lib */
import React, { createContext, type FC, type PropsWithChildren } from 'react'
import { HStack, useDisclosure } from '@chakra-ui/react'

/* services  */
import { Protected } from '@components/protected-route'
import { ConversationsSidebar } from './sidebar'
import { ConversationInformation } from './information'

interface ConversationContextValues {
  isConversationOpen: boolean
  onConversationClose: () => void
  onConversationOpen: () => void

  isInfoOpen: boolean
  toggleInfo: () => void
}
export const ConversationContext = createContext<ConversationContextValues>({} as ConversationContextValues)

export const ConversationLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen: isConversationOpen, onClose: onConversationClose, onOpen: onConversationOpen } = useDisclosure()
  const { isOpen: isInfoOpen, onToggle: toggleInfo } = useDisclosure()

  return (
    <ConversationContext.Provider
      value={{ isConversationOpen, onConversationClose, onConversationOpen, isInfoOpen, toggleInfo }}
    >
      <Protected>
        <HStack>
          <ConversationsSidebar />
          {children}
          <ConversationInformation />
        </HStack>
      </Protected>
    </ConversationContext.Provider>
  )
}
