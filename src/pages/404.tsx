import * as React from 'react'

import { PageProps } from 'gatsby'

import { pageHead } from '@components/page-head'

const NotFoundPage: React.FC<PageProps> = () => {
	return <main>404</main>
}

export default NotFoundPage

export const Head = pageHead({
	title: '404 ( page not found )',
	postfix: false,
})
