import { Dialog } from "@mui/material";
import { ReactNode } from "react";

interface EditListingOptionModalProps {
  open: boolean;
  children?: ReactNode;
  height: number[];
  width: number[];
}

const EditListingOptionModal = (props: EditListingOptionModalProps) => {
  const { open, children, height, width } = props;

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: "inherit",
          borderRadius: 2,
          px: 2,
          pt: 4,
          pb: 2,
          height,
          width,
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default EditListingOptionModal;
