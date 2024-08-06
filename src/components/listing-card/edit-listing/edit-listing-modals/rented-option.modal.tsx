import EditListingOptionModal from "../edit-listing-option.modal";
import { Stack, Typography } from "@mui/material";
import DoNotGoBackLoader from "../../../custom-mui/loading-screens/do-not-go-back.loader";
import { RootState } from "../../../../redux/global-store";
import { useDispatch, useSelector } from "react-redux";
import { getItemFromCookies } from "../../../../utils/storage-utils";
import { handleMarkParkingAsRented } from "../../../../utils/parking-utils";
import { setUserSelectedListing } from "../../../../redux/search-slice";
import { useNavigate } from "react-router-dom";
import { callAnalytics } from "../../../../utils/amplitude-utils";
import RoundedButton from "../../../custom-mui/rounded-button.component";

interface RentedOptionModalProps {
  loadingInModal: boolean;
  openModal: boolean;
  handleModalClose: () => void;
  setLoadingStateForOption: (value: boolean) => void;
  setErrorStateForOption: () => void;
}

const RentedOptionModal = (props: RentedOptionModalProps) => {
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

  const handleConfirmRented = () => {
    setLoadingStateForOption(true);
    if (!fetchedListing) {
      setLoadingStateForOption(false);
      return;
    }
    let dangerousUserId: string | null = userId;
    if (!userId) {
      dangerousUserId = userIdInCookie;
    }
    handleMarkParkingAsRented(fetchedListing._id, dangerousUserId).then(
      (response) => {
        if (response.success) {
          if (userSelectedListing?._id === fetchedListing._id) {
            dispatch(setUserSelectedListing(null));
          }
          callAnalytics("api_success_rented_listing");
          handleModalClose();
          navigate("/");
        } else {
          setErrorStateForOption();
          callAnalytics("api_failure_rented_listing");
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
            <RoundedButton
              otherProps={{
                variant: "contained",
                onClick: handleConfirmRented,
              }}
            >
              Yes
            </RoundedButton>
            <RoundedButton
              otherProps={{
                variant: "outlined",
                onClick: handleModalClose,
              }}
            >
              Cancel
            </RoundedButton>
          </Stack>
        </Stack>
      )}
    </EditListingOptionModal>
  );
};

export default RentedOptionModal;
