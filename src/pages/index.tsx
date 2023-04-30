import * as React from 'react'

import { pageHead } from '@components'
import { HomeAnimation, HomeBody, HomeWrapper } from '@pages/home/components'

const HomePage: React.FC = () => {
  return (
    <HomeWrapper>
      <HomeBody />
      <HomeAnimation />
    </HomeWrapper>
  )
}

export default HomePage

export const Head = pageHead({ title: 'Home' })
