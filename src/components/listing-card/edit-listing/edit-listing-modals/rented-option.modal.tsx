import EditListingOptionModal from "../edit-listing-option.modal";
import { Button, Stack, Typography } from "@mui/material";
import DoNotGoBackLoader from "../../../custom-mui/loading-screens/do-not-go-back.loader";

interface RentedOptionModalProps {
  loadingInModal: boolean;
  openModal: boolean;
  handleModalClose: () => void;
  confirmAction: () => void;
}

const RentedOptionModal = (props: RentedOptionModalProps) => {
  const { loadingInModal, openModal, handleModalClose, confirmAction } = props;

  return (
    <EditListingOptionModal
      open={openModal}
      height={[200, 200]}
      width={[300, 350]}
    >
      {loadingInModal ? (
        <DoNotGoBackLoader label={"Updating this listing"} />
      ) : (
        <Stack
          spacing={2}
          sx={{
            height: "-webkit-fill-available",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={1}>
            <Typography variant="body1">
              Are you sure you want to mark this listing as rented?
            </Typography>
            <Typography variant="caption">
              We are very happy that you were able to rent your space with our
              help.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={confirmAction}>
              Yes
            </Button>
            <Button onClick={handleModalClose} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Stack>
      )}
    </EditListingOptionModal>
  );
};

export default RentedOptionModal;
