import React from "react";
import { Typography } from "@mui/material";

interface GradientTextProps {
  children: React.ReactNode;
  typographyVariant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline";
  otherSx?: any;
}

const GradientText = (props: GradientTextProps) => {
  const { children, typographyVariant, otherSx = {} } = props;
  return (
    <Typography
      component="h1"
      variant={typographyVariant}
      sx={{
        background:
          "linear-gradient(90deg, rgba(13,24,117,1) 0%, rgba(27,126,163,1) 51%, rgba(0,212,255,1) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline",
        ...otherSx,
      }}
    >
      {children}
    </Typography>
  );
};

export default GradientText;
