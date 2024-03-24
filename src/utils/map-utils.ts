export const cityToCoords = {
  default: {
    lat: 43.708266,
    lng: -79.60997,
    zoom: 9,
  },
  brampton: {
    lat: 43.7315,
    lng: -79.7624,
    zoom: 11,
  },
  mississauga: {
    lat: 43.589,
    lng: -79.6441,
    zoom: 11,
  },
  toronto: {
    lat: 43.65107,
    lng: -79.347015,
    zoom: 11,
  },
  vaughan: {
    lat: 43.8361,
    lng: -79.4982,
    zoom: 11,
  },
  markham: {
    lat: 43.8561,
    lng: -79.337,
    zoom: 11,
  },
  oakville: {
    lat: 43.4675,
    lng: -79.6877,
    zoom: 11,
  },
};

export const getCityCoords = (cityName: string | null) => {
  if (!cityName) {
    return cityToCoords["default"];
  }
  if (Object.keys(cityToCoords).findIndex((city) => city === cityName) === -1) {
    return cityToCoords["default"];
  }
  return cityToCoords[cityName as keyof typeof cityToCoords];
};
