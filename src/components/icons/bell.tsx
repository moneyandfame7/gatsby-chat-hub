import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const BellIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon {...props}>
			<>
				<path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9' />
				<path d='M13.73 21a2 2 0 01-3.46 0' />
			</>
		</BaseIcon>
	)
}
