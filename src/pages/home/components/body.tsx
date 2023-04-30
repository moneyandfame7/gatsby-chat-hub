import React, { FC, useState } from 'react'

import { Divider, Grid, Stack, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

import { useAppDispatch, useAppSelector } from '@store'

import { firebaseAuthorization } from '@services/authorization'
import { selectCurrentUser, selectIsFinishedAuth, setAuthStatus, setUser } from '@store/authorization'

import { Button } from '@components/button'

import { Paper } from './paper'

const Body: FC = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)
  const isFinishedAuth = useAppSelector(selectIsFinishedAuth)
  const [showPaper, setShowPaper] = useState(false)

  const handleGetStart = async () => {
    if (currentUser && isFinishedAuth) {
      console.log('ALREADY PARIRYRIPARIRAM')
    } else if (currentUser && !isFinishedAuth) {
      setShowPaper(true)
    } else {
      /* перевіряти, чи є тут юзер, якщо є - переадресація на іншу сторінку */
      const user = await firebaseAuthorization.googleLogin()
      if (user) {
        dispatch(setUser(user))
        setTimeout(() => {
          setShowPaper(true)
        }, 400)
      }
    }
  }

  const handleClosePaper = () => {
    setShowPaper(false)
    dispatch(setAuthStatus(false))
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
          <Button startIcon={<GoogleIcon />} bgcolor="white" textcolor="#1B68D2" autoSize onClick={handleGetStart}>
            Come on, let's talk
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

export default Body
