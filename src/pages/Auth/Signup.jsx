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
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import FormCheckbox from "../../components/FormCheckbox";
import Loader from "../../components/Loader";
import CustomRouterLink from "../../components/RouterLink";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encrypt } from "../../utils/crypto";

const Signup = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (formData) => {
    dispatch(signupUser(formData))
      .unwrap()
      .then((data) => {
        toast.success("Signup Successfuly!");
        navigate(`/verify-email?token=${encodeURIComponent(encrypt(data.user.email))}`);
      })
      .catch((err) => {
        toast.error(err || "Signup failed");
      });
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
            🧾 Create Account
          </Typography>
          {error && error.type == "signup" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormInput
                  name="name"
                  label="Full Name"
                  control={control}
                  rules={{ required: "Name is required" }}
                />
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                />
                <FormInput
                  name="phone"
                  label="Phone"
                  type="tel"
                  control={control}
                  rules={{ required: "Phone is required" }}
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  }}
                />
                <FormCheckbox
                  name="terms"
                  control={control}
                  label="I accept the Terms and Conditions"
                  rules={{
                    required: "You must accept the terms and conditions",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Stack>
              <Typography variant="body1" mt={2}>
                Alreay Have an Account?{" "}
                <CustomRouterLink to="/login">
                  <strong>Login Now</strong>
                </CustomRouterLink>
              </Typography>
            </form>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Signup;
