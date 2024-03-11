import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/user-slice";

export const Test = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3001/v1/auth/login/success", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        dispatch(setUserData(response.data.user));
      });
  }, []);

  const dispatch = useDispatch();
  // @ts-ignore
  const user = useSelector((state) => state.user);
  return <div>hi {user.name}</div>;
};
