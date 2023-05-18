import React, { useRef } from 'react'

import {
	Badge,
	Center,
	CircularProgress,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	chakra,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Lottie from 'react-lottie-player'

import { Animation } from '@ui/animation'

import { Conversation } from '@utils/graphql/conversations'

import emptyFolderAnimation from '@assets/51382-astronaut-light-theme.json'

import { ConversationsList } from './list'

const StyledTab = chakra(Tab, {
	baseStyle: {
		borderRadius: '5px',
		_selected: { color: '#8774E1' },
		fontWeight: 500,
		fontSize: 14,
		_hover: { bg: 'blackAlpha.100' },
		padding: '10px 30px',
	},
})

interface ConversationsTabsProps {
	all?: Conversation[]
	allLoading: boolean

	unread?: Conversation[]
	unreadLoading: boolean
}

export const ConversationsTabs: React.FC<ConversationsTabsProps> = ({ all, allLoading, unread, unreadLoading }) => {
	const containerRef = useRef(null)
	const renderTab = (loading: boolean, conversations?: Conversation[]) => {
		if (loading) {
			return (
				<Center h='100%'>
					<CircularProgress isIndeterminate color='purple' trackColor='transparent' />
				</Center>
			)
		}
		if (conversations && conversations.length > 0) {
			return <ConversationsList containerRef={containerRef} conversations={conversations} />
		}
		return (
			<Center h='50vh' flexDir='column' userSelect='none'>
				<Lottie play animationData={emptyFolderAnimation} style={{ height: 200, width: 200 }} />
				<Text fontSize='xl' fontWeight={600}>
					Folder is empty
				</Text>
				<Text fontSize='sm' color='text.secondary'>
					No chats currently belong to this folder.
				</Text>
			</Center>
		)
	}

	return (
		<Tabs isLazy position='relative' variant='unstyled' defaultIndex={0}>
			<TabList px={2} overflowX='auto' boxShadow='0 2px 2px rgb(114 114 114 / 17%)' height='100%'>
				<StyledTab>All</StyledTab>
				<StyledTab gap={2}>
					Unread
					{!!unread?.length && <Badge>{unread.length}</Badge>}
				</StyledTab>
			</TabList>
			<TabIndicator mt='-1.5px' height='3px' bg='#8774E1' borderRadius='1px' _hover={{ height: '3px' }} />
			<TabPanels overflowX='hidden' height='100%' my={2}>
				<TabPanel p={0} as={AnimatePresence} initial={false} mode='popLayout'>
					<Animation.Slide custom='left' data-component-name='Animated' p={0} ref={containerRef}>
						{renderTab(allLoading, all)}
					</Animation.Slide>
				</TabPanel>
				<TabPanel p={0} as={AnimatePresence} initial={false} mode='popLayout'>
					<Animation.Slide custom='right' data-component-name='Animated' p={0} ref={containerRef}>
						{renderTab(unreadLoading, unread)}
					</Animation.Slide>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
