import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/features/authSlice.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
