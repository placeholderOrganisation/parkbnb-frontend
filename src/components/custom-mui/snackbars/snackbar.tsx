import { Alert, Snackbar } from "@mui/material";

interface SnackBarProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  severity: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
}

const SnackBar = (props: SnackBarProps) => {
  const { open, handleClose, message, anchorOrigin, severity, autoHideDuration = 3000 } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%", p: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
