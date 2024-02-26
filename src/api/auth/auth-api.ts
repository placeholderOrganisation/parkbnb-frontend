import { userClient } from "../api-config";
import { UserSignupRequestObject } from "../../utils/user-utils";

export const signUp = async (userData: UserSignupRequestObject) => {
  try {
    const response = await userClient.post("/sign-up", userData);
    if (response.status === 201) {
      console.log("User signed up successfully");
      return response.data;
    } else {
      throw new Error("Error signing up");
    }
  } catch (error) {
    console.error("Error signing up", error);
    return error;
  }
};
