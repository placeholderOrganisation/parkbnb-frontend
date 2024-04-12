import { Box, Grid } from "@mui/material";
import { PriceFormTextField } from "../listings/create-listings/AddressForm";
import { useState } from "react";
import { MAX_PRICE } from "../../types/global.types";

interface PriceFilterProps {
  pricingFilterFields: {
    id: string;
    helperText: string;
    helperTextLabelId: string;
  }[];
  priceInRedux?: {
    monthlyMin: number;
    monthlyMax: number;
  };
  handleMonthlyPriceFilterChange?: (minPrice: number, maxPrice: number) => void;
  disabled?: boolean;
}

const PriceFilter = (props: PriceFilterProps) => {
  const {
    pricingFilterFields,
    priceInRedux,
    handleMonthlyPriceFilterChange = () => {},
    disabled = false,
  } = props;

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

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (fieldName === "minimum-price") {
      return handleMinPriceChange(event);
    } else {
      return handleMaxPriceChange(event);
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
              handleChange={(event) => {
                handlePriceChange(event, field.id);
              }}
              // downstream I do not render number input if value === ""
              // so it should be safe to pass a "" here
              // @ts-expect-error
              value={displayPrice(field.id)}
              disabled={disabled}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PriceFilter;
