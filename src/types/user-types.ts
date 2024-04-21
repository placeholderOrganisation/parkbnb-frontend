export interface UserObject {
  id: string;
  name: string;
  images: string[];
  verified: boolean;
  contactNumber?: string | null;
  verificationImageLink?: string[];
  isAuthed: boolean;
}

export interface ListingOwnerUserObject {
  id: string;
  name: string;
  images: string[];
  verified: boolean;
  contactNumber?: string | null;
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

export interface UserUpdateRequestObject {
  id?: string;
  name?: string;
  provider?: string;
  email?: string;
  images?: string[];
  verified?: Boolean;
  contactNumber?: string;
  verificationImageLink?: string[];
  passwordHash?: string;
}
