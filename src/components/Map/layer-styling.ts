import { SymbolLayer } from "mapbox-gl";
import { CircleLayer } from "mapbox-gl";

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
  paint: {
    "circle-color": "#4264fb",
    "circle-radius": 16,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};
