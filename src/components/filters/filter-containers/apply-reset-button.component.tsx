import { Stack } from "@mui/material";
import RoundedButton from "../../custom-mui/rounded-button.component";

interface ApplyResetFilterButtonsProps {
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
}

const ApplyResetFilterButtons = (props: ApplyResetFilterButtonsProps) => {
  const { handleApplyFilters, handleResetFilters } = props;
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        my: 3,
        mx: [2, 0],
      }}
    >
      <RoundedButton
        otherProps={{
          variant: "contained",
          color: "primary",
          fullWidth: true,
          onClick: handleApplyFilters,
        }}
      >
        Apply
      </RoundedButton>
      <RoundedButton
        otherProps={{
          variant: "outlined",
          color: "primary",
          fullWidth: true,
          onClick: handleResetFilters,
        }}
      >
        Reset
      </RoundedButton>
    </Stack>
  );
};

export default ApplyResetFilterButtons;
