import EditListingOptionModal from "../edit-listing-option.modal";
import { Button, Stack, Typography } from "@mui/material";
import DoNotGoBackLoader from "../../../custom-mui/loading-screens/do-not-go-back.loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/global-store";
import { getItemFromCookies } from "../../../../utils/storage-utils";
import { handleDeleteParking } from "../../../../utils/parking-utils";
import { setUserSelectedListing } from "../../../../redux/search-slice";
import { useNavigate } from "react-router-dom";

interface DeleteOptionModalProps {
  loadingInModal: boolean;
  openModal: boolean;
  handleModalClose: () => void;
  setLoadingStateForOption: (value: boolean) => void;
  setErrorStateForOption: () => void;
}

const DeleteOptionModal = (props: DeleteOptionModalProps) => {
  const {
    loadingInModal,
    openModal,
    handleModalClose,
    setLoadingStateForOption,
    setErrorStateForOption,
  } = props;

  const userId = useSelector((state: RootState) => state.user.id);
  const userIdInCookie = getItemFromCookies("user");
  const fetchedListing = useSelector(
    (state: RootState) => state.search.fetchedListing
  );
  const userSelectedListing = useSelector(
    (state: RootState) => state.search.userSelectedListing
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    setLoadingStateForOption(true);
    if (!fetchedListing) {
      setLoadingStateForOption(false);
      return;
    }
    let dangerousUserId: string | null = userId;
    if (!userId) {
      dangerousUserId = userIdInCookie;
    }
    handleDeleteParking(fetchedListing._id, dangerousUserId).then(
      (response) => {
        if (response.success) {
          if (userSelectedListing?._id === fetchedListing._id) {
            dispatch(setUserSelectedListing(null));
          }
          handleModalClose();
          navigate("/");
        } else {
          setErrorStateForOption();
          console.error("Error marking parking as rented", response.error);
        }
      }
    );
  };
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
            <Button variant="contained" onClick={handleConfirmDelete}>
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
