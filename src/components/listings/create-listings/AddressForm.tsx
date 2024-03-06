import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

interface AddressFormTextFieldProps {
  id: string;
  name: string;
  label: string;
  autoComplete?: string;
}

interface PriceFormTextFields {
  id: string;
  term: string;
  helperText: string;
  helperTextLabelId: string;
}

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

export default function AddressForm() {
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
          <Grid item xs={12} sm={6}>
            <AddressFormTextField
              id="city"
              name="city"
              label="City"
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressFormTextField
              id="state"
              name="state"
              label="Province"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressFormTextField
              id="zip"
              name="zip"
              label="Postal code"
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressFormTextField
              id="country"
              name="country"
              label="Country"
              autoComplete="shipping country"
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
          <Grid item xs={12} sm={6}>
            <PriceFormTextField
              id="per-day-price"
              term="day"
              helperTextLabelId="daily-price-input"
              helperText="Daily price"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PriceFormTextField
              id="per-month-price"
              term="month"
              helperTextLabelId="montly-price-input"
              helperText="Monthly price"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
