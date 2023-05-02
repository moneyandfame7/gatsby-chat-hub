import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { observer } from 'mobx-react-lite'

import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'

import { authorizationStore } from '@store/root'
import { Button } from '@components/button'

import Form from './form'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />
})

interface PaperProps {
  showPaper: boolean
  handleClosePaper: () => void
}
const Paper: FC<PaperProps> = ({ showPaper, handleClosePaper }) => {
  const { logout } = authorizationStore
  const submit = () => {
    navigate('/chat')
  }

  const exit = async () => {
    await logout()
    handleClosePaper()
  }
  return (
    <Dialog
      open={showPaper}
      fullScreen
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          p: {
            xs: 1,
            md: 4,
            lg: 5
          }
        }
      }}
    >
      <DialogTitle display="flex" alignItems="center" gap={5} fontWeight={600}>
        <IconButton
          aria-label="close"
          onClick={handleClosePaper}
          sx={{
            color: theme => theme.palette.grey[600]
          }}
        >
          <CloseIcon />
        </IconButton>
        Complete the authorization
      </DialogTitle>
      <DialogContent>
        <Form />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={exit} sx={{ mr: 2 }}>
          Exit
        </Button>
        <Button onClick={submit}>Complete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default observer(Paper)
