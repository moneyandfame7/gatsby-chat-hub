import React from 'react'

import { IconButton as ChakraIcButton, IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react'

interface IconButtonProps extends ChakraIconButtonProps {
  icon: React.ReactElement
  onClick: () => void
}
export const IconButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <ChakraIcButton
      _hover={{
        bg: 'blackAlpha.50'
      }}
      size="md"
      color="gray.400"
      bg="transparent"
      borderRadius="50%"
      {...props}
    />
  )
}
