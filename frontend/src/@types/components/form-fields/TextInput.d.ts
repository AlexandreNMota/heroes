import { TextFieldProps } from "@mui/material";

interface LabeledInputProps extends Omit<TextFieldProps, "placeholder" | "sx"> {
  label: string;
  disabled?: boolean;
  placeholder?: string;
  sx?: any;
}
