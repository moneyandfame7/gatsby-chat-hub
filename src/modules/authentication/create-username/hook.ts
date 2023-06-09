/* lib  */
import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

/* services */
import { useStores } from '@services/store'
import type { AuthResponse } from '@services/store/authorization/types'
import { CREATE_USERNAME_MUTATION } from '@services/store/user/graphql'
import type { CreateUsernameInput } from '@services/store/user/type'

export const useCreateUsername = () => {
	const { authorizationStore } = useStores()
	const [username, setUsername] = useState('')
	const [inputError, setInputError] = useState('')
	const [createUsername, { loading }] = useMutation<AuthResponse<'createUsername'>, CreateUsernameInput>(
		CREATE_USERNAME_MUTATION
	)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setUsername(value)
	}

	const validateUsername = (username: string) => {
		if (username.length < 3) {
			setInputError('User name must be at least 3 characters')
			return false
		}
		if (username.length > 30) {
			setInputError('User name cannot be longer 30 characters')
			return false
		}
		setInputError('')
		return true
	}

	const onCreateUsername = async () => {
		if (!inputError) {
			try {
				const data = createUsername({ variables: { username } })
				toast.promise(
					data,
					{
						loading: 'Loading...',
						success: ({ data }) => {
							if (data) {
								authorizationStore.updateCredentials(data?.createUsername)
							}
							return `Username "${data?.createUsername.user.username}" created successfully 🚀`
						},
						error: (err) => err?.message || ' Erorr when creating username',
					},

					{
						id: 'createUsername',
						style: {
							fontWeight: 600,
						},
					}
				)
			} catch (e) {
				// eslint-disable-next-line no-console
				console.warn(e)
			}
		}
	}
	useEffect(() => {
		validateUsername(username)
	}, [username])

	return {
		onCreateUsername,
		handleChange,
		inputError,
		loading,
	}
}
