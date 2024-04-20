import { baseURL } from "../api/api-config";
import { checkIfUserIsAuthenticated, signIn, signUp } from "../api/auth-api";
import { UserObject } from "../types/user-types";

export interface HandleSignUpResponse {
  user?: UserObject;
  success: boolean;
  error?: any;
}

export interface HandleSignInResponse {
  user?: UserObject;
  success: boolean;
  error?: any;
}

export const handleSignUp = async (
  event: React.FormEvent<HTMLFormElement>
): Promise<HandleSignUpResponse> => {
  try {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName")?.toString() || "";
    const lastName = data.get("lastName")?.toString() || "";
    const displayName = firstName && lastName ? `${firstName} ${lastName}` : "";
    const email = data.get("email")?.toString() || "";
    const password = data.get("password")?.toString() || "";

    if (!displayName || !email || !password) {
      throw new Error("Please fill in all the required fields.");
    }

    const user = await signUp({
      displayName,
      userEmail: email,
      password,
    });
    return { user, success: true };
  } catch (error) {
    console.error("An error occurred during form submission:", error);
    return { error, success: false };
  }
};

export const handleSignIn = async (
  event: React.FormEvent<HTMLFormElement>
): Promise<HandleSignInResponse> => {
  try {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString() || "";
    const password = data.get("password")?.toString() || "";

    const user = await signIn({
      userEmail: email,
      password,
    });
    return { user, success: true };
  } catch (error) {
    console.error("An error occurred during form submission:", error);
    return { error, success: false };
  }
};

export const handleSocialSignIn = async (provider: String) => {
  window.open(`${baseURL}/v1/auth/${provider}`, "_self");
};

export const handleCheckIfUserIsAuthenticated = async () => {
  try {
    const response = await checkIfUserIsAuthenticated();
    return { user: response, success: true };
  } catch (error) {
    return { error, success: false };
  }
};
