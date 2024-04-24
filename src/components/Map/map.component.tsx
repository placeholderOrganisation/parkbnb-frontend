import Map, {
  CircleLayer,
  Layer,
  MapLayerMouseEvent,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";

import { MapComponentProps } from "../../types/global.types";
import { Box } from "@mui/material";
import { getCityCoords } from "../../utils/map-utils";
import { FeatureCollection } from "geojson";
import { NAVBAR_HEIGHT_MOBILE } from "../navbar/navbar-header.component";

const TOKEN =
  "pk.eyJ1IjoiY29kZXJzYmV5b25kIiwiYSI6ImNsc3ZhYmk1NjBobnQya3JxaWoyYXpleXoifQ.igcdok9oqUQAML9i3gyH_w";

const MapComponent = (props: MapComponentProps) => {
  const { listings, handleListingClick, handleMoveEnd } = props;
  const { lat, lng, zoom } = getCityCoords("default");

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    // @ts-ignore
    features: listings,
  };

  const layerStyle: CircleLayer = {
    id: "point_fill",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
    source: "my-data",
  };

  const moveEndHandler = (e: ViewStateChangeEvent) => {
    const listingsInView = e.target.queryRenderedFeatures({
      // @ts-ignore
      layers: ["point_fill"],
    });
    const listingIdsInView = listingsInView.map(
      (listing) => listing.properties?._id
    );
    handleMoveEnd(listingIdsInView);
  };

  // add onclick handler for layers
  const clickHandler = (e: MapLayerMouseEvent) => {
    const features = e.features;
    if (!features || features.length === 0) return;
    const listing = features[0];
    const listingId = listing.properties?._id;
    handleListingClick(listingId);
  };

  return (
    <Box
      sx={{
        height: `calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px)`,
        width: "100%",
      }}
    >
      <Map
        reuseMaps
        onMoveEnd={moveEndHandler}
        onClick={clickHandler}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={TOKEN}
        interactiveLayerIds={['point_fill']}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle}  />
        </Source>
      </Map>
    </Box>
  );
};

export default MapComponent;
