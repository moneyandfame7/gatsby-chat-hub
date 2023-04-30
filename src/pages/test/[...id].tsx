import React from 'react'
import { HeadFC, PageProps } from 'gatsby'

const TestPage: React.FC<PageProps> = ({params}) => {
  console.log(params)
  return  (
    <main>
      <h1>Aboba</h1>
    </main>
  )
}
export default TestPage

export const Head: HeadFC = () => <title>Test page</title>