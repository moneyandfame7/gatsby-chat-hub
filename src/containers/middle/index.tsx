import React, { PropsWithChildren } from 'react'

import { AnimatePresence, Variants, motion } from 'framer-motion'

import { useIsMobileScreen } from '@services/hooks'

import { Animation } from '@components/animation'

import { NullableField } from '@utils/types'

import { Conversation } from './conversation'
import { useConversationId } from './helpers'

interface MiddleColumnAnimationProps extends PropsWithChildren {
	on: unknown
}

interface MiddleColumnProps {
	conversationId: NullableField<string>
}
// const ConversationAnimation: React.FC<PropsWithChildren> = ({ children }) => {
// 	return <Animation>{children}</Animation>
// }

const Overlay: React.FC = () => {
	return (
		<motion.div
			key='Backdrop'
			style={{
				position: 'fixed',
				left: 0,
				top: 0,
				height: '100vh',
				width: '100vw',
				background: 'black',
				opacity: 0.3,
				margin: '0px',
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 0.3,
			}}
			exit={{
				opacity: 0,
				transition: { delay: 0.2 },
			}}
		/>
	)
}

const ANIMATION: Variants = {
	open: {
		x: 0,
		transition: { duration: 0.25, ease: 'easeInOut' },
	},
	hidden: {
		x: '100%',
		transition: { duration: 0.15, ease: 'easeInOut' },
	},
}
const MiddleColumnAnimation: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Animation
			variants={ANIMATION}
			initial='hidden'
			animate='open'
			exit='hidden'
			pos='fixed'
			top={0}
			left={0}
			right={0}
			bottom={0}
			margin='0px !important'
			bg='white'
		>
			{children}
		</Animation>
	)
}
export const MiddleColumn: React.FC<MiddleColumnProps> = ({ conversationId }) => {
	const isMobileScreen = useIsMobileScreen()

	const renderContent = () => {
		switch (isMobileScreen) {
			case true:
				return (
					<AnimatePresence initial={false}>
						{conversationId && (
							<>
								<Overlay key='Overlay' />
								<MiddleColumnAnimation key='Conversation'>
									<Conversation id={conversationId} />
								</MiddleColumnAnimation>
							</>
						)}
					</AnimatePresence>
				)
			default:
				return <>{conversationId && <Conversation id={conversationId} />}</>
		}
	}

	return <>{renderContent()}</>
}
