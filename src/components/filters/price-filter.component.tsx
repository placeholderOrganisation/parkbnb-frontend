import { Box, Grid, Typography } from "@mui/material";
import { PriceFormTextField } from "../listings/create-listings/AddressForm";

const pricingFilterFields = [
  {
    id: "minimum-price",
    helperText: "min price",
    helperTextLabelId: "min-price-input",
  },
  {
    id: "maximum-price",
    helperText: "max price",
    helperTextLabelId: "max-price-input",
  },
];
const PriceFilter = () => {
  return (
    <Box sx={{ pt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Pricing
      </Typography>
      <Grid container spacing={3}>
        {pricingFilterFields.map((field) => (
          <Grid item xs={6} key={field.id}>
            <PriceFormTextField
              id={field.id}
              helperText={field.helperText}
              helperTextLabelId={field.helperTextLabelId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PriceFilter;
