/* lib  */
import React from 'react'

import { Animation } from '@components/animation'
import { ArrowBack } from '@components/icons'
import { IconButton } from '@components/shared/buttons'

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
