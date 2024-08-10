import { SymbolLayer } from "mapbox-gl";
import { CircleLayer } from "mapbox-gl";
import { LayerProps } from "react-map-gl";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#42a5f5",
      100,
      "#42a5f5",
      750,
      "#42a5f5",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

// @ts-ignore
export const layerStyle: CircleLayer = {
  id: "listingsRenderedInMap",
  type: "circle",
  paint: {
    "circle-color": "#4264fb",
    "circle-radius": 8,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};

// @ts-ignore
export const iconLayerStyle: SymbolLayer = {
  id: "listingsRenderedInMap",
  type: "symbol",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "text-field": ["concat", "$", ["get", "monthly", ["get", "price"]]],
    "text-size": 12,
    "text-anchor": "center",
    "icon-image": "custom-icon",
    "icon-text-fit": "both",
    "icon-allow-overlap": true,
    "text-allow-overlap": true,
  },
  paint: {
    "text-halo-color": "black",
    "text-color": "black",
    "text-halo-width": 0.25,
  },
};

// @ts-ignore
export const highlightedLayerStyle: CircleLayer = {
  id: "currentUserSelection",
  type: "circle",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#4264fb",
    "circle-radius": 16,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};
