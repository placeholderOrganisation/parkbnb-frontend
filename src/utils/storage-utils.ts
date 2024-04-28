import dayjs from "dayjs";

export const getItemFromSessionStorage = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const setItemInSessionStorage = (
  key: string,
  value: string,
  overRideValue: boolean = false
): void => {
  const storedValue = getItemFromSessionStorage(key);

  if (storedValue && overRideValue === false) {
    return;
  }

  return sessionStorage.setItem(key, value);
};

export const removeItemFromSessionStorage = (key: string): void => {
  return sessionStorage.removeItem(key);
};

export const getItemFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setItemInLocalStorage = (
  key: string,
  value: string,
  overRideValue: boolean = false
): void => {
  const storedValue = getItemFromLocalStorage(key);
  if (storedValue && overRideValue === false) {
    return;
  }
  return localStorage.setItem(key, value);
};

export const removeItemFromLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};

export const getItemFromCookies = (key: string): string | null => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((cookie) => cookie.startsWith(key));
  if (!cookie) {
    return null;
  }
  return cookie.split("=")[1];
};

export const setItemInCookies = (key: string, value: string): void => {
  const expirationDate = dayjs.utc().add(5, "minutes");

  document.cookie = `${key}=${value}; expires=${expirationDate}`;
};

export const removeItemFromCookies = (key: string): void => {
  document.cookie = `${key}=; expires=${dayjs.utc(0)}`;
};
