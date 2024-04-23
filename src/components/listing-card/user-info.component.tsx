import { Box, Stack, Typography } from "@mui/material";
import { ListingOwnerUserObject } from "../../types/user-types";
import ShowContactInfoComponent from "./show-contact-info.component";

interface UserInfoProps {
  user: ListingOwnerUserObject | null;
}

const UserInfo = (props: UserInfoProps) => {
  const { user } = props;

  // todo if user is null use contact number in parking 
  if (!user) {
    return null;
  }

  return (
    <>
      <Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Hosted by</Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              ml: 0.5,
            }}
          >
            {user.name}
          </Typography>
        </Box>

        <ShowContactInfoComponent contactNumber={user.contactNumber!} />
      </Stack>
    </>
  );
};

export default UserInfo;
