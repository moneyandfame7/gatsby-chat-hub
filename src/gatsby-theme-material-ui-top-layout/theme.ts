import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    button: {
      textTransform: 'initial',
      fontWeight: 600,
      fontSize: 16
    }
  },
  palette: {
    primary: {
      main: '#1B73E8'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
})

export default theme
