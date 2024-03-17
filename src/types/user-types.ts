export interface UserObject {
  id: string;
  name: string;
  images: string[];
  verified: boolean;
  contactNumber?: string | null;
  verificationImageLink?: string[];
  isAuthed: boolean;
}

export interface UserSignupRequestObject {
  displayName: string;
  userEmail: string;
  password: string;
}

export interface UserSigninRequestObject {
  userEmail: string;
  password: string;
}
