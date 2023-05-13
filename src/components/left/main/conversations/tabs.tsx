import React, { useState } from 'react'
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
  Text,
  Badge
} from '@chakra-ui/react'
import Lottie from 'react-lottie-player'

import { Conversation } from '@utils/graphql/conversations'
import emptyFolderAnimation from '@utils/animations/51382-astronaut-light-theme.json'
import { ListItem } from '@components/ui/list/item'
import { ROUTES } from '@utils/constants'
import { AnimatePresence, Variants } from 'framer-motion'
import { Animated } from '@components/animated'

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

interface ConversationsListProps {
  conversations: Conversation[]
}
const ConversationsList: React.FC<ConversationsListProps> = ({ conversations }) => {
  return (
    <>
      {conversations.map(c => (
        <ListItem
          key={c.id}
          avatar={c.participants[0].photo}
          title={c.participants[0].username}
          to={ROUTES.chat(c.id)}
          subtitle="Lorem ipsum dorem lasldlasdlalsdlasld"
        />
      ))}
    </>
  )
}

interface ConversationsTabsProps {
  all?: Conversation[]
  allLoading: boolean

  unread?: Conversation[]
  unreadLoading: boolean
}

const variants: Variants = {
  hidden: (i: number) => ({
    x: i === 0 ? '-100%' : '100%',
    transition: { duration: 0.25, ease: 'easeInOut' }
  }),
  open: (i: number) => ({
    x: 0,
    transition: { duration: 0.25, ease: 'easeInOut' }
  })
}
export const ConversationsTabs: React.FC<ConversationsTabsProps> = ({ all, allLoading, unread, unreadLoading }) => {
  const renderTab = (loading: boolean, conversations?: Conversation[]) => {
    if (loading) {
      return (
        <Center h="100%">
          <CircularProgress isIndeterminate color="purple" trackColor="transparent" />
        </Center>
      )
    }
    if (conversations && conversations.length > 0) {
      return <ConversationsList conversations={conversations} />
    }
    return (
      <Center h="50vh" flexDir="column" userSelect="none">
        <Lottie play animationData={emptyFolderAnimation} style={{ height: 200, width: 200 }} />
        <Text fontSize="xl" fontWeight={600}>
          Folder is empty
        </Text>
        <Text fontSize="sm" color="text.secondary">
          No chats currently belong to this folder.
        </Text>
      </Center>
    )
  }

  const [index, setIndex] = useState(0)

  const handleChangeTab = (i: number) => {
    setIndex(i)
  }
  return (
    <Tabs isLazy onChange={handleChangeTab} position="relative" variant="unstyled" defaultIndex={0}>
      <TabList px={2} overflowX="auto" boxShadow="0 2px 2px rgb(114 114 114 / 17%)" height="100%">
        <StyledTab>All</StyledTab>
        <StyledTab gap={2}>
          Unread
          {!!unread?.length && <Badge>{unread.length}</Badge>}
        </StyledTab>
      </TabList>
      <TabIndicator mt="-1.5px" height="3px" bg="#8774E1" borderRadius="1px" _hover={{ height: '3px' }} />
      <TabPanels overflowX="hidden" height="100%" my={2}>
        <TabPanel p={0} as={AnimatePresence} initial={false} mode="popLayout">
          <Animated custom={index} variants={variants} initial="hidden" animate="open" exit="hidden">
            {renderTab(allLoading, all)}
          </Animated>
        </TabPanel>
        <TabPanel p={0} as={AnimatePresence} initial={false} mode="popLayout">
          <Animated custom={index} variants={variants} initial="hidden" animate="open" exit="hidden">
            {renderTab(unreadLoading, unread)}
          </Animated>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
