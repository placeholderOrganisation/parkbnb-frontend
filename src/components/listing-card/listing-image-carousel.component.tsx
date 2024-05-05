import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";

interface ListingImageCarouselProps {
  images: string[];
}

const defaultImages = [
  "https://res.cloudinary.com/dvkw3ivfp/image/upload/v1713666013/default-fallback-image_fs8zd7.png",
];

const ListingImageCarousel = (props: ListingImageCarouselProps) => {
  const { images } = props;

  const isDesktopView = isDesktop();
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
              height: isDesktopView ? "300px" : "100%",
              maxHeight: "70vh",
              objectFit: isDesktopView ? "cover" : "contain",
              borderRadius: isDesktopView ? "25px" : "0px"
            }}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default ListingImageCarousel;
