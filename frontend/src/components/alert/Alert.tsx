import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useHeroCreateModal } from "../../hooks/useHeroCreateModalContext";

const Alert: React.FC = () => {
  const { alertOpen, message, closeAlert, severity } = useHeroCreateModal();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={alertOpen}
      onClose={closeAlert}
      message={message}
      key="top-right"
    >
      <MuiAlert severity={severity} onClose={closeAlert}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
