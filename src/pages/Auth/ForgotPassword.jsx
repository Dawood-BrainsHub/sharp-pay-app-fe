import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import CustomRouterLink from "../../components/RouterLink";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/forgot-password", data);
      toast.success("Reset link sent to your email!");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
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
          <Typography variant="h2" mb={2} sx={{ textAlign: "center" }}>
            🔐 Forgot Password
          </Typography>
          <Typography variant="body1" mb={4} sx={{ textAlign: "center" }}>
            Enter your Email Address and We'll Send you a Link to Reset your
            Password.
          </Typography>
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

                <Button type="submit" variant="contained" size="large" startIcon={loading && <CircularProgress size={20} />}>
                  {loading ? "Sending...": "Send Password Reset Link"}
                </Button>
              </Stack>
              <Typography variant="body1" mt={2}>
                <CustomRouterLink to="/login">
                  <KeyboardDoubleArrowLeftIcon
                    sx={{ marginBottom: "-6px", marginRight: "5px" }}
                  />
                  <strong>Back to Login</strong>
                </CustomRouterLink>
              </Typography>
            </form>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
