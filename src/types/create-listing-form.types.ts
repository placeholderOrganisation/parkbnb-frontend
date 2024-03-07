export interface CreateListingFormState {
  activeStep: number;
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
};