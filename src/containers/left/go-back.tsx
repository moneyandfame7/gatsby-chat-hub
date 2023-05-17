/* lib  */
import React from 'react'

import { Animated } from '@ui/animation'
import { ArrowBack } from '@ui/icons'
import { IconButton } from '@ui/shared/buttons'

import { ICON_ROTATE_ANIMATION } from './menu'

interface LeftGoBackProps {
	onClick: () => void
}

export const LeftGoBack: React.FC<LeftGoBackProps> = ({ onClick }) => {
	return (
		<Animated variants={ICON_ROTATE_ANIMATION} initial='hidden' animate='open' exit='hidden'>
			<IconButton onClick={onClick} icon={<ArrowBack />} aria-label='Return to conversations list' />
		</Animated>
	)
}
