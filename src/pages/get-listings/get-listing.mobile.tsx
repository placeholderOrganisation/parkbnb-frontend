import MapComponent from "../../components/listings/get-listings/Map";
import GetListingBottomDrawer from "../../components/drawers/get-listing-bottom-drawer.component";

const GetListingsMobileLayout = (props: GetListingsMobilePageProps) => {
  const { listings } = props;

  return (
    <>
      <MapComponent listings={listings} />;
      <GetListingBottomDrawer />
    </>
  );
};

export default GetListingsMobileLayout;
