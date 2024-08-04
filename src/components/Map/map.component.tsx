import Map, {
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";

import { MapComponentProps } from "../../types/global.types";
import { Box } from "@mui/material";
import { getCityCoords, getListingCoords } from "../../utils/map-utils";
import { FeatureCollection } from "geojson";
import { NAVBAR_HEIGHT_MOBILE } from "../navbar/navbar-header.component";
import { useEffect, useRef } from "react";
import { highlightedLayerStyle, layerStyle } from "./layer-styling";
import { getURIParams } from "../../utils/browser-utils";
import { getListingFromListingOnMapResultsGivenId } from "../../utils/parking-utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import {
  userLocationLatitudeInitialState,
  userLocationLongitudeInitialState,
} from "../../redux/search-slice.util";

const TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

export const MapComponent = (props: MapComponentProps) => {
  const {
    city,
    listings,
    handleListingClick,
    handleMoveEnd,
    userSelectedListing,
  } = props;

  const { new_listing } = getURIParams();
  const { lat, lng, zoom } = getCityCoords(city);
  const mapRef = useRef<MapRef | undefined>();

  useEffect(() => {
    mapRef.current?.flyTo({ center: [lng, lat], duration: 1000, zoom: zoom });
  }, [city, mapRef.current]);

  useEffect(() => {
    if (new_listing) {
      const newlyCreatedListing = getListingFromListingOnMapResultsGivenId(
        listings,
        new_listing
      );
      const { lat, lng, zoom } = getListingCoords(newlyCreatedListing);
      mapRef.current?.flyTo({ center: [lng, lat], duration: 1000, zoom: zoom });
    }
  }, [new_listing, listings]);

  const userLocation = useSelector(
    (state: RootState) => state.search.userLocation
  );

  useEffect(() => {
    if (!userLocation) return;
    if (
      userLocation.latitude !== userLocationLatitudeInitialState &&
      userLocation.longitude !== userLocationLongitudeInitialState
    ) {
      mapRef.current?.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 1000,
        zoom: 14,
      });
    }
  }, [userLocation]);

  const { lat: latInRedux, lng: lngInRedux, zoom: zoomInRedux } = useSelector(
    (state: RootState) => state.map
  );

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [lngInRedux, latInRedux],
      duration: 1000,
      zoom: zoomInRedux,
    });
  }, [latInRedux, lngInRedux, zoomInRedux, mapRef.current]);

  const listingsRenderedInMap: FeatureCollection = {
    type: "FeatureCollection",
    // @ts-ignore
    features: listings.filter(
      (listing) =>
        listing.properties._id !== userSelectedListing?.properties._id
    ),
  };

  const currentUserSelection: FeatureCollection = {
    type: "FeatureCollection",
    // @ts-ignore
    features: listings.filter(
      (listing) =>
        listing.properties._id === userSelectedListing?.properties._id
    ),
  };

  const moveEndHandler = (e: ViewStateChangeEvent) => {
    const listingsInView = e.target.queryRenderedFeatures({
      // @ts-ignore
      layers: ["listingsRenderedInMap", "currentUserSelection"],
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
        // @ts-expect-error
        ref={mapRef}
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
        interactiveLayerIds={["listingsRenderedInMap", "currentUserSelection"]}
      >
        <Source type="geojson" data={listingsRenderedInMap}>
          <Layer {...layerStyle} />
        </Source>
        <Source type="geojson" data={currentUserSelection}>
          <Layer {...highlightedLayerStyle} />
        </Source>
      </Map>
    </Box>
  );
};
