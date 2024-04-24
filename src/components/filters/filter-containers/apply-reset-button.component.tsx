import { Button, Stack } from "@mui/material";

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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={handleResetFilters}
      >
        Reset
      </Button>
    </Stack>
  );
};

export default ApplyResetFilterButtons;
