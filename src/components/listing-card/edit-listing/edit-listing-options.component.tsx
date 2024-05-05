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
import SnackBar from "../../custom-mui/snackbars/snackbar";
import { callAnalytics } from "../../../utils/amplitude-utils";

const EditListingOptions = () => {
  const [errorInModal, setErrorInModal] = useState(false);
  const [loadingInModal, setLoadingInModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRentedModal, setOpenRentedModal] = useState(false);

  const handleDeleteModalOpen = () => {
    callAnalytics("edit_listing_drawer_option_clicked", {
      option: "delete",
    });
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    callAnalytics("edit_listing_drawer_option_closed", {
      option: "delete",
    });
    setOpenDeleteModal(false);
    resetLoadingState();
  };

  const setErrorStateForDeleteOption = () => {
    callAnalytics("edit_listing_drawer_option_error", {
      option: "delete",
    });
    setErrorInModal(true);
    handleDeleteModalClose();
  };

  const handleRentedModalOpen = () => {
    callAnalytics("edit_listing_drawer_option_clicked", {
      option: "mark_as_rented",
    });
    setOpenRentedModal(true);
  };

  const handleRentedModalClose = () => {
    callAnalytics("edit_listing_drawer_option_closed", {
      option: "mark_as_rented",
    });
    setOpenRentedModal(false);
    resetLoadingState();
  };

  const setErrorStateForRentedOption = () => {
    callAnalytics("edit_listing_drawer_option_error", {
      option: "mark_as_rented",
    });
    setErrorInModal(true);
    handleRentedModalClose();
  };

  const resetLoadingState = () => {
    setLoadingStateForOption(false);
  };

  const setLoadingStateForOption = (value: boolean) => {
    setLoadingInModal(value);
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
        setLoadingStateForOption={(value) => {
          setLoadingStateForOption(value);
        }}
        setErrorStateForOption={setErrorStateForDeleteOption}
      />
      <RentedOptionModal
        loadingInModal={loadingInModal}
        openModal={openRentedModal}
        handleModalClose={handleRentedModalClose}
        setLoadingStateForOption={(value) => {
          setLoadingStateForOption(value);
        }}
        setErrorStateForOption={setErrorStateForRentedOption}
      />
      <SnackBar
        open={errorInModal}
        handleClose={() => {
          setErrorInModal(false);
        }}
        message={"Oops! Something went wrong. Please try again."}
        severity="error"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </>
  );
};

export default EditListingOptions;
