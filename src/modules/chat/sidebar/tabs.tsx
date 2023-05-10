/* lib  */
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import {
  chakra,
  Tab,
  Tabs,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
  Center,
  CircularProgress,
  Box,
  Badge,
  Text
} from '@chakra-ui/react'

/* services  */
import { client } from '@utils/apollo/clients'
import {
  ConversationsData,
  CONVERSATIONS_QUERY,
  Conversation,
  CONVERSATION_CREATED_SUBSCRIPTION,
  ConversationCreatedSubscriptionData
} from '@utils/graphql/conversations'

/* ui  */
import { ConversationsList } from './list'

const StyledTab = chakra(Tab, {
  baseStyle: {
    borderRadius: '5px',
    _selected: { color: '#8774E1' },
    fontWeight: 500,
    fontSize: 14,
    _hover: { bg: 'blackAlpha.100' },
    padding: '10px 30px'
  }
})

export const ConversationsTabs: React.FC = () => {
  const showConversationList = (loading: boolean, conversations?: Conversation[]) => {
    switch (true) {
      case loading:
        return (
          <Center h="70vh">
            <CircularProgress isIndeterminate color="purple" trackColor="transparent" />
          </Center>
        )
      case !conversations:
        return (
          <Center h="70vh">
            <Text fontSize="xl">Empty data</Text>
          </Center>
        )
      default:
        return <ConversationsList conversations={conversations!} />
    }
  }
  /* -- GRAPHQL -- */
  /* query for unread and all  */
  const { data: all, loading: allLoad, subscribeToMore } = useQuery<ConversationsData>(CONVERSATIONS_QUERY, { client })
  const { data: unread, loading: unreadLoad } = useQuery<ConversationsData>(CONVERSATIONS_QUERY)

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: CONVERSATION_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }: { subscriptionData: ConversationCreatedSubscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }
        const newConversation = subscriptionData.data.conversationCreated

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations]
        })
      }
    })
  }

  /**
   * викликати subscriptions on mount
   */
  useEffect(() => {
    subscribeToNewConversations()
  }, [])
  return (
    <Box>
      <Tabs isLazy={true} position="relative" variant="unstyled" defaultIndex={0}>
        <TabList overflowX="auto" boxShadow="0 2px 2px rgb(114 114 114 / 17%)">
          <StyledTab>All</StyledTab>
          <StyledTab gap={2}>
            Unread
            <Badge>{unread?.conversations.length}</Badge>
          </StyledTab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="#8774E1" borderRadius="1px" />
        <TabPanels overflowX="hidden">
          <TabPanel p={0}>{showConversationList(allLoad, all?.conversations)}</TabPanel>
          <TabPanel p={0}>{showConversationList(unreadLoad, unread?.conversations)}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
