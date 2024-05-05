import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import AmenitiesFilter from "../../filters/amenities-filter.component";
import PriceFilter from "../../filters/price-filter.component";
import StorageTypeFilter from "../../filters/storage-type-filter.component";
import VehicleTypeFilter from "../../filters/vehicle-type-filter.component";
import DimensionsFilter from "../../filters/dimensions-filter.component";
import NumSpacesFilter from "../../filters/num-spaces-filter.component";
import { CustomImage } from "./image-picker/image-picker-custom-image.component";
import { useEffect } from "react";
import { callAnalytics } from "../../../utils/amplitude-utils";

const pricingFilterFields = [
  {
    id: "minimum-price",
    helperText: "daily price",
    helperTextLabelId: "daily-price-input",
  },
  {
    id: "maximum-price",
    helperText: "monthly price",
    helperTextLabelId: "monthly-price-input",
  },
];

const Review = () => {
  const {
    amenities: amenitiesInRedux,
    storageType: storageTypeInRedux,
    vehicleTypes: vehicleTypesInRedux,
    dimensions: dimensionsInRedux,
    numSpaces: numSpacesInRedux,
  } = useSelector((state: RootState) => state.stepTwoForm);

  const {
    street,
    city,
    postal,
    province,
    country,
    dailyRate,
    monthlyRate,
  } = useSelector((state: RootState) => state.stepOneForm);

  const {
    description: descriptionInRedux,
    images: imagesInRedux,
  } = useSelector((state: RootState) => state.stepThreeForm);

  const isThereAtLeastOneImage = imagesInRedux.some((image) => image !== null);
  const firstImage = imagesInRedux.length >= 1 ? imagesInRedux[0] : null;
  const secondImage = imagesInRedux.length >= 2 ? imagesInRedux[1] : null;

  const componentsToRender = [
    {
      title: "Address",
      component: (
        <Stack spacing={1}>
          <Typography variant="subtitle1">{`${street}, ${city}, ${province}, ${postal}, ${country}`}</Typography>
        </Stack>
      ),
    },
    {
      title: "Images",
      component: isThereAtLeastOneImage ? (
        <Stack direction="row" spacing={2}>
          <CustomImage src={firstImage} />
          <CustomImage src={secondImage} />
        </Stack>
      ) : (
        <Typography variant="subtitle1">{"No images provided"}</Typography>
      ),
    },
    {
      title: "Description",
      component: (
        <Stack spacing={1}>
          <Typography variant="subtitle1">
            {descriptionInRedux
              ? descriptionInRedux
              : "No description provided"}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "Amenities",
      component: (
        <AmenitiesFilter amenitiesInRedux={amenitiesInRedux} disabled />
      ),
    },
    {
      title: "Price",
      component: (
        <PriceFilter
          pricingFilterFields={pricingFilterFields}
          priceInRedux={{
            monthlyMin: dailyRate,
            monthlyMax: monthlyRate,
          }}
          disabled
        />
      ),
    },
    {
      title: "Storage type",
      component: (
        <StorageTypeFilter storageTypeInRedux={storageTypeInRedux} disabled />
      ),
    },
    {
      title: "Vehicle type",
      component: (
        <VehicleTypeFilter vehicleTypesInRedux={vehicleTypesInRedux} disabled />
      ),
    },
    {
      title: "Dimensions",
      component: (
        <DimensionsFilter dimensionsInRedux={dimensionsInRedux} disabled />
      ),
    },
    {
      title: "Number of spaces",
      component: (
        <NumSpacesFilter numSpacesInRedux={numSpacesInRedux} disabled />
      ),
    },
  ];

  useEffect(() => {
    callAnalytics("review_section_viewed");
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ pt: 5 }}>
        Listing summary
      </Typography>
      {componentsToRender.map((component) => (
        <Stack spacing={1.5} key={component.title}>
          <Typography variant="h6">{component.title}</Typography>
          {component.component}
        </Stack>
      ))}
    </Stack>
  );
};

export default Review;
