import React from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const AnimationIcon2: React.FC<IconProps> = ({ ...props }) => {
	return (
		<BaseIcon {...props}>
			<path d='M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2' />
		</BaseIcon>
	)
}
