import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Box } from '@chakra-ui/react'
/* services */
import { userStore } from '@store/root'

/* ui */
import { pageHead, Authorization, Chat } from '@components'

const Root: React.FC = () => {
  const { currentUser, isAuthorized } = userStore
  return <Box>{currentUser?.username && isAuthorized ? <Chat /> : <Authorization />}</Box>
}

export default observer(Root)

export const Head = pageHead({ title: 'Home' })
