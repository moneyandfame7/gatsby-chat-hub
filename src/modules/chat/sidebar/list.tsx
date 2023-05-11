/* lib */
import React from 'react'
import { Box } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

/* services  */
import { Conversation } from '@utils/graphql/conversations'

/* ui */
import { ConversationItem } from './item'

interface ConversationsListProps {
  conversations: Conversation[]
}
export const ConversationsList: React.FC<ConversationsListProps> = ({ conversations }) => {
  const [animationRef] = useAutoAnimate()

  return (
    <Box
      ref={animationRef}
      py={2}
      overflowY="scroll"
      height="85vh"
      pos="relative"
      _hover={{
        '::-webkit-scrollbar-thumb': {
          bg: 'blackAlpha.300'
        }
      }}
      sx={{
        '::-webkit-scrollbar': {
          width: '3px'
        },
        '::-webkit-scrollbar-thumb': {
          bg: 'transparent',
          borderRadius: '1px'
        }
      }}
    >
      {conversations.map(c => (
        <ConversationItem key={c.id} conversation={c} />
      ))}
    </Box>
  )
}
