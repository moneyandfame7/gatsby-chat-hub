import React, { FC } from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'
import { Form } from './form'
import { Button } from '@components/button'

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
export const Paper: FC<PaperProps> = ({ showPaper, handleClosePaper }) => {
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
        {/* @TODO: додати тут кнопку виходу з аккаунту, видалення з localstorage ключа  */}
        Complete the authorization
        <Button variant="outlined">LOLOLASD</Button>
        <Button>Loool</Button>
        <Button variant="text">Loool</Button>
      </DialogTitle>
      <DialogContent>
        <Form />
      </DialogContent>
    </Dialog>
  )
}
