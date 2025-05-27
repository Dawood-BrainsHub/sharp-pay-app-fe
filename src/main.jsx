import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer autoClose={1000}/>
    </ThemeProvider>
    </Provider>
  </StrictMode>
);
