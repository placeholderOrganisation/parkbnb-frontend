// import MapComponent from "../../components/listings/get-listings/Map";
import MapComponent from "../../components/Map/map.component";
import { GetListingsPageProps } from "../../types/global.types";

const GetListingsDesktopLayout = (props: GetListingsPageProps) => {
  // const { searchResults, handleListingClickInMap, handleMoveEndInMap } = props;

  return (
    <MapComponent
      // listings={searchResults}
      // handleListingClick={handleListingClickInMap}
      // handleMoveEnd={handleMoveEndInMap}
    />
  );
};

export default GetListingsDesktopLayout;
