import React from 'react'

import { Box, BoxProps, VStack } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { v4 as uuidv4 } from 'uuid'

import { useStickyHeightScroll } from '@services/hooks'
import { CachedMessage } from '@services/store/cache'

import { Message } from '.'

interface MessagesListProps {
	messages: CachedMessage[]
}

export const MESSAGE_CONTAINER_WIDTH: BoxProps['maxW'] = { base: '100vw', lg: '728px', '2xl': '50vw' }
export const MessagesList: React.FC<MessagesListProps> = observer(({ messages }) => {
	// const scrollRef = useStickyHeightScroll()
	console.log('Rerender list')
	return (
		<Box
			data-component-name='MessagesList'
			w='full'
			flex={1}
			h='100%'
			overflowY='auto'
			// transform='scale(1, -1)'
			// ref={scrollRef}
		>
			<Box
				data-component-name='MessagesContainer'
				maxW={MESSAGE_CONTAINER_WIDTH}
				width='100%'
				mx='auto'
				px={2}
				py={2}
				// transform='scale(1, -1)'
			>
				<>
					{messages.map((m) => (
						<Message key={uuidv4()} message={m} />
					))}
				</>
			</Box>
		</Box>
	)
})
