import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const MarkReadIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon stroke='none' fill='text.secondary' {...props}>
			<>
				<path fill='none' d='M0 0h24v24H0z'></path>
				<path d='M12 18H6l-4 4V4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v7h-2V4H4v12h8v2zm11-3.66l-1.41-1.41-4.24 4.24-2.12-2.12-1.41 1.41L17.34 20 23 14.34z'></path>
			</>
		</BaseIcon>
	)
}
