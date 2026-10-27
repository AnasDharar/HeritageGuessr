"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Guess } from "@/lib/types";

function PinSetter({ onPick, locked }: { onPick: (point: Guess) => void; locked: boolean }) {
  useMapEvents({
    click(event) {
      if (!locked) {
        onPick({ latitude: event.latlng.lat, longitude: event.latlng.lng });
      }
    },
  });
  return null;
}

function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function GuessMap({
  value,
  onPick,
  locked,
}: {
  value: Guess | null;
  onPick: (point: Guess) => void;
  locked: boolean;
}) {
  return (
    <MapContainer
      center={[22.8, 79]}
      zoom={4}
      scrollWheelZoom
      className="guess-map"
      style={{ height: "100%", width: "100%" }}
      aria-label="Interactive world map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PinSetter onPick={onPick} locked={locked} />
      <MapResizeHandler />
      {value && (
        <CircleMarker
          center={[value.latitude, value.longitude]}
          radius={9}
          pathOptions={{ color: "#9d3e24", fillColor: "#9d3e24", fillOpacity: 0.9 }}
        />
      )}
    </MapContainer>
  );
}
