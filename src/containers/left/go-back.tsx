/* lib  */
import React from 'react'

import { Animation } from '@ui/animation'
import { ArrowBack } from '@ui/icons'
import { IconButton } from '@ui/shared/buttons'

interface LeftGoBackProps {
	onClick: () => void
}

export const LeftGoBack: React.FC<LeftGoBackProps> = ({ onClick }) => {
	return (
		<Animation.Rotate>
			<IconButton onClick={onClick} icon={<ArrowBack />} aria-label='Return to conversations list' />
		</Animation.Rotate>
	)
}
