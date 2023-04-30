import React, { FC, PropsWithChildren } from 'react'
import { Box, Grid } from '@mui/material'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        background:
          'radial-gradient(circle, rgba(25,103,210,1) 72%, rgba(27,115,232,1) 83%)',
        height: {
          xs: 'max-content',
          md: '100vh'
        },
        pt: 5,
        minHeight: '100vh'
      }}
    >
      <Grid
        container
        maxWidth="xl"
        sx={{
          display: 'flex',
          mx: 'auto',
          p: {
            xs: 2,
            md: 4,
            lg: 6
          },
          justifyContent: 'space-between'
        }}
      >
        {children}
      </Grid>
    </Box>
  )
}

export default Wrapper
