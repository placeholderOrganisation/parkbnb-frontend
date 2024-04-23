import { Stack, Typography } from "@mui/material";

interface PricingBarProps {
  price: {
    daily: number;
    monthly: number;
  };
}

const PricingBar = (props: PricingBarProps) => {
  const { price } = props;
  const { daily, monthly } = price;
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography variant="body1">${monthly}/month</Typography>
        <Typography variant="body1">•</Typography>
        <Typography variant="body1">${daily}/day</Typography>
      </Stack>
    </>
  );
};

export default PricingBar;
