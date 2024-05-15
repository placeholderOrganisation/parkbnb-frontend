import { NavbarLink } from "../../types/global.types";
import { UserObject } from "../../types/user-types";
import NavLinks from "./NavLinks";

interface UserProfileProps {
  user: UserObject;
  closeUserDrawer: () => void;
}

const UserProfile = (props: UserProfileProps) => {
  const { user, closeUserDrawer } = props;
  const { id } = user;

  const linksToRender: NavbarLink[] = [
    { name: "My listings", path: `/user/${id}/listing` },
  ];
  return (
    <NavLinks
      linksToRender={linksToRender}
      handleNavLinkClick={closeUserDrawer}
    />
  );
};

export default UserProfile;
