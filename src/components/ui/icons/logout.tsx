import React from 'react'
import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const LogoutIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <path d="M16 17l5-5-5-5" />
        <path d="M21 12H9" />
      </>
    </BaseIcon>
  )
}
