import React, { FC } from 'react'

import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const EyeIcon: FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<>
				<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
				<circle cx='12' cy='12' r='3' />
			</>
		</BaseIcon>
	)
}
