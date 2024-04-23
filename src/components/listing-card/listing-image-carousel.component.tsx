import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";

interface ListingImageCarouselProps {
  images: string[];
}

const defaultImages = [
  "https://res.cloudinary.com/dvkw3ivfp/image/upload/v1713666013/default-fallback-image_fs8zd7.png",
];

const ListingImageCarousel = (props: ListingImageCarouselProps) => {
  const { images } = props;

  // todo: instead of checking images[0] check all images
  const hasImages = images && images.length > 0 && images[0] !== "";
  const imagesToDisplay = hasImages ? images : defaultImages;

  return (
    <Carousel showStatus={false} showThumbs={false}>
      {imagesToDisplay.map((image, index) => (
        <Box key={index}>
          <img
            src={image}
            alt={"listing image"}
            style={{
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default ListingImageCarousel;
