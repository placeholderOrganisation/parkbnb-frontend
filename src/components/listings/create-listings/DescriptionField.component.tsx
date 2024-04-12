import { TextField } from "@mui/material";
import React, { useState } from "react";

interface DescriptionFieldProps {
  descriptionInRedux: string;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DescriptionField = (props: DescriptionFieldProps) => {
  const { descriptionInRedux, handleDescriptionChange } = props;

  const [userDescription, setUserDescription] = useState(descriptionInRedux);

  const handleUserDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDescription(event.target.value);
    handleDescriptionChange(event);
  }

  return (
    <TextField
      variant="outlined"
      id="description"
      name="description"
      label="Describe your space"
      value={userDescription}
      fullWidth
      multiline
      rows={5}
      onChange={handleUserDescriptionChange}
    />
  );
};

export default DescriptionField;
