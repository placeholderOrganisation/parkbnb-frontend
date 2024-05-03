import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOptionModal from "./edit-listing-modals/delete-option.modal";
import RentedOptionModal from "./edit-listing-modals/rented-option.modal";

const EditListingOptions = () => {
  const [loadingInModal, setLoadingInModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRentedModal, setOpenRentedModal] = useState(false);

  const handleDeleteModalOpen = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    resetLoadingState();
  };

  const confirmDelete = () => {
    setLoadingInModal(true);
  };

  const handleRentedModalOpen = () => {
    setOpenRentedModal(true);
  };

  const handleRentedModalClose = () => {
    setOpenRentedModal(false);
    resetLoadingState();
  };

  const confirmRented = () => {
    setLoadingInModal(true);
  };

  const resetLoadingState = () => {
    setLoadingInModal(false);
  };

  const SNS = [
    {
      name: "Delete this listing",
      handleOptionClick: handleDeleteModalOpen,
    },
    {
      name: "Mark as rented",
      handleOptionClick: handleRentedModalOpen,
    },
  ];

  return (
    <>
      <List>
        {SNS.map((sns) => (
          <Box key={sns.name}>
            <ListItem disablePadding onClick={sns.handleOptionClick}>
              <ListItemButton
                sx={{
                  px: 0,
                }}
              >
                <ListItemText primary={sns.name} />
                <ListItemIcon
                  sx={{
                    minWidth: "unset",
                  }}
                >
                  <ChevronRightIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>
      <DeleteOptionModal
        loadingInModal={loadingInModal}
        openModal={openDeleteModal}
        handleModalClose={handleDeleteModalClose}
        confirmAction={confirmDelete}
      />
      <RentedOptionModal
        loadingInModal={loadingInModal}
        openModal={openRentedModal}
        handleModalClose={handleRentedModalClose}
        confirmAction={confirmRented}
      />
    </>
  );
};

export default EditListingOptions;
