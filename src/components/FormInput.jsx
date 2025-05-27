import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Controller } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FormInput = ({ name, control, label, type = 'text', rules = {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin="normal"
          size='small'
          type={isPasswordField && !showPassword ? 'password' : 'text'}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            endAdornment: isPasswordField && (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};

export default FormInput;
