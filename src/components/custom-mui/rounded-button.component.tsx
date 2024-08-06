import { Button } from "@mui/material";

interface RoundedButtonProps {
  otherSx?: any;
  otherProps?: any;
  children: React.ReactNode;
}

const RoundedButton = (props: RoundedButtonProps) => {
  const { otherSx = {}, otherProps, children } = props;
  return (
    <Button
      sx={{
        borderRadius: 5,
        ...otherSx,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default RoundedButton;
