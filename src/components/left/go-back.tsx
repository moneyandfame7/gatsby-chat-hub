/* lib  */
import React from 'react'

/* ui  */
import { ArrowBack, IconButton } from '@components/ui'
import { ICON_ROTATE_ANIMATION } from './menu'
import { Animated } from '..'

interface LeftGoBackProps {
  onClick: () => void
}

export const LeftGoBack: React.FC<LeftGoBackProps> = ({ onClick }) => {
  return (
    <Animated variants={ICON_ROTATE_ANIMATION} initial="hidden" animate="open" exit="hidden">
      <IconButton onClick={onClick} icon={<ArrowBack />} aria-label="Return to conversations list" />
    </Animated>
  )
}
