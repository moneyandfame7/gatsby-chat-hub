import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { Center, Stack } from '@chakra-ui/react'

/* services */
import { useAuthorization } from './hook'

/* ui */
import { CreateUsername } from './ui/create-username'
import { Login } from './ui/login'

export const Authorization: FC = observer(() => {
  const { isLoggedIn, handleChange, inputError, submit, googleLogin } = useAuthorization()

  return (
    <Center height="100vh">
      <Stack spacing={4} align="center" minW="370px">
        {isLoggedIn ? (
          <CreateUsername inputError={inputError} submit={submit} handleChange={handleChange} />
        ) : (
          <Login googleLogin={googleLogin} />
        )}
      </Stack>
    </Center>
  )
})
