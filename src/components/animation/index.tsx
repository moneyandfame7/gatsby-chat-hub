import React, { PropsWithChildren } from 'react'

import { Box, BoxProps, chakra, forwardRef, shouldForwardProp } from '@chakra-ui/react'
import { Variants, isValidMotionProp, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useIsAnimated } from '@services/hooks'

const Animated = chakra(motion.div, {
	/**
	 * Allow motion props and non-Chakra props to be forwarded.
	 */
	shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

type AnimationProps = PropsWithChildren & React.ComponentProps<typeof Animated>
type AnimationVariants = 'SCALE' | 'FADE' | 'SLIDE' | 'ROTATE' | 'WIDTH'
type AnimationDirection = 'left' | 'right'

const ANIMATION_VARIANTS: Record<AnimationVariants, Variants> = {
	SCALE: {
		open: {
			scale: 1,
			opacity: 1,
			transition: { duration: 0.2 },
		},
		hidden: {
			opacity: 0,
			scale: 0.5,
			transition: { duration: 0.2 },
		},
	},
	FADE: {
		open: {
			opacity: 1,
			transition: { duration: 0.2 },
		},
		hidden: {
			opacity: 0,
			transition: { duration: 0.2 },
		},
	},
	SLIDE: {
		hidden: (d: AnimationDirection) => ({
			x: d === 'left' ? '-100%' : '100%',
			transition: { duration: 0.2, ease: 'easeInOut' },
		}),
		open: (d: AnimationDirection) => ({
			x: 0,
			transition: { duration: 0.2, ease: 'easeInOut' },
		}),
	},
	ROTATE: {
		hidden: {
			rotate: 180,
			transition: { duration: 0.2 },
		},
		open: {
			rotate: 360,
			transition: { duration: 0.2 },
		},
	},
	WIDTH: {
		hidden: {
			width: 0,
		},
		open: (val: number) => ({
			width: val,
		}),
	},
}

const Scale: React.FC<AnimationProps> = observer(({ children, ...props }) => {
	const isAnimated = useIsAnimated()
	return isAnimated ? (
		<Animated variants={ANIMATION_VARIANTS.SCALE} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	) : (
		<Box {...props}>{children}</Box>
	)
})
const Slide: React.FC<AnimationProps> = observer(
	forwardRef(({ children, ...props }, ref) => {
		const isAnimated = useIsAnimated()

		return isAnimated ? (
			<Animated ref={ref} variants={ANIMATION_VARIANTS.SLIDE} initial='hidden' animate='open' exit='hidden' {...props}>
				{children}
			</Animated>
		) : (
			<Box {...props}>{children}</Box>
		)
	})
)
const Fade: React.FC<AnimationProps> = observer(({ children, ...props }) => {
	const isAnimated = useIsAnimated()

	return isAnimated ? (
		<Animated variants={ANIMATION_VARIANTS.FADE} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	) : (
		<Box {...props}>{children}</Box>
	)
})
const Rotate: React.FC<AnimationProps> = observer(({ children, ...props }) => {
	const isAnimated = useIsAnimated()

	return isAnimated ? (
		<Animated variants={ANIMATION_VARIANTS.ROTATE} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	) : (
		<Box {...props}>{children}</Box>
	)
})

const Width: React.FC<AnimationProps> = observer(({ children, ...props }) => {
	const isAnimated = useIsAnimated()

	return isAnimated ? (
		<Animated variants={ANIMATION_VARIANTS.WIDTH} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	) : (
		<Box {...props}>{children}</Box>
	)
})

interface DotsProps {
	text: string
}
const Dots: React.FC<DotsProps> = ({ text }) => {
	return (
		<motion.span>
			{text}
			{Array.from({ length: 3 }).map((_, index) => (
				<motion.span
					key={index}
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						delay: index * 0.2,
						type: 'spring',
						stiffness: 60,
						duration: 1,
						repeat: Infinity,
					}}
				>
					.
				</motion.span>
			))}
		</motion.span>
	)
}

export const Animation = Object.assign(Animated, {
	Scale,
	Slide,
	Fade,
	Rotate,
	Width,
	Dots,
})
