import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(',')
  },
  palette: {
    primary: {
      main: '#1B73E8'
    }
  }
})

export default theme
