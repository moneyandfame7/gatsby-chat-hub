import { useState } from 'react'

import { navigate } from 'gatsby'

import { useGoogleLogin } from '@react-oauth/google'

import { useStores } from '@services/store'

import { ROUTES } from '@utils/constants'

export const useLogin = () => {
	const [loading, setLoading] = useState(false)
	const { authorizationStore } = useStores()

	const login = useGoogleLogin({
		onSuccess: async (creds) => {
			setLoading(true)
			const { success } = await authorizationStore.login(creds)
			if (success) {
				setLoading(false)
				navigate(ROUTES.chat())
			}
		},
	})

	return {
		login,
		loading,
	}
}
