import axios from "axios";

// TODO: fix process.env
export let baseURL = "process.env.REACT_APP_CLIENT_URL";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3001";
}

// console.log("baseURL", baseURL, process.env);

export const authClient = axios.create({
  baseURL: `${baseURL}/v1/auth`,
  withCredentials: true,
});

export const userClient = axios.create({
  baseURL: `${baseURL}/v1/user`,
});

export const s3Client = axios.create({
  baseURL: `${baseURL}/v1/s3`,
});

export const geocodingClient = axios.create({
  baseURL: `${baseURL}/v1/geocode`,
});

export const parkingClient = axios.create({
  baseURL: `${baseURL}/v1/parking`,
});