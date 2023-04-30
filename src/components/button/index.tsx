import React, { FC } from 'react'
import { navigate } from 'gatsby'

import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { darken, styled, useMediaQuery, useTheme } from '@mui/material'

type ButtonColor = 'primary' | 'white'

interface ColorStyles {
  backgroundColor: string
  textcolor?: string
}

const getColorStyles = ({ backgroundColor, textcolor }: ColorStyles) => {
  const theme = useTheme()
  return {
    backgroundColor,
    borderColor: backgroundColor,
    '&: hover': {
      backgroundColor: darken(backgroundColor, 0.03),
      borderColor: darken(backgroundColor, 0.03)
    },
    '&: active': {
      backgroundColor: darken(backgroundColor, 0.03),
      borderColor: darken(backgroundColor, 0.03)
    },
    color: textcolor || theme.palette.getContrastText(backgroundColor)
  }
}
const useButtonBackground = ({ bgcolor, textcolor }: Pick<ButtonProps, 'bgcolor' | 'textcolor'>) => {
  const theme = useTheme()
  const primaryBackground = theme.palette.primary.main
  switch (bgcolor) {
    case 'primary': {
      return getColorStyles({ backgroundColor: primaryBackground })
    }
    case 'white': {
      const backgroundColor = '#fff'

      return getColorStyles({
        backgroundColor,
        textcolor: textcolor || theme.palette.getContrastText(bgcolor)
      })
    }
    default: {
      return getColorStyles({ backgroundColor: primaryBackground })
    }
  }
}
interface ButtonProps extends LoadingButtonProps {
  to?: string
  bgcolor?: ButtonColor
  textcolor?: string
  autoSize?: boolean
}

const StyledButton = styled(LoadingButton)<ButtonProps>(({ bgcolor, textcolor, to, theme }) => ({
  // fontSize: 16,

  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  textTransform: 'initial',
  fontWeight: 600,
  borderRadius: 8,
  ...useButtonBackground({ bgcolor, textcolor }),
  // minWidth: '150px',
  '&.MuiButton-sizeLarge': {
    padding: '20px 52px',
    lineHeight: '16px',
    fontSize: 20
  }
}))

export const Button: FC<ButtonProps> = ({ to, children, bgcolor, textcolor, autoSize = false, onClick, ...props }) => {
  const autosizedButton = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const isDesktop = useMediaQuery('(min-width:900px)')

    switch (true) {
      case isMobile:
        return 'small'
      case isDesktop:
        return 'large'
      default:
        return 'medium'
    }
  }
  const baseProps = {
    bgcolor,
    textcolor,
    to,
    role: to ? 'link' : 'button',
    variant: 'contained',
    disableElevation: true,
    size: autoSize ? autosizedButton() : undefined,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        onClick(e)
      }
      if (to) {
        navigate(to)
      }
    }
  } as ButtonProps
  return (
    <StyledButton {...baseProps} {...props}>
      {children}
    </StyledButton>
  )
}
