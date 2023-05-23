/* lib  */
import React, { useEffect } from 'react'

import { AnimatePresence, Variants, motion } from 'framer-motion'
import { observer, useLocalObservable } from 'mobx-react-lite'

import { useIsAnimated, useLayout } from '@services/hooks'
import { ContentGroup, LeftColumnContent, LeftColumnUiStore } from '@services/store/ui/left-column'

import { LeftMain } from '@containers/left/main'
import { Settings } from '@containers/left/settings'

import { isChatOpen, useIsChatOpen } from '@utils/functions'

/* ui  */
import { CreateConversation } from './create-conversation'

const TEST: Variants = {
	hidden: {
		x: '-20%',
		transition: { duration: 0.2, ease: 'easeInOut' },
	},
	open: {
		x: 0,
		transition: { duration: 0.2, ease: 'easeInOut' },
	},
}
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

	useEffect(() => {
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

		document.addEventListener('keydown', handlePressEscape, true)

		return () => {
			document.removeEventListener('keydown', handlePressEscape, true)
		}
	}, [])
	const { isMobile } = useLayout()
	const isChatActive = useIsChatOpen()
	const isAnimated = useIsAnimated()
	return (
		<motion.div
			variants={isAnimated ? TEST : undefined}
			initial='open'
			animate={isMobile && isChatActive ? 'hidden' : 'open'}
			style={{
				background: 'white',
				height: '100vh',
				width: isMobile ? '100%' : '390px',
				overflow: 'hidden',
				position: 'relative',
			}}
		>
			<AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
		</motion.div>
	)
})
