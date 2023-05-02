import React, { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Avatar, Grid, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import EditIcon from '@mui/icons-material/Edit'

import { Input } from '@components/inputs'
import { Button } from '@components/button'
import { authorizationStore } from '@store/root'
import { navigate } from 'gatsby'

const Form: FC = () => {
  const { currentUser, logout } = authorizationStore

  return (
    <>
      <Avatar
        src={currentUser?.photo}
        sx={{ width: 50, height: 50, mb: 3 }}
        imgProps={{
          referrerPolicy: 'no-referrer'
        }}
      />
      <Grid
        container
        sx={{
          maxWidth: {
            xs: '100%',
            lg: '500px'
          }
        }}
        columnSpacing={2}
        position="relative"
      >
        <Grid item xs={12} md={4}>
          <Typography color="text.secondary" fontSize="13px" sx={{ mb: 1 }}>
            Display name
          </Typography>

          <Typography height={40}>{currentUser?.displayName}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography color="text.secondary" fontSize="13px" sx={{ mb: 1 }}>
            Email
          </Typography>

          <Typography height={40}>{currentUser?.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="text.secondary" fontSize="13px" sx={{ mb: 1 }}>
            Username
          </Typography>

          <Typography height={40}>{currentUser?.username}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Form)
