import React, { useRef, useState } from 'react'

import { Badge, Center, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, chakra } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Lottie from 'react-lottie-player'

import { useIsAnimated } from '@services/hooks'

import { Animation } from '@components/animation'
import { Loader } from '@components/shared/loaders'

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
}

export const ConversationsTabs: React.FC<ConversationsTabsProps> = ({ all, allLoading }) => {
	const containerRef = useRef(null)
	const renderTab = (loading: boolean, conversations?: Conversation[]) => {
		if (conversations && conversations.length > 0) {
			return <ConversationsList containerRef={containerRef} conversations={conversations} />
		}
		if (loading) {
			return (
				<Center height='100%' bg='blue'>
					<Loader />
				</Center>
			)
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

	const [unread, setUnread] = useState<Conversation[]>([])
	const isAnimated = useIsAnimated()

	const animationTabs = isAnimated
		? {
				as: AnimatePresence,
				initial: false,
				mode: 'popLayout',
		  }
		: undefined

	return (
		<Tabs isLazy={isAnimated} position='relative' variant='unstyled' defaultIndex={0} id='ConversationsTabs'>
			<TabList px={2} overflowX='auto' boxShadow='0 2px 2px rgb(114 114 114 / 17%)' height='100%'>
				<StyledTab>All</StyledTab>
				<StyledTab gap={2}>
					Unread
					{!!unread?.length && <Badge>{unread.length}</Badge>}
				</StyledTab>
			</TabList>
			<TabIndicator mt='-1.5px' height='3px' bg='#8774E1' borderRadius='1px' _hover={{ height: '3px' }} />
			<TabPanels overflowX='hidden' height='100%' my={2}>
				<TabPanel p={0} {...animationTabs}>
					<Animation.Fade data-component-name='Animated' px={2} ref={containerRef}>
						{renderTab(allLoading, all)}
					</Animation.Fade>
				</TabPanel>
				<TabPanel p={0} {...animationTabs}>
					<Animation.Fade data-component-name='Animated' px={2} ref={containerRef}>
						{renderTab(false, unread)}
					</Animation.Fade>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
