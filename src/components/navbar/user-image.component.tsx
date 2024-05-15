import defaultUserImg from "../../assets/default-user-img.png";

interface UserImageProps {
  user: any;
  handleClick: () => void;
}

const UserImage = (props: UserImageProps) => {
  const { user, handleClick } = props;

  const useFallBackImage = Boolean(
    !user.images || user.images.length === 0 || !user.images[0]
  );

  return (
    <img
      src={useFallBackImage ? defaultUserImg : user.images[0]}
      alt="avatar"
      style={{
        height: 32,
        width: 32,
        borderRadius: "50%",
        objectFit: "cover",
        cursor: "pointer",
      }}
      onClick={handleClick}
    />
  );
};

export default UserImage;
