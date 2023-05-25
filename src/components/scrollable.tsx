import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

export interface ScrollableProps extends BoxProps {
	height: string
	width: string
	children: React.ReactNode
}

export const Scrollable: React.FC<ScrollableProps> = ({ children, ...props }) => {
	return (
		<Box overflowY='auto' {...props}>
			{children}
		</Box>
	)
}
