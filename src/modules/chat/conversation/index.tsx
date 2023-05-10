/* lib */
import React, { useContext, useEffect } from 'react'
import { navigate, useLocation } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Box, Slide, VStack } from '@chakra-ui/react'

/* services  */
import { CONVERSATION_ID_QUERY, ConversationByIdData, ConversationByIdInput } from '@utils/graphql/conversations'
import { useIsMobileScreen } from '@hooks'

/* ui  */
import { ConversationHeader } from './header'
import { ConversationContext } from '../layout'

interface ConversationProps {
  id: string
}

export const Conversation: React.FC<ConversationProps> = ({ id }) => {
  const { isConversationOpen, onConversationClose, onConversationOpen } = useContext(ConversationContext)

  const location = useLocation()
  const isMobileScreen = useIsMobileScreen()

  const { data } = useQuery<ConversationByIdData, ConversationByIdInput>(CONVERSATION_ID_QUERY, {
    variables: { id }
  })
  useEffect(() => {
    if (data) {
      /* set participant id to localstorage for hint on create chat or search */
    }
  }, [data])
  useEffect(() => {
    if (id) {
      onConversationOpen()
    }
  }, [id])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onConversationClose()
        navigate(location.pathname)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <VStack h="100vh" flex={1} margin="0px !important">
      {/* винести в окремий компонент з назвою ConversationWrapper */}
      {isMobileScreen ? (
        <Slide direction="right" in={isConversationOpen} style={{ zIndex: 10 }}>
          <Box bg="blue.300" h="full">
            <ConversationHeader conversation={data?.conversation} />
          </Box>
        </Slide>
      ) : (
        <Box h="full" w={{ base: undefined, md: 'full' }}>
          <ConversationHeader conversation={data?.conversation} />
        </Box>
      )}
    </VStack>
  )
}
