import * as React from 'react'
import { Link, PageProps } from 'gatsby'
import { pageHead } from '@components'

const NotFoundPage: React.FC<PageProps> = () => {
  return <main>404</main>
}

export default NotFoundPage

export const Head = pageHead({
  title: '404 ( page not found )',
  postfix: false
})
