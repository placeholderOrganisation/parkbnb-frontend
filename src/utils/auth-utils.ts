import { signUp } from "../api/auth/auth-api";
import { UserObject } from "../types/user-types";

export interface HandleSubmitResponse {
  user?: UserObject;
  success: boolean;
  error?: any;
}

// set standard to send info to tsx file
export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
): Promise<HandleSubmitResponse> => {
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
