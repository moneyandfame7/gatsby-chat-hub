import React from 'react'
import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const NewChatIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </BaseIcon>
  )
}
