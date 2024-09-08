import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  city: {
    name: string;
    lat: number;
    lng: number;
  } | null;
}

function Map({ city }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      L.control.layers({
        'Street': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
      }).addTo(mapRef.current);
    }

    if (city) {
      mapRef.current.setView([city.lat, city.lng], 10);
      L.marker([city.lat, city.lng])
        .addTo(mapRef.current)
        .bindPopup(city.name)
        .openPopup();
    }
  }, [city]);

  return <div id="map" className="h-96 rounded-lg shadow-md"></div>;
}

export default Map;