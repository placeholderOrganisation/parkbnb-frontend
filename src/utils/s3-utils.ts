import { uploadSingleFile } from "../api/s3-api";

export interface HandleUploadToS3Response {
  location?: string;
  success: boolean;
  error?: any;
}

export const handleUpload = async (
  file: File
): Promise<HandleUploadToS3Response> => {
  try {
    const response = await uploadSingleFile(file);
    return { location: response.Location, success: true };
  } catch (error) {
    console.error("Error uploading file", error);
    return { error, success: false };
  }
};
