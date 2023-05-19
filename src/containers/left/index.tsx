/* lib  */
import React, { useEffect } from 'react'

import { Box } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { observer, useLocalObservable } from 'mobx-react-lite'

import { ContentGroup, LeftColumnContent, LeftColumnUiStore } from '@services/store/ui/left-column'

import { LeftMain } from '@containers/left/main'
import { Settings } from '@containers/left/settings'

import { isChatOpen } from '@utils/functions'

/* ui  */
import { CreateConversation } from './create-conversation'

export const LeftColumn: React.FC = observer(() => {
	const leftColumnUiStore = useLocalObservable(() => new LeftColumnUiStore())

	function renderContent() {
		switch (leftColumnUiStore.contentGroup) {
			case ContentGroup.Settings:
				return <Settings key={ContentGroup.Settings} leftColumnUiStore={leftColumnUiStore} />
			case ContentGroup.NewConversation:
				return <CreateConversation key={ContentGroup.NewConversation} leftColumnUiStore={leftColumnUiStore} />
			default:
				return <LeftMain key={ContentGroup.Main} leftColumnUiStore={leftColumnUiStore} />
		}
	}

	const handlePressEscape = (e: KeyboardEvent) => {
		/* e.repeat for prevent keydown holding */
		if (
			(e.code === 'Escape' || e.key === 'Escape') &&
			!e.repeat &&
			(!isChatOpen() || leftColumnUiStore.content !== LeftColumnContent.Conversations)
		) {
			e.stopPropagation()
			leftColumnUiStore.handleResetContent()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handlePressEscape, true)

		return () => {
			document.removeEventListener('keydown', handlePressEscape, true)
		}
	}, [])
	return (
		<Box
			bg='white'
			backdropFilter='auto'
			backdropBlur='10px'
			height='100vh'
			w={{ base: 'full', sm: '390px' }}
			overflow='hidden'
			position='relative'
		>
			<AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
		</Box>
	)
})
