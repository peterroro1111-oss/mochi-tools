'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon for webpack/Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationMapProps {
  lat: number;
  lng: number;
  onPositionChange: (lat: number, lng: number) => void;
  searchPlaceholder: string;
  latLabel: string;
  lngLabel: string;
}

function MapClickHandler({ onPositionChange }: { onPositionChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [map, lat, lng]);
  return null;
}

export default function LocationMap({ lat, lng, onPositionChange, searchPlaceholder, latLabel, lngLabel }: LocationMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
        { headers: { 'Accept-Language': 'zh,en' } }
      );
      const data = await res.json();
      if (data.length > 0) {
        const newLat = parseFloat(data[0].lat);
        const newLng = parseFloat(data[0].lon);
        onPositionChange(newLat, newLng);
      }
    } catch {
      // silently fail
    } finally {
      setSearching(false);
    }
  }, [searchQuery, onPositionChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      handleSearch();
    }
  };

  const handleMarkerDrag = useCallback(
    (e: L.DragEndEvent) => {
      const marker = e.target as L.Marker;
      const pos = marker.getLatLng();
      onPositionChange(pos.lat, pos.lng);
    },
    [onPositionChange]
  );

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={searchPlaceholder}
          className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-gray-700"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-pink-400 hover:text-pink-600 transition-colors disabled:opacity-50"
          aria-label="Search"
        >
          {searching ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Lat/Lng display */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{latLabel}</label>
          <div className="px-4 py-3 rounded-xl border-2 border-pink-100 bg-pink-50/30 text-gray-600 text-sm font-mono">
            {lat.toFixed(6)}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{lngLabel}</label>
          <div className="px-4 py-3 rounded-xl border-2 border-pink-100 bg-pink-50/30 text-gray-600 text-sm font-mono">
            {lng.toFixed(6)}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border-2 border-pink-100" style={{ height: 'clamp(300px, 40vw, 400px)' }}>
        <MapContainer
          center={[lat, lng]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[lat, lng]}
            icon={defaultIcon}
            draggable={true}
            eventHandlers={{ dragend: handleMarkerDrag }}
          />
          <MapClickHandler onPositionChange={onPositionChange} />
          <RecenterMap lat={lat} lng={lng} />
        </MapContainer>
      </div>
    </div>
  );
}
