import React, { PropsWithChildren } from 'react'

import { Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useLayout, usePressEsc } from '@services/hooks'
import { useStores } from '@services/store'
import { RightColumnContent } from '@services/store/ui/right-column'

import { Animation } from '@components/animation'

import { useConversation } from '@containers/middle/helpers'

import { ContainerIndex } from '@utils/constants'
import { isChatOpen } from '@utils/functions'

import { RightHeader } from './header'

const RightColumnAnimation: React.FC<PropsWithChildren> = observer(({ children }) => {
	const { isMobile, isDesktop } = useLayout()
	const { cacheStore } = useStores()
	const rtl = cacheStore.selectCache((cache) => cache.rtl)
	const css = {
		zIndex: ContainerIndex.Right,
		height: '100vh',
		bg: 'white',
		whiteSpace: 'nowrap',
		margin: '0px !important',
	}
	const test = () => {
		switch (true) {
			case isDesktop:
				return {
					width: '400px',
				}
			case isMobile:
				return {
					position: 'fixed',
					top: 0,
					right: rtl ? undefined : 0,
					left: rtl ? 0 : undefined,
					bottom: 0,
					width: '100vw',
					boxShadow: '0 10px 20px rgb(114 114 114 / 17%)',
				}
			default:
				return {
					position: 'fixed',
					width: '400px',
					top: 0,
					right: rtl ? undefined : 0,
					left: rtl ? 0 : undefined,
					bottom: 0,
					boxShadow: '0 10px 20px rgb(114 114 114 / 17%)',
				}
		}
	}
	return !isDesktop ? (
		<Animation.Slide
			id='RightColumn'
			data-component-name='RightColumn'
			custom={rtl ? 'left' : 'right'}
			{...(test() as any)}
			{...css}
		>
			{children}
		</Animation.Slide>
	) : (
		<Animation.Width id='RightColumn' data-component-name='RightColumn' custom={400} {...(test() as any)} {...css}>
			<Animation.Fade>{children}</Animation.Fade>
		</Animation.Width>
	)
})

export const RightColumn: React.FC = observer(() => {
	const { rightColumnUiStore } = useStores()

	const handlePressEscape = () => {
		if (rightColumnUiStore.isInDom) {
			rightColumnUiStore.reset()
		}
	}

	usePressEsc(handlePressEscape)

	const renderContent = () => {
		if (!rightColumnUiStore.isOpen || !isChatOpen()) {
			return null
		}
		switch (rightColumnUiStore.content) {
			case RightColumnContent.Information:
				return <>Info</>
			case RightColumnContent.MessagesSearch:
				return <>Search</>
		}
	}

	const conversation = useConversation()

	return (
		<AnimatePresence initial={false}>
			{rightColumnUiStore.isOpen && (
				<RightColumnAnimation>
					<RightHeader />
					<Text>{conversation?.id}</Text>
					{renderContent()}
				</RightColumnAnimation>
			)}
		</AnimatePresence>
	)
})
