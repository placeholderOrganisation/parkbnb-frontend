import MapComponent from "../../components/listings/get-listings/Map";

const GetListingsDesktopLayout = (props: GetListingsMobilePageProps) => {
  const { listings } = props;
  return <MapComponent listings={listings} />;
};

export default GetListingsDesktopLayout;
