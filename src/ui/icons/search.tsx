import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const SearchIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon {...props}>
			<path d='M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z' />
			<path d='M16 16l4.5 4.5' />
		</BaseIcon>
	)
}
