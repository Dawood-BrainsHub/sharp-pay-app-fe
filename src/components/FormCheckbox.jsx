import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

const FormCheckbox = ({ name, control, label, rules = {} }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={!!field.value}
              />
            }
            label={label}
          />
          {fieldState.error && (
            <FormHelperText error>{fieldState.error.message}</FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default FormCheckbox;