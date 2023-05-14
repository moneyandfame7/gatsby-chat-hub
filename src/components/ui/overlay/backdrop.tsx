/* lib  */
import React from 'react'
import { Box, BoxProps, Portal } from '@chakra-ui/react'

export const Backdrop: React.FC<BoxProps> = ({ ...props }) => {
  return <Box pos="fixed" left="0" top="0" bottom="0" right="0" w="100vw" height="100vh" {...props} />
}
