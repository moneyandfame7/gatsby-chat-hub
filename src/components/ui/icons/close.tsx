/* lib  */
import React from 'react'
import { IconProps } from '@chakra-ui/react'

/* ui  */
import { BaseIcon } from './base'

export const CloseIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </>
    </BaseIcon>
  )
}
