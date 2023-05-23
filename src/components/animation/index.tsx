import React, { PropsWithChildren } from 'react'

import { chakra, forwardRef, shouldForwardProp } from '@chakra-ui/react'
import { Variants, isValidMotionProp, motion } from 'framer-motion'

const Animated = chakra(motion.div, {
	/**
	 * Allow motion props and non-Chakra props to be forwarded.
	 */
	shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

type AnimationProps = PropsWithChildren & React.ComponentProps<typeof Animated>
type AnimationVariants = 'SCALE' | 'FADE' | 'SLIDE' | 'ROTATE'
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
}

const Scale: React.FC<AnimationProps> = ({ children, ...props }) => {
	return (
		<Animated variants={ANIMATION_VARIANTS.SCALE} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	)
}
const Slide: React.FC<AnimationProps> = forwardRef(({ children, ...props }, ref) => {
	return (
		<Animated ref={ref} variants={ANIMATION_VARIANTS.SLIDE} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	)
})
const Fade: React.FC<AnimationProps> = ({ children, ...props }) => {
	return (
		<Animated variants={ANIMATION_VARIANTS.FADE} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	)
}
const Rotate: React.FC<AnimationProps> = ({ children, ...props }) => {
	return (
		<Animated variants={ANIMATION_VARIANTS.ROTATE} initial='hidden' animate='open' exit='hidden' {...props}>
			{children}
		</Animated>
	)
}

export const Animation = Object.assign(Animated, {
	Scale,
	Slide,
	Fade,
	Rotate,
})
