import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { Button, Typography } from '@mui/material'

// import { counterStore } from '@store/root'
import { Wrapper, pageHead } from '@components'

const AiChatPage: FC = () => {
  return (
    <Wrapper>
      {/* <h1>{counterStore.value}</h1>
      <Button onClick={counterStore.increment}>Increment</Button>
      <Button variant="contained">Decrement</Button>
      <Button variant="outlined" color="success" onClick={counterStore.fetchUsers}>
        Fetch users
      </Button>
      <Typography variant="h4">{counterStore.state}</Typography>
      <Button onClick={counterStore.googleLogin}>Google login!</Button> */}
    </Wrapper>
  )
}

export default observer(AiChatPage)

export const Head = pageHead({ title: 'AI Chat' })
