import { baseURL } from "../api/api-config";
import { checkIfUserIsAuthenticated, signIn, signUp } from "../api/auth-api";
import { UserObject } from "../types/user-types";
import {
  getItemFromCookies,
  getItemFromSessionStorage,
  setItemInCookies,
  setItemInSessionStorage,
} from "./storage-utils";

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
    setItemInCookies("user", JSON.stringify(user.id));
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
    setItemInCookies("user", JSON.stringify(user.id));
    return { user, success: true };
  } catch (error) {
    console.error("An error occurred during form submission:", error);
    return { error, success: false };
  }
};

export const handleSocialSignIn = async (provider: String) => {
  window.open(`${baseURL}/v1/auth/${provider}`);
};

export const handleCheckIfUserIsAuthenticated = async () => {
  try {
    const response = await checkIfUserIsAuthenticated();
    setItemInCookies("user", JSON.stringify(response.id));
    return { user: response, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const hasUserAuthenticatedInThisSession = () => {
  const user = getItemFromCookies("user");
  return Boolean(user);
};

export const getNumberOfListingsViewedThisSession = () => {
  const numberOfListingsViewed = getItemFromCookies(
    "number_of_listings_viewed"
  );

  if (!numberOfListingsViewed) {
    return 0;
  }
  const numberOfListingsViewedInt = parseInt(numberOfListingsViewed, 10);
  return numberOfListingsViewedInt;
};

export const hasUserSeenErrorSnackBar = () => {
  const hasSeenErrorSnackBar = getItemFromSessionStorage(
    "has_seen_error_snackbar"
  );
  return Boolean(hasSeenErrorSnackBar);
};

export const setHasUserSeenErrorSnackBar = () => {
  setItemInSessionStorage("has_seen_error_snackbar", "true", true);
};

export const incrementNumberOfListingsViewedThisSession = () => {
  const numberOfListingsViewed = getNumberOfListingsViewedThisSession();
  const newNumberOfListingsViewed = numberOfListingsViewed + 1;
  setItemInCookies(
    "number_of_listings_viewed",
    newNumberOfListingsViewed.toString()
  );
};

export const verifyUserCanTakePriveligedAction = (
  userIdToCheckAgainst: string,
  userIdInRedux: string
) => {
  if (userIdInRedux) {
    return userIdInRedux === userIdToCheckAgainst;
  }
  return false;
};

export const setRedirectDestinationAfterAuthInSessionStorage = (
  redirectDestination: string
) => {
  setItemInSessionStorage("auth_redirect", redirectDestination, true);
};
