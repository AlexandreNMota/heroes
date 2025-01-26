import React from "react";
import { TextField, Typography, Grid, TextFieldProps } from "@mui/material";

interface LabeledInputProps extends Omit<TextFieldProps, "placeholder" | "sx"> {
  label: string;
  placeholder?: string;
  sx?: any;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  sx,
  ...textFieldProps
}) => {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        placeholder={placeholder}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            backgroundColor: "#fff",
          },
          ...sx,
        }}
        {...textFieldProps}
      />
    </Grid>
  );
};
