import { Divider, Stack, Typography } from "@mui/material";

interface ListingDescriptionProps {
  description: string;
}

const ListingDescription = (props: ListingDescriptionProps) => {
  const { description } = props;
  const shouldShowDescription =
    description && description.split(" ").length >= 5;

    console.log('description', description, description.split(" "))

  if (!shouldShowDescription) {
    return null;
  }

  return (
    <>
      <Divider />
      <Stack spacing={1}>
        <Typography variant="h5">About this space</Typography>
        <Typography variant="body1">{description}</Typography>
      </Stack>
    </>
  );
};

export default ListingDescription;
