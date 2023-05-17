import React from 'react'
import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const MenuIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <>
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      </>
    </BaseIcon>
  )
}
