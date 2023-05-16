/* lib */
import * as React from 'react'
import { PageProps } from 'gatsby'
import { Center, Badge } from '@chakra-ui/react'

/* services */
import { pageHead } from '@components'

/* ui  */
import { Conversation, ConversationLayout } from '@modules/chat'

const ConversationPage: React.FC<PageProps> = ({ location }) => {
  const currentConversationId = location.hash.split('#')[1]

  return (
    <ConversationLayout>
      {currentConversationId ? (
        /**
         * @TODO validate id, if not uuid then not open chat?
         */
        <Conversation id={currentConversationId} />
      ) : (
        <Center height="100vh" display={{ base: 'none', md: 'flex' }} flex={1}>
          <Badge userSelect="none" bg="blackAlpha.400" color="#fff">
            Select a conversation to start chatting
          </Badge>
        </Center>
      )}
    </ConversationLayout>
  )
}

export default ConversationPage

export const Head = pageHead({ title: 'ChatHub', postfix: false })
