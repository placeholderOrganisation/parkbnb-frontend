import { Box, Grid } from "@mui/material";
import { PriceFormTextField } from "../listings/create-listings/AddressForm";
import { useState } from "react";
import { MAX_PRICE } from "../../types/global.types";

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

interface PriceFilterProps {
  priceInRedux?: {
    monthlyMin: number;
    monthlyMax: number;
  };
  handleMonthlyPriceFilterChange?: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter = (props: PriceFilterProps) => {
  const { priceInRedux, handleMonthlyPriceFilterChange = () => {} } = props;

  const [minPrice, setMinPrice] = useState<number>(
    priceInRedux?.monthlyMin || 0
  );

  const [maxPrice, setMaxPrice] = useState<number>(
    priceInRedux?.monthlyMax || Number.MAX_VALUE
  );

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
    handleMonthlyPriceFilterChange(Number(event.target.value), maxPrice);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
    handleMonthlyPriceFilterChange(minPrice, Number(event.target.value));
  };

  const displayPrice = (fieldName: string) => {
    if (fieldName === "minimum-price") {
      return minPrice === 0 ? "" : minPrice;
    } else {
      if (priceInRedux?.monthlyMax === 0) {
        return "";
      }
      return maxPrice === Number.MAX_VALUE ? MAX_PRICE : maxPrice;
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {pricingFilterFields.map((field) => (
          <Grid item xs={6} key={field.id}>
            <PriceFormTextField
              id={field.id}
              name={field.id}
              helperText={field.helperText}
              helperTextLabelId={field.helperTextLabelId}
              handleChange={
                field.id === "minimum-price"
                  ? handleMinPriceChange
                  : handleMaxPriceChange
              }
              // downstream I do not render number input if value === ""
              // so it should be safe to pass a "" here
              // @ts-expect-error
              value={displayPrice(field.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PriceFilter;
