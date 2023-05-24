import React, { FC } from 'react'

import { Button, Text } from '@chakra-ui/react'

import { GoogleIcon } from '@components/icons'

import { useLogin } from './hook'

export const GoogleLogin: FC = () => {
	const { login, loading } = useLogin()

	return (
		<>
			<Text fontSize='xl' fontWeight={500}>
				Log in to Chathub by Google
			</Text>
			<Button isLoading={loading} colorScheme='gray' leftIcon={<GoogleIcon />} onClick={() => login()} size='md'>
				Continue
			</Button>
		</>
	)
}
