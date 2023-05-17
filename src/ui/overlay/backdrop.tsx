/* lib  */
import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export const Backdrop: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <Box
      zIndex={1}
      data-component-name="Backdrop"
      pos="fixed"
      left="0"
      top="0"
      bottom="0"
      right="0"
      w="100vw"
      height="100vh"
      {...props}
    />
  )
}
