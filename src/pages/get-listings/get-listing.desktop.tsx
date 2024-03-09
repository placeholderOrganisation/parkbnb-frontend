import MapComponent from "../../components/listings/get-listings/Map";

const GetListingsDesktopLayout = () => {
  const listings = [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.731989, 43.760685],
      },
      properties: {
        title: "Mapbox",
        description: "<h2>$500</h2>",
        id: 1,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.727397, 43.763645],
      },
      properties: {
        title: "Mapbox",
        description: "<h2>$300</h2>",
        id: 2,
      },
    },
  ];
  return <MapComponent listings={listings} />;
};

export default GetListingsDesktopLayout;
