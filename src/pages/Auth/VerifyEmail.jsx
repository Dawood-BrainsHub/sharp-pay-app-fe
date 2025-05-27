import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import axios from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { decrypt } from "../../utils/crypto";

const VerifyEmail = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResendVerifying, setIsResendVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encryptedEmail = params.get("token");
  const email = encryptedEmail
    ? decrypt(decodeURIComponent(encryptedEmail))
    : "";

  const handleVerify = async () => {
    if (!otp) return;
    setIsVerifying(true);

    try {
      const response = await axios.post("/auth/verify-email", {
        code: otp,
      });
      toast.success("Verification Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setOtp("");
    setIsResendVerifying(true);
    try {
      const response = await axios.post("/auth/resend-verify-email", {
        email: email,
      });
      toast.success("Verification Code Send Successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setIsResendVerifying(false);
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
          <Stack spacing={2} alignItems="center">
            <EmailIcon color="primary" sx={{ fontSize: 50 }} />
            <Typography variant="h5" fontWeight={600}>
              Verify Your Email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter the 6-digit code sent to your email.
            </Typography>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType="tel"
              inputStyle={{
                width: "40px",
                height: "40px",
                margin: "8px",
                borderRadius: "5px",
                borderColor: "",
              }}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />

            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleVerify}
              disabled={isVerifying || otp.length !== 6}
              startIcon={isVerifying && <CircularProgress size={20} />}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>

            <Button
              onClick={handleResend}
              variant="contained"
              size="large"
              fullWidth
              disabled={isResendVerifying}
              startIcon={isResendVerifying && <CircularProgress size={20} />}
            >
              {isResendVerifying ? "Sending..." : "Resend Verification Code"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
