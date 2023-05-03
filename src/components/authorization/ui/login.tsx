import React, { FC } from 'react'

import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'

interface LoginProps {
  googleLogin: () => void
}
export const Login: FC<LoginProps> = ({ googleLogin }) => {
  return (
    <>
      <Text fontSize="3xl" fontWeight={600}>
        ChatHub
      </Text>
      <Button leftIcon={<FcGoogle />} onClick={() => googleLogin()} size="md">
        Continue with google
      </Button>
    </>
  )
}
