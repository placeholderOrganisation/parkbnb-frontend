import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import UserListingsComponent from "../../components/user/user-listings.component";
import { useEffect, useState } from "react";
import { handleGetParkingUsingUserId } from "../../utils/parking-utils";
import Loading from "../../components/custom-mui/loading.component";
import { Listing } from "../../types/global.types";
import { RootState } from "../../redux/global-store";
import { useSelector } from "react-redux";
import { verifyUserCanTakePriveligedAction } from "../../utils/auth-utils";
import { callAnalytics } from "../../utils/amplitude-utils";

const UserListings = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userListings, setUserListings] = useState<Listing[]>([]);

  if (!userId) {
    return (
      <Box
        sx={{
          mt: [0, 6],
          mb: { xs: 3, md: 6 },
        }}
      >
        <Loading height={50} width={50} />;
      </Box>
    );
  }

  const { id: userIdInRedux } = useSelector((state: RootState) => state.user);
  const isUserVerifiedToViewThisPage = verifyUserCanTakePriveligedAction(
    userId,
    userIdInRedux
  );

  useEffect(() => {
    if (!userId || isUserVerifiedToViewThisPage === false) {
      callAnalytics("unauthed_user_tried_view_user_listings", {
        userId,
        userIdInRedux,
      });
      return;
    }

    handleGetParkingUsingUserId(userId).then((response) => {
      if (response.success) {
        setUserListings(response.data);
      }
    });
  }, [userId]);

  return (
    <Box
      sx={{
        mt: 6,
        mb: { xs: 3, md: 6 },
      }}
    >
      <UserListingsComponent userListings={userListings} />
    </Box>
  );
};

export default UserListings;
