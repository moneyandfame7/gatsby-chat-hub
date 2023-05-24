import React, { PropsWithChildren } from 'react'

import { Box } from '@chakra-ui/react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useIsAnimated, useLayout } from '@services/hooks'

import { Animation } from '@components/animation'

import { ContainerIndex } from '@utils/constants'
import { NullableField } from '@utils/types'

import { Conversation } from './conversation'

interface MiddleColumnProps {
	conversationId: NullableField<string>
}

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
const MiddleColumnAnimation: React.FC<PropsWithChildren & { isAnimated: boolean }> = observer(
	({ isAnimated, children }) => {
		return (
			<Animation
				variants={isAnimated ? ANIMATION : undefined}
				initial='hidden'
				animate='open'
				exit='hidden'
				pos='fixed'
				top={0}
				left={0}
				right={0}
				bottom={0}
				margin='0px !important'
				zIndex={ContainerIndex.Middle}
				bg='white'
			>
				{children}
			</Animation>
		)
	}
)
export const MiddleColumn: React.FC<MiddleColumnProps> = observer(({ conversationId }) => {
	const { isMobile } = useLayout()
	const isAnimated = useIsAnimated()

	const renderContent = () => {
		switch (isMobile) {
			case true:
				return (
					<AnimatePresence initial={false}>
						{conversationId && (
							<>
								{isAnimated && <Overlay key='Overlay' />}
								<MiddleColumnAnimation isAnimated={isAnimated} key='Conversation'>
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

	return (
		<Box data-component-name='MiddleColumn' /* width='100%' */ flex={1} margin='0px !important'>
			{renderContent()}
		</Box>
	)
})
