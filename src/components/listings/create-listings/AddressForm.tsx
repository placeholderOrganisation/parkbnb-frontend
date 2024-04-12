import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import {
  AddressFormTextFieldProps,
  PriceFormTextFields,
} from "../../../types/create-listing-form.types";
import ProvincePicker from "./province-picker.component";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStepOneAddressFormData,
  setStepOnePricingFormData,
  setStepOneValidity,
} from "../../../redux/step-one-slice";
import { RootState } from "../../../redux/global-store";

const AddressFormTextField = (props: AddressFormTextFieldProps) => {
  const {
    id,
    name,
    label,
    autoComplete,
    handleChange = () => {},
    error = false,
    value,
    disabled = false,
  } = props;
  return (
    <TextField
      required
      fullWidth
      id={id}
      name={name}
      label={label}
      autoComplete={autoComplete}
      variant="outlined"
      onChange={handleChange}
      error={error}
      helperText={error ? "This field is required" : ""} // currently only showing error if this fields is not set
      value={value}
      disabled={disabled}
    />
  );
};

export const PriceFormTextField = (props: PriceFormTextFields) => {
  const {
    id,
    name,
    term,
    helperText,
    helperTextLabelId,
    value,
    handleChange = () => {},
    error = false,
    disabled = false,
  } = props;
  const shouldShowEndAdornment = term !== undefined;
  const shouldShowHelperText =
    helperText !== undefined && helperTextLabelId !== undefined;
  const helperTextLabelIdParsed = shouldShowHelperText ? helperTextLabelId : "";
  return (
    <FormControl
      sx={{
        width: "100%",
      }}
      onChange={handleChange}
    >
      <TextField
        id={id}
        name={name}
        value={value && value}
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          endAdornment: shouldShowEndAdornment && (
            <InputAdornment position="end">{term}</InputAdornment>
          ),
        }}
        type="number"
        aria-describedby={helperTextLabelIdParsed}
        error={error}
        disabled={disabled}
      />
      {shouldShowHelperText && (
        <FormHelperText
          id={helperTextLabelIdParsed}
          sx={{
            ml: 0,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
      {error && (
        <FormHelperText
          id={helperTextLabelIdParsed}
          sx={{
            ml: 0,
            color: "error.main",
          }}
        >
          This field is required and must be greater than 0.
        </FormHelperText>
      )}
    </FormControl>
  );
};

const pricingFields = [
  {
    id: "per-day-price",
    name: "dailyRate",
    term: "/day",
    helperText: "Daily price",
    helperTextLabelId: "daily-price-input",
  },
  {
    id: "per-month-price",
    name: "monthlyRate",
    term: "/month",
    helperText: "Monthly price",
    helperTextLabelId: "montly-price-input",
  },
];

const AddressForm = () => {
  const dispatch = useDispatch();
  const {
    street,
    city,
    postal,
    province,
    country,
    dailyRate,
    monthlyRate,
  } = useSelector((state: RootState) => state.stepOneForm);

  const [address, setAddress] = useState({
    street: street,
    city: city,
    postal: postal,
    province: province || "Ontario",
    country: country || "Canada",
  });

  const [addressError, setAddressError] = useState({
    street: false,
    city: false,
    province: false,
    postal: false,
    country: false,
  });

  const [pricing, setPricing] = useState({
    dailyRate: dailyRate | 0,
    monthlyRate: monthlyRate | 0,
  });

  const [pricingError, setPricingError] = useState({
    dailyRate: false,
    monthlyRate: false,
  });

  const handleAddressChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (value === "") {
      setAddressError({ ...addressError, [name]: true });
    } else {
      setAddressError({ ...addressError, [name]: false });
    }
    setAddress({ ...address, [name]: value });
    dispatch(setStepOneAddressFormData({ ...address, [name]: value }));
    dispatch(setStepOneValidity());
  };

  const handlePricingChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    let parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      setPricingError({ ...pricingError, [name]: true });
    } else {
      setPricingError({ ...pricingError, [name]: false });
    }
    setPricing({ ...pricing, [name]: parsedValue });
    dispatch(setStepOnePricingFormData({ ...pricing, [name]: parsedValue }));
    dispatch(setStepOneValidity());
  };

  return (
    <>
      {/* Address Section */}
      <Box sx={{ pt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AddressFormTextField
              id="street"
              name="street"
              label="Street"
              autoComplete="shipping address-line1"
              handleChange={handleAddressChange}
              error={addressError.street}
              value={address.street}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressFormTextField
              id="city"
              name="city"
              label="City"
              autoComplete="shipping address-level2"
              handleChange={handleAddressChange}
              error={addressError.city}
              value={address.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProvincePicker handleChange={handleAddressChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressFormTextField
              id="zip"
              name="postal"
              label="Postal code"
              autoComplete="shipping postal-code"
              handleChange={handleAddressChange}
              error={addressError.postal}
              value={address.postal}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressFormTextField
              id="country"
              name="country"
              label="Country"
              autoComplete="shipping country"
              handleChange={handleAddressChange}
              error={addressError.country}
              value={address.country}
              disabled
            />
          </Grid>
        </Grid>
      </Box>
      {/* Pricing Section */}
      <Box sx={{ pt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={3}>
          {pricingFields.map((field) => (
            <Grid item xs={12} sm={6} key={field.id}>
              <PriceFormTextField
                id={field.id}
                name={field.name}
                term={field.term}
                helperText={field.helperText}
                helperTextLabelId={field.helperTextLabelId}
                key={field.id}
                handleChange={handlePricingChange}
                error={pricingError[field.name as keyof typeof pricingError]}
                value={pricing[field.name as keyof typeof pricing]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AddressForm;
