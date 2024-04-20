import libphonenumber from "google-libphonenumber";

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
