import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [lng] = useState(-79.766670);
  const [lat] = useState(43.683334);
  const [zoom] = useState(10);
  const [API_KEY] = useState('K2TF4ZbTEqR4Pcy2ENA5');

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
    container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });
    

  }, [API_KEY, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}