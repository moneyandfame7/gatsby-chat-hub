import React, { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { gql } from '@apollo/client'

import { Divider, Grid, Stack, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

import { Button } from '@components/button'
import { authorizationStore } from '@store/root'
import Paper from './paper'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { userFragment } from '@store/authorization'
import { client } from '@utils/apollo/clients'

const protectedQuery = gql`
  query Me {
    me {
      ...AllUserFields
    }
  }
  ${userFragment}
`

const Body: FC = () => {
  const { currentUser } = authorizationStore
  const [showPaper, setShowPaper] = useState(false)

  const login = useGoogleLogin({
    onSuccess: async creds => {
      const { success } = await authorizationStore.login(creds)
      if (success) {
        setShowPaper(true)
      }
    }
  })
  const handleGetStart = async () => {
    if (currentUser) {
      setShowPaper(true)
    } else {
      /* Login, then edit template */
      login()
    }
  }

  const handleClosePaper = () => {
    setShowPaper(false)
  }

  const getProtectedRoute = async () => {
    try {
      const { data, errors } = await client.query({
        query: protectedQuery,
        fetchPolicy: 'no-cache'
      })
      console.log(data, errors)
    } catch (e) {}
  }

  return (
    <>
      <Grid
        item
        xs={12}
        md={7}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        gap={3}
        sx={{
          alignItems: {
            xs: 'center',
            md: 'flex-start'
          }
        }}
      >
        <Typography
          fontWeight={600}
          lineHeight="60px"
          color="#FFF"
          sx={{
            fontSize: {
              xs: 30,
              lg: 52
            },
            lineHeight: {
              xs: '34px',
              lg: '60px'
            },
            textAlign: {
              xs: 'center',
              md: 'left'
            }
          }}
        >
          Communicate without
          <br />
          restrictions
        </Typography>
        <Typography
          fontSize={24}
          lineHeight="26px"
          maxWidth={650}
          color="#FFF"
          sx={{
            fontSize: {
              xs: 18,
              lg: 24
            },
            textAlign: {
              xs: 'center',
              md: 'left'
            }
          }}
        >
          Meet new people from all over the world and discuss any topic in our online chat room. Join us and meet
          interesting people from all over the world!
        </Typography>
        <Stack direction="row" alignItems="center" gap={3}>
          <Button startIcon={<GoogleIcon />} onClick={handleGetStart}>
            Come on, let's talk
          </Button>
          <Button onClick={getProtectedRoute} variant="text" sx={{ color: '#fff' }}>
            Protected route
          </Button>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#FFF' }} />
          <Typography fontWeight={800} sx={{ fontSize: { xs: 16, md: 20 } }} color="#FFF">
            ChatHub
          </Typography>
        </Stack>
      </Grid>

      <Paper showPaper={showPaper} handleClosePaper={handleClosePaper} />
    </>
  )
}

export default observer(Body)
