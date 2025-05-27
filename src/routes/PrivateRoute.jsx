import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from "../components/Loader";

const PrivateRoute = () => {
  const { isAuthenticated, loading, isCheckAuth } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!isAuthenticated && !isCheckAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
