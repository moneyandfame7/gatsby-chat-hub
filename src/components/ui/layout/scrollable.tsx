import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

/**
 *
 * @TODO : переробити анімацію на framer motion?
 */

export interface ScrollableProps extends BoxProps {
  height: string
  width: string
  children: React.ReactNode
}

export const Scrollable: React.FC<ScrollableProps> = ({ children, ...props }) => {
  return (
    <Box overflowY="scroll" {...props}>
      {children}
    </Box>
  )
}
