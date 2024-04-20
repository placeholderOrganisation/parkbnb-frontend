import { authClient, userClient } from "./api-config";
import {
  UserSigninRequestObject,
  UserSignupRequestObject,
} from "../types/user-types";

export const signUp = async (userData: UserSignupRequestObject) => {
  try {
    const response = await userClient.post("/sign-up", userData);
    if (response.status === 201) {
      console.log("User signed up successfully");
      const user = response.data;
      return user;
    } else {
      throw new Error("Error signing up");
    }
  } catch (error) {
    console.error("Error signing up", error);
    throw error;
  }
};

export const signIn = async (userData: UserSigninRequestObject) => {
  try {
    const response = await authClient.post("/local", userData);
    if (response.status === 200) {
      console.log("User signed in successfully");
      const user = response.data.user;
      return user;
    } else {
      throw new Error("Error signing in locally");
    }
  } catch (error) {
    console.error("Error signing in locally", error);
    throw error;
  }
};

export const checkIfUserIsAuthenticated = async () => {
  try {
    const response = await authClient.get("/login/success");
    if (response.status === 200) {
      const user = response.data.user;
      return user;
    } else {
      throw new Error("User is not authenticated");
    }
  } catch (error) {
    console.error("User is not authenticated", error);
    throw error;
  }
}