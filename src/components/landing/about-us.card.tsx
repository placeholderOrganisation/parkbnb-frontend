import { Card, CardContent, Typography } from "@mui/material";
import GradientText from "../custom-mui/gradient-text.component";

interface AboutUsCardProps {
  title: string;
  description: string;
  variant?: "light" | "dark";
}

const AboutUsCard = (props: AboutUsCardProps) => {
  const { title, description, variant = "light" } = props;

  const cardBgColor = variant === "dark" ? "black" : "paper.white";
  const cardTextColor = variant === "dark" ? "white" : "black";

  return (
    <Card
      sx={{
        borderRadius: 4,
        bgcolor: cardBgColor,
        color: cardTextColor,
      }}
    >
      <CardContent>
        <GradientText typographyVariant="h5">{title}</GradientText>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AboutUsCard;
