import React from 'react'
import { IconProps } from '@chakra-ui/react'

import { BaseIcon } from './base'

export const ArrowBack: React.FC<IconProps> = ({ ...props }) => {
  return (
    <BaseIcon {...props}>
      <>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </>
    </BaseIcon>
  )
}
