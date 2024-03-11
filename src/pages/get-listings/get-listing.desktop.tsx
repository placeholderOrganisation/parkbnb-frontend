import MapComponent from "../../components/listings/get-listings/Map";
import { GetListingsMobilePageProps, Listing } from "../../types/global.types";

const GetListingsDesktopLayout = (props: GetListingsMobilePageProps) => {
  const { listings } = props;
  const handleListingClickInMap = (listing: Listing) => {
    console.log("listing", listing);
  };
  const handleMoveEndInMap = (listings: Listing[]) => {
    console.log("move end", listings);
  };
  
  return (
    <MapComponent
      listings={listings}
      handleListingClick={handleListingClickInMap}
      handleMoveEnd={handleMoveEndInMap}
    />
  );
};

export default GetListingsDesktopLayout;
