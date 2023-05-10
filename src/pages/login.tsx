/* lib */
import React, { FC, useEffect } from 'react'
import { navigate } from 'gatsby'
import { observer } from 'mobx-react-lite'
import { Center, Stack } from '@chakra-ui/react'

/* services */
import { useStores } from '@store/provider'
import { ROUTES } from '@utils/constants'
import { pageHead } from '@components'

/* ui */
import { CreateUsername, GoogleLogin } from '@modules/authorization'

const Login: FC = observer(() => {
  const { authorizationStore, userStore } = useStores()

  useEffect(() => {
    if (authorizationStore.isLoggedIn && userStore.user?.username) {
      navigate(ROUTES.chat())
    }
  }, [authorizationStore.isLoggedIn, userStore.user?.username])

  return (
    <Center height="100vh">
      <Stack spacing={4} align="center" minW="370px">
        {authorizationStore.isLoggedIn && !userStore.user?.username ? <CreateUsername /> : <GoogleLogin />}
      </Stack>
    </Center>
  )
})

export default Login

export const Head = pageHead({ title: 'Login' })
