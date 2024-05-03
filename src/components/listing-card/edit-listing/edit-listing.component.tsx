import { Box, Typography } from "@mui/material";
import { useState } from "react";
import EditOutlined from "@mui/icons-material/EditOutlined";
import BottomDrawer from "../../drawers/BottomDrawer";
import EditListingOptions from "./edit-listing-options.component";

interface EditListingProps {
  circularBorder?: boolean;
}

const EditListing = (props: EditListingProps) => {
  const { circularBorder } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Box
        sx={
          circularBorder
            ? {
                bgcolor: "common.white",
                width: 50,
                height: 50,
                borderRadius: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {}
        }
        onClick={handleOpenDrawer}
      >
        <EditOutlined sx={{ color: "primary.main", cursor: "pointer" }} />
      </Box>
      <BottomDrawer open={openDrawer} handleClose={handleCloseDrawer}>
        <Typography variant="h4">Edit this parking</Typography>
        <EditListingOptions />
      </BottomDrawer>
    </>
  );
};

export default EditListing;
