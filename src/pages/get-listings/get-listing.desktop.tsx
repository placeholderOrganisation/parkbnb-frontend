import MapComponent from "../../components/listings/get-listings/Map";
import { GetListingsPageProps, ListingOnMap } from "../../types/global.types";

const GetListingsDesktopLayout = (props: GetListingsPageProps) => {
  const { searchResults } = props;
  
  const handleListingClickInMap = (listing: ListingOnMap) => {
    console.log('listing', listing)
    // dispatch(setUserSelectedListing(listing));
  };

  const handleMoveEndInMap = (listings: ListingOnMap[]) => {
    console.log('listings', listings)
    // dispatch(setListingsRenderedInMap(listings));
  };
  
  return (
    <MapComponent
      listings={searchResults}
      handleListingClick={handleListingClickInMap}
      handleMoveEnd={handleMoveEndInMap}
    />
  );
};

export default GetListingsDesktopLayout;
