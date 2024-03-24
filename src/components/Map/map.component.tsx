import { useState, useMemo } from "react";
import Map, { Marker } from "react-map-gl";

import Pin from "./Pin";

import { MapComponentProps } from "../../types/global.types";
import { Box } from "@mui/material";
import { getCityCoords } from "../../utils/map-utils";

const TOKEN =
  "pk.eyJ1IjoiY29kZXJzYmV5b25kIiwiYSI6ImNsc3ZhYmk1NjBobnQya3JxaWoyYXpleXoifQ.igcdok9oqUQAML9i3gyH_w";

const MapComponent = (props: MapComponentProps) => {
  const { listings, handleListingClick } = props;
  const { lat, lng, zoom } = getCityCoords("default");

  const pins = useMemo(
    () =>
      listings.map((listing, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={listing.geometry.coordinates[0]}
          latitude={listing.geometry.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            handleListingClick(listing.properties.id);
          }}
        >
          <Pin label={`$${listing.properties.price.monthly}`} />
        </Marker>
      )),
    [listings]
  );

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={TOKEN}
      >
        {pins}
      </Map>
    </Box>
  );
};

export default MapComponent;
