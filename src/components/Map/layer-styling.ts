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
