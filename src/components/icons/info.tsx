import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const InfoIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon {...props}>
			<>
				<circle cx='12' cy='12' r='10' fill='var(--geist-fill)' />
				<path d='M12 16v-4' stroke='var(--geist-stroke)' />
				<path d='M12 8h.01' stroke='var(--geist-stroke)' />
			</>
		</BaseIcon>
	)
}
