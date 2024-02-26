export interface UserObject {
  id: string;
  name: string;
  images: string[];
  verified: boolean;
  contactNumber?: string | null;
  verificationImageLink?: string[];
}

export interface UserSignupRequestObject {
  displayName: string;
  userEmail: string;
  password: string;
}
