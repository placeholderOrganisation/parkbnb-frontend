import MapComponent from "../../components/listings/get-listings/Map";
import { GetListingsMobilePageProps } from "../../types/global.types";

const GetListingsDesktopLayout = (props: GetListingsMobilePageProps) => {
  const { listings } = props;
  return <MapComponent listings={listings} />;
};

export default GetListingsDesktopLayout;
