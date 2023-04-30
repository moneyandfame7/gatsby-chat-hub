import React, { FC } from 'react'
import { Wrapper, pageHead } from '@components'

const SettingsPage: FC = () => {
  return (
    <Wrapper>
      <h1>SETTINGS</h1>
    </Wrapper>
  )
}

export default SettingsPage

export const Head = pageHead({ title: 'Settings' })
