import React, { FC } from 'react'
import Lottie, { Options } from 'react-lottie'
import { Grid } from '@mui/material'

import animationData from '@animations/communicate.json'

const Animation: FC = () => {
  const animationOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData
  }
  return (
    <Grid item xs={12} md={5}>
      <Lottie
        options={animationOptions}
        width="100%"
        height="100%"
        isClickToPauseDisabled
      />
    </Grid>
  )
}
export default Animation
