/* lib */
import React, { FC } from 'react'
import { Button } from '@chakra-ui/react'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'

/* services  */
import { useLogin } from './hook'

export const GoogleLogin: FC = () => {
  const { login, loading } = useLogin()

  return (
    <>
      <Button isLoading={loading} colorScheme="purple" leftIcon={<FcGoogle />} onClick={() => login()} size="md">
        Continue with Google
      </Button>
    </>
  )
}