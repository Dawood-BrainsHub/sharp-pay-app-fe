import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import CustomRouterLink from "../../components/RouterLink";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/features/authSlice";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { encrypt } from "../../utils/crypto";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleSubmit, control, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        toast.success("Login Successfuly!");
      })
      .catch((err) => {
        toast.error(err.message || "Login Failed");
      });
  };

  const handleVerifyNow = () => {
    if (user && user.email) {
      const response = axios.post("/auth/resend-verify-email", {
        email: user.email,
      });
      toast.success("Verification Code Send Successfully!");
      setTimeout(() => {
        navigate(
        `/verify-email?token=${encodeURIComponent(encrypt(user.email))}`
      );
      }, 2000);
      
    } else {
      console.log("❌ No user email found");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: 500 }}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 500,
            mx: "auto",
            p: 4,
            border: "1px solid #D2CFCF",
            boxShadow: "0px 4px 32px 0px rgba(28, 68, 82, 0.13)",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h2" mb={4} sx={{ textAlign: "center" }}>
            🔐 Login App
          </Typography>
          {error && error.type == "login" && (
            <Alert severity="error" sx={{ mb: 2, alignItems: "center" }}>
              {error.message}
            </Alert>
          )}
          {error && error.type == "Verification Error" && (
            <Alert severity="error" sx={{ mb: 2, alignItems: "center" }}>
              {error.message}{" "}
              <Button variant="text" onClick={handleVerifyNow}>
                Verify Now
              </Button>
            </Alert>
          )}
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: { value: 5, message: "Minimum 6 characters" },
                  }}
                />
                <CustomRouterLink to="/forgot-password">
                  <strong>Forgot Password</strong>
                </CustomRouterLink>
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
              </Stack>
              <Typography variant="body1" mt={2}>
                Don't Have an Account?{" "}
                <CustomRouterLink to="/signup">
                  <strong>Create an Account</strong>
                </CustomRouterLink>
              </Typography>
            </form>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
