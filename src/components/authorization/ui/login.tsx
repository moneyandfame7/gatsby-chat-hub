import React, { FC } from 'react'

import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface LoginProps {
  googleLogin: () => void
}
export const Login: FC<LoginProps> = ({ googleLogin }) => {
  const { t } = useTranslation()
  return (
    <>
      <Button leftIcon={<FcGoogle />} onClick={() => googleLogin()} size="md">
        {t('authorization.login')}
      </Button>
    </>
  )
}
