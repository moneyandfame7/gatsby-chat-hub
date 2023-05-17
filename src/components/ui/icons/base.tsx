import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const BaseIcon: React.FC<IconProps> = ({ children, ...props }) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fontSize={22}
      fill={props.color || 'none'}
      color="text.secondary"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      {...props}
    >
      {children}
    </Icon>
  )
}
