import React, { useEffect } from 'react'

import { PageProps } from 'gatsby'

import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Box, Button, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { ProtectedRoute } from '@modules/authentication'

import { getAccessTokenPromise } from '@services/apollo/helpers'
import { useStores } from '@services/store'

import { pageHead } from '@components/page-head'

import { Participant } from '@utils/graphql/conversations'

const TEST_QUERY = gql`
	query GetProtected {
		protected {
			id
			username
		}
	}
`

const ProtectedPage: React.FC<PageProps> = observer(() => {
	const { authorizationStore } = useStores()

	const [get] = useLazyQuery<Participant>(TEST_QUERY, { fetchPolicy: 'network-only' })

	const handleGet = async () => {
		const res = await get()

		// console.log(res.data, res.error, authorizationStore.isValidAccessToken)
	}

	// useEffect(()=>{},[data,error])
	return (
		// <ProtectedRoute>
		<>
			<Box bg='red' minW='50px' minH='50vh'>
				<Text color='#fff'>lorem ipsum dorem</Text>
				<Button onClick={authorizationStore.logout}>Logout</Button>
				<Button onClick={handleGet}>Get protected route</Button>
				<Button
					onClick={async () => {
						await getAccessTokenPromise()
					}}
				>
					Refresh
				</Button>
			</Box>

			{/* {data ? <Text>{data.id}</Text> : <Text color='red'>{error?.message}</Text>} */}
		</>

		// </ProtectedRoute>
	)
})

export default ProtectedPage

export const Head = pageHead({ title: 'Protected page' })
