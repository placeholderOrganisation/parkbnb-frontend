import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import AmenitiesFilter from "../../filters/amenities-filter.component";
import PriceFilter from "../../filters/price-filter.component";
import StorageTypeFilter from "../../filters/storage-type-filter.component";
import VehicleTypeFilter from "../../filters/vehicle-type-filter.component";
import DimensionsFilter from "../../filters/dimensions-filter.component";
import NumSpacesFilter from "../../filters/num-spaces-filter.component";
import ImagePicker from "./ImagePicker.component";

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

  console.log('first', dailyRate, monthlyRate)
  const componentsToRender = [
    {
      title: "Images",
      component: (
        <Stack direction="row" spacing={2}>
          <ImagePicker imagesInRedux={imagesInRedux} index={0} disabled />
          <ImagePicker imagesInRedux={imagesInRedux} index={1} disabled />
        </Stack>
      ),
    },
    {
      title: "Address",
      component: (
        <Stack spacing={1}>
          <Typography variant="subtitle1">{`${street}, ${city}, ${province}, ${postal}, ${country}`}</Typography>
        </Stack>
      ),
    },
    {
      title: "Description",
      component: (
        <Stack spacing={1}>
          <Typography variant="subtitle1">{descriptionInRedux}</Typography>
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
