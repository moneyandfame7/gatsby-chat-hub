import React, { FC } from 'react'
import { navigate } from 'gatsby'

import { LoadingButton, LoadingButtonProps } from '@mui/lab'

interface ButtonProps extends LoadingButtonProps {
  to?: string
}

export const Button: FC<ButtonProps> = ({ to, ...props }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (to) {
      navigate(to)
    }
    if (props.onClick) {
      props.onClick(e)
    }
  }
  return <LoadingButton variant="contained" {...props} onClick={onClick} />
}
