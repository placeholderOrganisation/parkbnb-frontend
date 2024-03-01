import { useSelector } from "react-redux";

export const Test = () => {
  // @ts-ignore
  const user = useSelector((state) => state.user);
  return <div>hi {user.name}</div>;
};
