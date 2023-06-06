import React from "react";

import { Alert, Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  severity: string;
  message: string;
  onClose: () => void;
}
const SnackBar = ({ open, severity, message, onClose }: Props) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity as "success" | "error"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
