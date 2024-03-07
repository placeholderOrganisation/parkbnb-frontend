import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { AddressFormTextFieldProps, PriceFormTextFields } from "../../../types/create-listing-form.types";

const AddressFormTextField = (props: AddressFormTextFieldProps) => {
  const { id, name, label, autoComplete } = props;
  return (
    <TextField
      required
      fullWidth
      id={id}
      name={name}
      label={label}
      autoComplete={autoComplete}
      variant="outlined"
    />
  );
};

const PriceFormTextField = (props: PriceFormTextFields) => {
  const { id, term, helperText, helperTextLabelId } = props;
  return (
    <FormControl
      sx={{
        width: "100%",
      }}
    >
      <TextField
        id={id}
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          endAdornment: <InputAdornment position="end">/{term}</InputAdornment>,
        }}
        aria-describedby={helperTextLabelId}
      />
      <FormHelperText id={helperTextLabelId}>{helperText}</FormHelperText>
    </FormControl>
  );
};

const addressFields = [
  {
    id: "city",
    name: "city",
    label: "City",
    autoComplete: "shipping address-level2",
  },
  {
    id: "state",
    name: "state",
    label: "Province",
    autoComplete: "",
  },
  {
    id: "zip",
    name: "zip",
    label: "Postal code",
    autoComplete: "shipping postal-code",
  },
  {
    id: "country",
    name: "country",
    label: "Country",
    autoComplete: "shipping country",
  },
];

const pricingFields = [
  {
    id: "per-day-price",
    term: "day",
    helperText: "Daily price",
    helperTextLabelId: "daily-price-input",
  },
  {
    id: "per-month-price",
    term: "month",
    helperText: "Monthly price",
    helperTextLabelId: "montly-price-input",
  },
];

const AddressForm = () => {
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
              id="address1"
              name="address1"
              label="Address line 1"
              autoComplete="shipping address-line1"
            />
          </Grid>
          {addressFields.map((field) => (
            <Grid item xs={12} sm={6} key={field.id}>
              <AddressFormTextField
                id={field.id}
                name={field.name}
                label={field.label}
                autoComplete={field.autoComplete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Pricing Section */}
      <Box sx={{ pt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={3}>
          {pricingFields.map((field) => (
            <Grid item xs={12} sm={6}>
              <PriceFormTextField
                id={field.id}
                term={field.term}
                helperText={field.helperText}
                helperTextLabelId={field.helperTextLabelId}
                key={field.id}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AddressForm;
