import { VehicleTypeToDimensions } from "../types/create-listing-form.types";

export const steps = ["Address", "Filters", "Optional details", "Review"];

export const vehicleTypes = [
  "bike",
  "sedan / suv",
  "pickup truck",
  "boat / RV",
  "commercial truck / trailer",
];

export const vehicleTypeToDimensions: VehicleTypeToDimensions = {
  bike: "bike",
  "sedan / suv": "sedan or suv",
  "pickup truck": "pickup truck",
  "boat / RV": "boat or RV",
  "commercial truck / trailer": "commercial truck or trailer",
};
