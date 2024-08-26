import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  Stack,
} from "@mui/material";
import { PriceFormTextFields } from "../../../../types/create-listing-form.types";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStepOneAddressFormData,
  setStepOnePricingFormData,
  setStepOneValidity,
} from "../../../../redux/step-one-slice";
import { RootState } from "../../../../redux/global-store";
import { callAnalytics } from "../../../../utils/amplitude-utils";
import AddressAutocomplete from "./address-autocomplete.component";
import { AutocompleteResponse } from "../../../../types/global.types";
import {
  Address,
  extractAddressFromPlaceName,
} from "../../../../utils/geo-coding.utils";

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
  const { dailyRate, monthlyRate } = useSelector(
    (state: RootState) => state.stepOneForm
  );

  const [pricing, setPricing] = useState({
    dailyRate: dailyRate | 0,
    monthlyRate: monthlyRate | 0,
  });

  const [pricingError, setPricingError] = useState({
    dailyRate: false,
    monthlyRate: false,
  });

  const handleAddressChange = (address: Address) => {
    dispatch(setStepOneAddressFormData(address));
    dispatch(setStepOneValidity());
  };

  const onSuggestionsClick = (suggestion: AutocompleteResponse) => {
    const { place_name } = suggestion;
    const address = extractAddressFromPlaceName(place_name);
    if (!address) {
      return;
    }
    handleAddressChange(address);
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

  useEffect(() => {
    callAnalytics("address_and_payment_section_viewed");
  }, []);

  return (
    <>
      {/* Address Section */}
      <Stack spacing={2}>
        <Typography variant="h6">Enter Address</Typography>
        <AddressAutocomplete
          showFilters={false}
          showNearMe={false}
          handleEndAdornmentClick={() => {}}
          onSuggestionsClick={onSuggestionsClick}
        />
      </Stack>
      {/* Pricing Section */}
      <Box sx={{ pt: 5 }}>
        <Typography variant="h6" sx={{ pb: 2 }}>
          Set Pricing
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
