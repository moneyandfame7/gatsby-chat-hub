import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const ArrowRightCircleIcon: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon {...props}>
			<>
				<circle cx='12' cy='12' r='10' />
				<path d='M12 16l4-4-4-4' />
				<path d='M8 12h8' />
			</>
		</BaseIcon>
	)
}
