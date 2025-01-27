import React from "react";
import { TextField, Typography, Grid, TextFieldProps, InputAdornment } from "@mui/material";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
interface LabeledInputProps extends Omit<TextFieldProps, "placeholder" | "sx"> {
  label: string;
  disabled?:boolean;
  placeholder?: string;
  sx?: any;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  disabled,
  sx,
  ...textFieldProps
}) => {
  const inputProps =
  label === "Data de nascimento"
  ? {
    endAdornment: (
    <InputAdornment position="end">
      <CalendarTodayOutlinedIcon />
    </InputAdornment>
    ),
  }
  : undefined;

  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        placeholder={placeholder}
        variant="outlined"
        disabled={disabled ?? false}
        size="small"
        InputProps={inputProps}
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
