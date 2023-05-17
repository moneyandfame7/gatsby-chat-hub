import React from 'react'
import { observer } from 'mobx-react-lite'
import LoremIpsum from 'react-lorem-ipsum'

import { Animated } from '@components'
import { FADE_ANIMATION } from '../main'
import { LeftColumnUI } from '../settings'

interface LeftSearchProps extends LeftColumnUI {}
export const LeftSearch: React.FC<LeftSearchProps> = observer(({ leftColumnUiStore }) => {
  return (
    <Animated
      variants={FADE_ANIMATION}
      pos="absolute"
      width="100%"
      padding="inherit"
      top={0}
      left={0}
      initial="hidden"
      bg="pink"
      animate="open"
      exit="hidden"
      height="100%"
    >
      <LoremIpsum p={2} />
    </Animated>
  )
})
