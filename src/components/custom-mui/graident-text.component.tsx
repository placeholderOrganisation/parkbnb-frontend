import React, { Children } from "react";
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
}

const GradientText = (props: GradientTextProps) => {
  const { children, typographyVariant } = props;
  return (
    <Typography
      component="h1"
      variant={typographyVariant}
      sx={{
        background:
          "linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(14,33,124,1) 50%, rgba(13,24,117,1) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline",
      }}
    >
      {children}
    </Typography>
  );
};

export default GradientText;
