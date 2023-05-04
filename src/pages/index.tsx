import React, { type FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Box } from '@chakra-ui/react'

/* services */
import { useStores } from '@store/provider'

/* ui */
import { pageHead, Authorization, Chat } from '@components'

const Root: React.FC = () => {
  const { userStore, authorizationStore } = useStores()

  return <Box>{userStore.user?.username && authorizationStore.isLoggedIn ? <Chat /> : <Authorization />}</Box>
}

export default observer(Root)

export const Head = pageHead({ title: 'Home' })
