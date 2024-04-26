import { Alert, Snackbar } from "@mui/material";

interface SnackBarProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

const SuccessSnackBar = (props: SnackBarProps) => {
  const { open, handleClose, message, anchorOrigin } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}

    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%", p: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackBar;
