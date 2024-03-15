export interface CreateListingFormState {
  activeStep: number;
}

export interface StepOneState {
  street: string;
  city: string;
  province: string;
  postal: string;
  country: string;
  dailyRate: number;
  monthlyRate: number;
  isValid: boolean;
}

export interface AddressFormTextFieldProps {
  id: string;
  name: string;
  label: string;
  autoComplete?: string;
}

export interface PriceFormTextFields {
  id: string;
  term: string;
  helperText: string;
  helperTextLabelId: string;
}

export interface CustomImageProps {
  src: string;
}

export interface VehicleTypeToDimensions {
  bike: string;
  "sedan / suv": string;
  "pickup truck": string;
  "boat / RV": string;
  "commercial truck / trailer": string;
}