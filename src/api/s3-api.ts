import { s3Client } from "./api-config";

export const uploadSingleFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await s3Client.post("/upload-single", formData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error uploading file");
    }
  } catch (error) {
    console.error("Error uploading file", error);
    throw error;
  }
};
