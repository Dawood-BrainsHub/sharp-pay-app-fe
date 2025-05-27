import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from "../components/Loader";

const PublicRoute = () => {
  const { isAuthenticated, loading, isCheckAuth } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (isAuthenticated && isCheckAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
