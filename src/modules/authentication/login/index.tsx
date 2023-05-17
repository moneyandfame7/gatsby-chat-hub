import React, { FC } from 'react'

import { Button, Text } from '@chakra-ui/react'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'

import { useLogin } from './hook'

export const GoogleLogin: FC = () => {
	const { login, loading } = useLogin()

	return (
		<>
			<Text fontSize='xl' fontWeight={500}>
				Log in to Chathub by Google
			</Text>
			<Button isLoading={loading} colorScheme='gray' leftIcon={<FcGoogle />} onClick={() => login()} size='md'>
				Continue
			</Button>
		</>
	)
}
