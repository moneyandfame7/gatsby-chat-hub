import React from 'react'

import { IconButton as ChakraIcButton, IconButtonProps as ChakraIconButtonProps, forwardRef } from '@chakra-ui/react'

interface IconButtonProps extends ChakraIconButtonProps {
	icon: React.ReactElement
	onClick: () => void
}
export const IconButton: React.FC<IconButtonProps> = forwardRef<ChakraIconButtonProps, 'button'>((props, ref) => {
	return (
		<ChakraIcButton
			_hover={{
				bg: 'blackAlpha.50',
			}}
			ref={ref}
			size='md'
			color='gray.400'
			bg='transparent'
			borderRadius='50%'
			{...props}
		/>
	)
})
