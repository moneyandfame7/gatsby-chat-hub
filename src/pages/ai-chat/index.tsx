import React, { FC } from 'react'
import { Wrapper, pageHead } from '@components'

const AiChatPage: FC = () => {
  return (
    <Wrapper>
      <h1>AI CHAT PAGE</h1>
    </Wrapper>
  )
}

export default AiChatPage

export const Head = pageHead({ title: 'AI Chat' })
