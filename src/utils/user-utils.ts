import libphonenumber from "google-libphonenumber";
import { getUserWithId, updateUserWithId } from "../api/user-api";
import { UserUpdateRequestObject } from "../types/user-types";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const isContactNumberValid = (
  phoneNumber: string | null | undefined
) => {
  if (!phoneNumber) {
    return false;
  }

  const phoneNumberInt = parseInt(phoneNumber);

  if (isNaN(phoneNumberInt)) {
    return false;
  }

  const parsedPhoneNumber = phoneUtil.parse(phoneNumber, "CA");
  const isNumberValid = phoneUtil.isValidNumber(parsedPhoneNumber);

  return isNumberValid;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const parsedPhoneNumber = phoneUtil.parse(phoneNumber, "CA");

  return phoneUtil.format(
    parsedPhoneNumber,
    libphonenumber.PhoneNumberFormat.E164
  );
};

// api wrappers
export const handleUpdateUserWithId = async (
  userId: string,
  userData: UserUpdateRequestObject
) => {
  try {
    const data = await updateUserWithId(userId, userData);
    return { data, success: true };
  } catch (error) {
    console.error("Error updating user", error);
    return { error, success: false };
  }
};

export const handleGetUserWithId = async (userId: string) => {
  try {
    const data = await getUserWithId(userId);
    return { user: data, success: true };
  } catch (error) {
    console.error("Error retrieving user", error);
    return { error, success: false };
  }
};
