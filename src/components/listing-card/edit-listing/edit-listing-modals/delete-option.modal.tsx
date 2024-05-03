import EditListingOptionModal from "../edit-listing-option.modal";
import { Button, Stack, Typography } from "@mui/material";
import DoNotGoBackLoader from "../../../custom-mui/loading-screens/do-not-go-back.loader";

interface DeleteOptionModalProps {
  loadingInModal: boolean;
  openModal: boolean;
  handleModalClose: () => void;
  confirmAction: () => void;
}

const DeleteOptionModal = (props: DeleteOptionModalProps) => {
  const { loadingInModal, openModal, handleModalClose, confirmAction } = props;

  return (
    <EditListingOptionModal
      open={openModal}
      height={[200, 200]}
      width={[300, 350]}
    >
      {loadingInModal ? (
        <DoNotGoBackLoader label={"Deleting this listing"} />
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
              Are you sure you want to delete this listing?
            </Typography>
            <Typography variant="caption">
              This action cannot be undone.
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

export default DeleteOptionModal;
