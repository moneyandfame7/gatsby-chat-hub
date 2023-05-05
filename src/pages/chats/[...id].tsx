import { PageProps } from 'gatsby'
import React, { FC } from 'react'

const TestPage: FC<PageProps> = props => {
  console.log(props)
  return <>Lol</>
}

export default TestPage
