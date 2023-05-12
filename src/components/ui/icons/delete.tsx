import React from 'react'
import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const DeleteIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <>
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </>
    </BaseIcon>
  )
}
