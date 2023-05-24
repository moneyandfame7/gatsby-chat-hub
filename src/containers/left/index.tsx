import React from 'react'

import { AnimatePresence, Variants, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useIsAnimated, useLayout, usePressEsc } from '@services/hooks'
import { useStores } from '@services/store'
import { ContentGroup, LeftColumnContent } from '@services/store/ui/left-column'

import { LeftMain } from '@containers/left/main'
import { Settings } from '@containers/left/settings'

import { isChatOpen, useIsChatOpen } from '@utils/functions'

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

interface LeftColumnProps {}
export const LeftColumn: React.FC<LeftColumnProps> = observer(() => {
	const { leftColumnUiStore } = useStores()

	const handlePressEscape = () => {
		if (!isChatOpen() || leftColumnUiStore.content !== LeftColumnContent.Conversations) {
			leftColumnUiStore.handleResetContent()
		}
	}

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

	usePressEsc(handlePressEscape)
	const { isMobile } = useLayout()
	const isChatActive = useIsChatOpen()
	const isAnimated = useIsAnimated()
	return (
		<motion.div
			data-component-name='LeftColumn'
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
