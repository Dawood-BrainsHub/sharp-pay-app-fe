import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#02C1C0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#eeeeee',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: `'Titillium Web', sans-serif`,
    h1: { fontSize: '2.8rem', fontWeight: 700 },
    h2: { fontSize: '2.2rem', fontWeight: 600 },
    h3: { fontSize: '1.8rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        fontWeight: 600,
        boxShadow:"none",
        transition: 'all 0.3s ease',
      },
      contained: {
        backgroundColor: '#02C1C0',
        color: '#fff',
        border: '1px solid #02C1C0',
        '&:hover': {
          backgroundColor: '#fff',
          color: '#02C1C0',
          boxShadow:"none",
        },
      },
      outlined: {
        border: '1px solid #02C1C0',
        color: '#02C1C0',
        '&:hover': {
          backgroundColor: '#02C1C0',
          color: '#fff',
          boxShadow:"none",
        },
      },
      text: {
        color: '#02C1C0',
      },
    },
  },
}

});

export default theme;