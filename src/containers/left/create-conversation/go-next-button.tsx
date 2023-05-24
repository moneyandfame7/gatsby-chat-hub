import React from 'react'

import { Animation } from '@components/animation'
import { ArrowRightCircleIcon } from '@components/icons'
import { IconButton } from '@components/shared/buttons'

interface CreateConversationGoNextProps {
	onClick: () => void
}

export const CreateConversationGoNext: React.FC<CreateConversationGoNextProps> = ({ onClick }) => {
	return (
		<Animation.Scale>
			<IconButton onClick={onClick} icon={<ArrowRightCircleIcon />} aria-label='Go next step' />
		</Animation.Scale>
	)
}
