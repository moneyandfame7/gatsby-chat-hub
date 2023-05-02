import React, { FC } from 'react'
import { navigate } from 'gatsby'

import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { alpha, styled, useTheme } from '@mui/material'

type ButtonColor = 'primary' | 'white'

interface ButtonProps extends LoadingButtonProps {
  textColor?: string /* textcolor || string */
  backgroundColor?: ButtonColor /* ButtonColor || string */
}
const handleButtonColor = ({ textColor, backgroundColor }: ButtonProps) => {
  const theme = useTheme()
  switch (backgroundColor) {
    case 'primary': {
      const color = theme.palette.primary.main
      return {
        backgroundColor: color,
        color: textColor || theme.palette.getContrastText(color),
        '&:hover': {
          backgroundColor: alpha(color, 0.85)
        }
      }
    }

    case 'white': {
      const color = '#fff'
      return {
        backgroundColor: color,
        color: textColor || theme.palette.getContrastText(color),
        '&:hover': {
          backgroundColor: alpha(color, 0.85)
        }
      }
    }
  }
}
const StyledButton = styled(LoadingButton)<ButtonProps>(({ theme, textColor, backgroundColor = 'primary' }) => ({
  ...handleButtonColor({ textColor, backgroundColor }),
  '&.MuiButton-sizeLarge': {
    padding: '15px 40px',
    fontSize: '20px',
    fontWeight: 800
  },
  fontWeight: 600
}))

export const Button: FC<ButtonProps> = ({ ...props }) => {
  return <StyledButton {...props} />
}
