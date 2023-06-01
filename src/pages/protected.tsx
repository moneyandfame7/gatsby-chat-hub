import React, { useEffect, useRef, useState } from 'react'

import { PageProps } from 'gatsby'

import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Box, Button, Text, Textarea } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import ResizeTextarea from 'react-textarea-autosize'

import { ProtectedRoute } from '@modules/authentication'

import { getAccessTokenPromise } from '@services/apollo/helpers'
import { useStickyHeightScroll } from '@services/hooks'
import { useStores } from '@services/store'

import { pageHead } from '@components/page-head'

import { Participant } from '@utils/graphql/conversations'
import '@utils/test.css'

const TEST_QUERY = gql`
	query GetProtected {
		protected {
			id
			username
		}
	}
`

const ProtectedPage: React.FC<PageProps> = observer(() => {
	const scrollRef = useStickyHeightScroll()

	return (
		<>
			<div className='conversation'>
				<header className='header' />
				<div className='messages-container' ref={scrollRef}>
					<div className='scroll' ref={scrollRef}>
						{Array.from({ length: 50 }).map((_, i: number) => (
							<p key={i}>{i}</p>
						))}
					</div>
				</div>
			</div>
		</>

		// </ProtectedRoute>
	)
})

export default ProtectedPage

export const Head = pageHead({ title: 'Protected page' })
