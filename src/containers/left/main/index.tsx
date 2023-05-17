import React, { useCallback } from 'react'

import { AnimatePresence, Variants } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { LeftColumnContent } from '@services/store'

import { Animated } from '@ui/animation'
import { Scrollable } from '@ui/overlay'

import { LeftSearch } from '../search'
import { LeftColumnUI } from '../settings'
import { ContactList } from './contact-list'
import { Conversations } from './conversations'
import { LeftMainHeader } from './header'

interface LeftMainProps extends LeftColumnUI {}
export const SCALE_ANIMATION: Variants = {
	open: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.1 },
	},
	hidden: {
		opacity: 0,
		scale: 0.9,
		transition: { duration: 0.1 },
	},
}
export const SLIDE_ANIMATION: Variants = {
	open: {
		x: 0,
		transition: { delay: 0.1, duration: 0.15 },
	},
	hidden: {
		x: '100%',
		transition: { duration: 0.2 },
	},
}
export const FADE_ANIMATION: Variants = {
	open: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.1 },
	},
	hidden: {
		opacity: 0,
		scale: 0.8,
		transition: { duration: 0.1 },
	},
}

export const LeftMain: React.FC<LeftMainProps> = observer(({ leftColumnUiStore }) => {
	const renderContent = useCallback(() => {
		switch (leftColumnUiStore.content) {
			case LeftColumnContent.Conversations:
				return <Conversations key={LeftColumnContent.Conversations} />
			case LeftColumnContent.GlobalSearch:
				return <LeftSearch leftColumnUiStore={leftColumnUiStore} key={LeftColumnContent.GlobalSearch} />
			case LeftColumnContent.Contacts:
				return <ContactList key={LeftColumnContent.Contacts} />
			default:
				return null
		}
	}, [leftColumnUiStore.content])

	return (
		<Animated
			// variants={SCALE_ANIMATION}
			initial='hidden'
			animate='open'
			exit='hidden'
			// animate={leftColumnUiStore.contentGroup !== ContentGroup.Main}
			display='flex'
			flexDirection='column'
			height='100%'
			pos='relative'
		>
			<LeftMainHeader leftColumnUiStore={leftColumnUiStore} />
			<Scrollable pos='relative' id='LeftWrapper' height='100%' width='100%' overflowY='scroll'>
				<AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
			</Scrollable>
		</Animated>
	)
})
