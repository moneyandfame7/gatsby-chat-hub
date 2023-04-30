import React, { FC } from 'react'
import { Box, TextField, TextFieldProps, Typography, styled } from '@mui/material'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'blue'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgb(0 0 0 / 23%)',
      transition: 'all 0.1s ease'
    },
    '&:hover fieldset': {
      borderColor: 'rgb(0 0 0 / 23%)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1B73E8'
    }
  }
})

export const Input: FC<TextFieldProps> = ({ children, ...props }) => {
  return (
    <Box maxWidth="max-content">
      <StyledTextField size="small" {...props} />
    </Box>
  )
}
