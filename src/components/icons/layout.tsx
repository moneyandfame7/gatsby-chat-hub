import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const LayoutIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon {...props}>
			<>
				<rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
				<path d='M3 9h18' />
				<path d='M9 21V9' />
			</>
		</BaseIcon>
	)
}
