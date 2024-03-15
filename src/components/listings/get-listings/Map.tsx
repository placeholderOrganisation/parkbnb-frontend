import { useRef, useEffect } from "react";

import { Box } from "@mui/material";
import mapboxgl, { PointLike } from "mapbox-gl";
import { NAVBAR_HEIGHT_MOBILE } from "../../navbar/navbar-header.component";
import { MapComponentProps } from "../../../types/global.types";

// Mapbox access token
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZXJzYmV5b25kIiwiYSI6ImNsc3ZhYmk1NjBobnQya3JxaWoyYXpleXoifQ.igcdok9oqUQAML9i3gyH_w";

const MapComponent = (props: MapComponentProps) => {
  const { listings, handleListingClick, handleMoveEnd } = props;
  const zoom = 14;
  const lng = -79.731989;
  const lat = 43.760685;
  const mapContainer = useRef(null);
  let map: mapboxgl.Map | null = null;

  useEffect(() => {
    if (map) return;
    // @ts-ignore
    map = new mapboxgl.Map({
      // @ts-ignore
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      // cluster: true,
    });

    map.on("load", () => {
      map!.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          // @ts-ignore
          features: listings,
        },
      });
      // Add a layer showing the places.
      map!.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        paint: {
          "circle-color": "#4264fb",
          "circle-radius": 10,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      map!.on("moveend", () => {
        // @ts-ignore
        const features = map!.queryRenderedFeatures({ layers: ["places"] });

        if (features) {
          const listings = features.map((feature) => feature.properties);
          // @ts-ignore
          handleMoveEnd(listings);
        }
      });

      map!.on("click", (e) => {
        // Set `bbox` as 5px reactangle area around clicked point.
        const bbox: [PointLike, PointLike] = [
          [e.point.x - 1, e.point.y - 1],
          [e.point.x + 1, e.point.y + 1],
        ];
        // Find features intersecting the bounding box.
        const selectedFeatures = map!.queryRenderedFeatures(bbox, {
          layers: ["places"],
        });
        selectedFeatures.map((feature) => {
          // @ts-ignore
          handleListingClick(feature.properties);
        });
      });
    });
  });

  return (
    <Box>
      <Box
        ref={mapContainer}
        className="map-container"
        sx={{
          height: `calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px)`,
          width: "100%",
        }}
      />
    </Box>
  );
};
export default MapComponent;
