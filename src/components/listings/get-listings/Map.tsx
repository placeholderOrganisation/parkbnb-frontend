import { useRef, useEffect, useState } from "react";

import { Box } from "@mui/material";
import mapboxgl, { PointLike } from "mapbox-gl";
import { NAVBAR_HEIGHT_MOBILE } from "../../navbar/navbar-header.component";

// Mapbox access token
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZXJzYmV5b25kIiwiYSI6ImNsc3ZhYmk1NjBobnQya3JxaWoyYXpleXoifQ.igcdok9oqUQAML9i3gyH_w";

interface MapComponentProps {
  listings: any;
}

const MapComponent = (props: MapComponentProps) => {
  const { listings } = props;
  const mapContainer = useRef(null);
  let map: mapboxgl.Map | null = null;
  const [lng, setLng] = useState(-79.731989);
  const [lat, setLat] = useState(43.760685);
  const [zoom, setZoom] = useState(14);

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

      map!.on("mouseenter", "places", (e) => {
        // Change the cursor style as a UI indicator.
        map!.getCanvas().style.cursor = "pointer";

        // Copy coordinates array.
        // @ts-ignore
        const coordinates = e.features[0].geometry.coordinates.slice();
        // @ts-ignore
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map!);
      });

      map!.on("moveend", () => {
        // @ts-ignore
        const features = map!.queryRenderedFeatures({ layers: ["places"] });

        if (features) {
          console.log("features", features);
        }
      });

      map!.on("mouseleave", "places", () => {
        map!.getCanvas().style.cursor = "";
        popup.remove();
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
          console.log(feature.properties);
        });
      });
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
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
