import { Stack, Typography, Button, Box, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import { setUserContactNumber } from "../../../../redux/user-slice";
import { formatPhoneNumber, isContactNumberValid } from "../../../../utils/user-utils";

const contactNumberFieldErrorText = "Please enter a valid contact number";

const PublishListingMissingContacInfoError = () => {
  const dispatch = useDispatch();

  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberFieldError, setContactNumberFieldError] = useState(false);

  const handleClick = () => {
    const isUserInputValidContactNumber = isContactNumberValid(contactNumber);
    if (!isUserInputValidContactNumber) {
      setContactNumberFieldError(true);
      return;
    }
    const parsedContactNumber = formatPhoneNumber(contactNumber);
    dispatch(setUserContactNumber(parsedContactNumber));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // dispatch action to update user contact number
    const value = e.target.value;
    setContactNumber(value);

    if (contactNumberFieldError) {
      setContactNumberFieldError(false);
    }
  };

  return (
    <Stack
      sx={{
        pb: [5, 0],
        height: "100%",
        position: "relative",
      }}
    >
      <Typography variant="h4">Something went wrong</Typography>
      <Stack
        spacing={2}
        sx={{
          mt: 2,
          mb: 3,
        }}
      >
        <Typography variant="body1">
          Please add your contact information to proceed.
        </Typography>
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          error={contactNumberFieldError}
          helperText={
            contactNumberFieldError ? contactNumberFieldErrorText : ""
          }
          type="number"
        />
      </Stack>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "-webkit-fill-available",
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          fullWidth
        >
          Create your listing
        </Button>
      </Box>
    </Stack>
  );
};

export default PublishListingMissingContacInfoError;
