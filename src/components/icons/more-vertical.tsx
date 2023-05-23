import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const MoreVerticalIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon>
			<>
				<circle cx='12' cy='12' r='1' fill='currentColor' />
				<circle cx='12' cy='5' r='1' fill='currentColor' />
				<circle cx='12' cy='19' r='1' fill='currentColor' />
			</>
		</BaseIcon>
	)
}
