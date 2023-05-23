import React from 'react'

import { ArrowRightIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

import { Animation } from '@components/animation'

interface CreateConversationGoNextProps {
	onClick: () => void
}

export const CreateConversationGoNext: React.FC<CreateConversationGoNextProps> = ({ onClick }) => {
	return (
		<Animation.Scale>
			<IconButton
				onClick={onClick}
				bg='primary'
				_hover={{
					bg: 'primary',
				}}
				icon={<ArrowRightIcon color='#fff' />}
				aria-label='Go next step'
			/>
		</Animation.Scale>
	)
}
