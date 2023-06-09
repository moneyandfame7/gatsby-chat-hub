import React from 'react'
import { BaseIcon } from './base'
import { IconProps } from '@chakra-ui/react'

export const ContactsIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </>
    </BaseIcon>
  )
}
