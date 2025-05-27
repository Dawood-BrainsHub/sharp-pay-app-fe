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
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/auth/reset-password/${token}`,
        { password: data.password }
      );
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
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
          <Typography variant="h2" mb={4} sx={{ textAlign: "center" }}>
            🔐 Reset Password
          </Typography>
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormInput
                  name="password"
                  label="New Password"
                  type="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  }}
                />

                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  control={control}
                  rules={{
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === control._formValues.password ||
                      "Passwords do not match",
                  }}
                />

                <Button type="submit" variant="contained" size="large">
                  Reset Password
                </Button>
              </Stack>
            </form>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ResetPassword;
