import React, { FC, useState } from 'react'
import { Avatar, Grid, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import EditIcon from '@mui/icons-material/Edit'

import { useAppDispatch, useAppSelector } from '@store'
import { selectCurrentUser, setAuthStatus } from '@store/authorization'

import { Input } from '@components/inputs'
import { Button } from '@components/button'

export const Form: FC = () => {
  const [formEnabled, setFormEnabled] = useState(false)
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const submitEdit = () => {
    try {
      /* query from db, if success - setAuthStatus - true */
      dispatch(setAuthStatus(true))
      setTimeout(() => {
        console.log('query from db>>>>>>')
      }, 2000)

      /* setShowPaper(false) */
    } catch (e) {}
  }
  const cancelEdit = () => {
    setFormEnabled(false)
  }
  return (
    <>
      <Avatar src={currentUser?.photo} sx={{ width: 50, height: 50, mb: 3 }} />
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
        {!formEnabled && (
          <Tooltip title="Edit template" arrow>
            <IconButton
              aria-label="edit"
              onClick={() => {
                setFormEnabled(true)
              }}
              sx={{
                color: theme => theme.palette.grey[600],
                position: 'absolute',
                right: 0
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Grid item xs={12} md={4}>
          <Typography color="text.secondary" fontSize="13px" sx={{ mb: 1 }}>
            Display name
          </Typography>
          {formEnabled ? (
            <Input name="displayName" defaultValue="Default value" fullWidth />
          ) : (
            <Typography height={40}>{currentUser?.displayName}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography color="text.secondary" fontSize="13px" sx={{ mb: 1 }}>
            Email
          </Typography>
          {formEnabled ? (
            <Input name="email" defaultValue="12341324@gmail.com" disabled />
          ) : (
            <Typography height={40}>{currentUser?.email}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography color="text.secondary" fontSize="13px" sx={{ mb: 1 }}>
            Username
          </Typography>
          {formEnabled ? (
            <Input
              name="username"
              defaultValue="moneyandfame"
              InputProps={{
                startAdornment: <InputAdornment position="start">@</InputAdornment>
              }}
            />
          ) : (
            <Typography height={40}>{currentUser?.username}</Typography>
          )}
        </Grid>
        {formEnabled && (
          <Grid item xs={12} display="flex" alignItems="center" justifyContent="flex-end" gap={3} sx={{ mt: 2 }}>
            <LoadingButton
              sx={{ textTransform: 'initial', color: 'text.secondary', fontWeight: 600 }}
              onClick={cancelEdit}
            >
              Cancel
            </LoadingButton>
            <Button onClick={submitEdit} loading>
              Submit
            </Button>
          </Grid>
        )}
        {!formEnabled && (
          <Button size="large" onClick={submitEdit}>
            Complete
          </Button>
        )}
      </Grid>
    </>
  )
}
