import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const styles = {
  dialogBox: {
    "& .MuiPaper-root": {
      borderRadius: "25px",
    },
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px",
  },
  content: {
    padding: "50px 25px",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
};

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="sm"
      sx={styles.dialogBox}
    >
      <DialogTitle sx={styles.titleContainer}>
        {title}
        <IconButton onClick={onCancel} edge="end" aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={styles.content}>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions sx={styles.buttons}>
        <Button variant="outlined" color="gray" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
