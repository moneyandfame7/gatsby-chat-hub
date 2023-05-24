import React, { FC, useEffect } from 'react'

import { navigate } from 'gatsby'

import { Center, Stack } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { observer } from 'mobx-react-lite'

import { CreateUsername, GoogleLogin } from '@modules/authentication'

import { Environment } from '@services/environment'
import { useStores } from '@services/store/'

import { pageHead } from '@components/page-head'

import { ROUTES } from '@utils/constants'

const Login: FC = observer(() => {
	const { authorizationStore, userStore } = useStores()
	if (!authorizationStore || !userStore) {
		return null
	}
	useEffect(() => {
		if (authorizationStore.isLoggedIn && userStore.user?.username) {
			navigate(ROUTES.chat())
		}
	}, [authorizationStore.isLoggedIn, userStore.user?.username])

	return (
		<GoogleOAuthProvider clientId={Environment.googleId}>
			<Center height='100vh' bg='white'>
				<Stack spacing={4} align='center'>
					{authorizationStore.isLoggedIn && !userStore.user?.username ? <CreateUsername /> : <GoogleLogin />}
				</Stack>
			</Center>
		</GoogleOAuthProvider>
	)
})

export default Login

export const Head = pageHead({ title: 'Login' })
