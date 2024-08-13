import Map, {
  GeoJSONSource,
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";

import { ListingOnMap, MapComponentProps } from "../../types/global.types";
import { Box } from "@mui/material";
import { getListingCoords } from "../../utils/map-utils";
import { FeatureCollection } from "geojson";
import { NAVBAR_HEIGHT_MOBILE } from "../navbar/navbar-header.component";
import { useEffect, useRef } from "react";
import {
  highlightedLayerStyle,
  iconLayerStyle,
  clusterLayer,
  clusterCountLayer,
} from "./layer-styling";
import { getURIParams } from "../../utils/browser-utils";
import { getListingFromListingOnMapResultsGivenId } from "../../utils/parking-utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
// import {
//   userLocationLatitudeInitialState,
//   userLocationLongitudeInitialState,
// } from "../../redux/search-slice.util";
import { GeoJSONFeature } from "mapbox-gl";
import { callAnalytics } from "../../utils/amplitude-utils";

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
  const { lat, lng, zoom } = useSelector((state: RootState) => state.map);

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

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [lng, lat],
      duration: 1000,
      zoom: zoom,
    });
  }, [lat, lng, zoom, mapRef.current]);

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

    let listingIdsInView = listingsInView.map(
      (listing) => listing.properties?._id
    );

    const clusterIdsInView = e.target.queryRenderedFeatures({
      // @ts-ignore
      layers: [clusterLayer.id],
    });

    if (clusterIdsInView.length > 0) {
      const promises = clusterIdsInView.map((clusterFeature) => {
        const clusterId = clusterFeature.properties?.cluster_id;
        return clusterId ? fetchClusterLeaves(clusterId) : Promise.resolve([]);
      });

      Promise.all(promises)
        .then((allClustersFeatures) => {
          const allFeatures = allClustersFeatures.flat();
          allFeatures.forEach((feature) => {
            listingsInView.push(feature);
          });

          listingIdsInView = Array.from(
            new Set(listingsInView.map((listing) => listing.properties?._id))
          );
          handleMoveEnd(listingIdsInView);
        })
        .catch((error) => {
          callAnalytics("error fetching cluster leaves", {
            error,
          });
        });
    } else {
      handleMoveEnd(listingIdsInView);
    }
  };

  const fetchClusterLeaves = (clusterId: number): Promise<GeoJSONFeature[]> => {
    const map = mapRef.current?.getMap();
    if (!map) return Promise.resolve([]);

    const mapboxSource = map.getSource(
      "listingsRenderedInMap"
    ) as GeoJSONSource;

    // Return a new Promise that resolves with the features
    return new Promise((resolve, reject) => {
      mapboxSource.getClusterLeaves(
        clusterId,
        Infinity,
        0,
        (error, features) => {
          if (error) {
            reject(error);
            return;
          }
          if (!features) {
            resolve([]);
            return;
          }

          // Resolve the promise with the features
          // @ts-expect-error features is GeoJSONFeature[]
          resolve(features);
        }
      );
    });
  };

  // add onclick handler for layers
  const clickHandler = (e: MapLayerMouseEvent) => {
    const features = e.features;
    if (!features || features.length === 0) return;

    const listing = features[0];
    const listingId = listing.properties?._id;
    const clusterId = listing.properties?.cluster_id;
    if (listingId) {
      handleListingClick(listingId);
    } else if (clusterId) {
      handleClusterClick(clusterId);
    }
  };

  const handleClusterClick = (clusterId: number) => {
    const map = mapRef.current?.getMap();
    // debugger;
    if (!map) return;

    const mapboxSource = map.getSource(
      "listingsRenderedInMap"
    ) as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapboxSource.getClusterLeaves(
        clusterId,
        Infinity,
        0,
        (error, features) => {
          if (error) throw error;
          if (!features) return;
          // @ts-expect-error features is ListingOnMap[]
          const firstFeature: ListingOnMap = features[0];
          map.easeTo({
            // @ts-expect-error coordinates is number[]
            center: firstFeature.geometry.coordinates,
            zoom: zoom || undefined,
            duration: 500,
          });
        }
      );
    });
  };

  const handleMapLoad = () => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const loadImage = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/map-icon.png`
      );
      const imageBlob = await response.blob();
      const image = URL.createObjectURL(imageBlob);

      map.loadImage(image, (error, loadedImage) => {
        if (error) throw error;
        if (!loadedImage) return;
        map.addImage("custom-icon", loadedImage, {
          stretchX: [
            [25, 55],
            [85, 115],
          ],
          stretchY: [[25, 100]],
          content: [25, 25, 115, 100],
          pixelRatio: 5,
        });
      });
    };

    if (map.isStyleLoaded()) {
      loadImage();
    } else {
      map.on("style.load", loadImage);
    }
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
        onLoad={handleMapLoad}
        onMoveEnd={moveEndHandler}
        onClick={clickHandler}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={TOKEN}
        interactiveLayerIds={[
          "listingsRenderedInMap",
          "currentUserSelection",
          clusterLayer.id || "",
        ]}
      >
        <Source
          id="listingsRenderedInMap"
          type="geojson"
          data={listingsRenderedInMap}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...iconLayerStyle} />
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
        </Source>
        <Source type="geojson" data={currentUserSelection}>
          <Layer {...highlightedLayerStyle} />
        </Source>
      </Map>
    </Box>
  );
};
