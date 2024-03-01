import { useSelector } from "react-redux";

export const Test = () => {
  // @ts-ignore
  const user = useSelector((state) => state.user);
  console.log("user", user);
  return <div>test</div>;
};
