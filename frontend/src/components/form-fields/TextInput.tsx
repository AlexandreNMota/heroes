import React from "react";
import { TextField, Typography, Grid, InputAdornment } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { LabeledInputProps } from "../../@types/components/form-fields/TextInput";

const styles = {
  label: {
    fontWeight: "bold",
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      backgroundColor: "#fff",
    },
  },
};

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
      <Typography variant="subtitle1" gutterBottom sx={styles.label}>
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
          ...styles.textfield,
          ...sx,
        }}
        {...textFieldProps}
      />
    </Grid>
  );
};
