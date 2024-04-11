import { ChangeEvent } from "react";
import { AmenitiesTypeFilterTypes } from "./global.types";

export interface CreateListingFormState {
  activeStep: number;
}

export const provincesInCanada = [
  "Ontario",
  "British Columbia",
  "Quebec",
  "Saskatchewan",
  "Manitoba",
  "Alberta",
  "Nova Scotia",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Prince Edward Island",
];

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

export interface StepTwoState {
  amenities: AmenitiesTypeFilterTypes;
  storageType: string;
  vehicleTypes: string[];
  dimensions: {
    minLength: number;
    minWidth: number;
  };
  numSpaces: number;
  isValid: boolean;
}

export interface StepThreeState {
  images: File[];
  description: string;
  isValid: boolean;
}

export interface AddressFormTextFieldProps {
  id: string;
  value: string;
  name: string;
  label: string;
  autoComplete?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export interface PriceFormTextFields {
  id: string;
  name: string;
  term?: string;
  helperText?: string;
  helperTextLabelId?: string;
  value?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export interface CustomImageProps {
  src: string;
}
