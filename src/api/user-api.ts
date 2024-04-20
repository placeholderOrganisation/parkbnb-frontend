import { userClient } from "./api-config";

export const updateUserWithId = async (userId: string, userData: any) => {
  try {
    const response = await userClient.put(`/${userId}`, userData);
    if (response.status === 200) {
      console.log("User updated successfully");
      return response.data;
    } else {
      throw new Error("Error updating user");
    }
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};
