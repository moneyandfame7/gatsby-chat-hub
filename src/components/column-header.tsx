import React from 'react'

import { HStack, StackProps } from '@chakra-ui/react'

export const ColumnHeader: React.FC<StackProps> = ({ children, ...props }) => {
	return (
		<HStack bg='white' justify='space-between' px={2} height='60px' {...props}>
			{children}
		</HStack>
	)
}
