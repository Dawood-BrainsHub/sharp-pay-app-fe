import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Payments from "../pages/Dashboard/Payments";
import Recipients from "../pages/Dashboard/Recipients";
import Banks from "../pages/Dashboard/Banks";
import Settings from "../pages/Dashboard/Settings";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          {/* Dashboard home page */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* Other routes with same layout */}
          <Route element={<Layout />}>
            <Route path="/payments" element={<Payments />} />
            <Route path="/recipients" element={<Recipients />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
