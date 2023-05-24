import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const MarkUnreadIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon stroke='none' fill='text.secondary' {...props}>
			<>
				<path fill='none' d='M0 0h24v24H0z'></path>
				<path d='M20 16H4V4h10.1a5 5 0 010-2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V6.98c-.58.44-1.26.77-2 .92V16z'></path>
				<circle cx='19' cy='3' r='3'></circle>
				<path d='M6 12h8v2H6zM6 9h12v2H6zM6 8h12v-.1A5.013 5.013 0 0115.03 6H6v2z'></path>
			</>
		</BaseIcon>
	)
}
