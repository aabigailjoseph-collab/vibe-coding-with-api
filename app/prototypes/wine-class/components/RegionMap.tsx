"use client";

// Interactive map built on Leaflet (free, open-source) with a minimal CARTO basemap.
// Leaflet touches `window`, so we import it inside useEffect (browser only).

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, CircleMarker } from 'leaflet';
import styles from '../styles.module.css';

export type MapPin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  note?: string;
};

type Props = {
  center: [number, number];
  zoom: number;
  pins: MapPin[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
  height?: number;
  showLabels?: boolean;
};

export default function RegionMap({ center, zoom, pins, activeId, onSelect, height = 520, showLabels = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, CircleMarker>>({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // Create the map once per set of pins.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center,
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 18,
      }).addTo(map);

      pins.forEach((pin) => {
        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: 9,
          color: '#ffffff',
          weight: 2,
          fillColor: pin.color,
          fillOpacity: 0.95,
        }).addTo(map);
        marker.bindTooltip(pin.name, {
          direction: 'top',
          offset: [0, -8],
          permanent: showLabels,
          className: styles.mapTooltip,
        });
        if (pin.note) {
          marker.bindPopup(`<strong>${pin.name}</strong><br/>${pin.note}`, { maxWidth: 260, className: styles.mapPopup });
        }
        marker.on('click', () => onSelectRef.current?.(pin.id));
        markersRef.current[pin.id] = marker;
      });

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pins]);

  // Highlight + fly to the active pin when it changes from the list.
  useEffect(() => {
    const map = mapRef.current;
    Object.entries(markersRef.current).forEach(([id, m]) => {
      m.setStyle({ radius: id === activeId ? 13 : 9, weight: id === activeId ? 3 : 2 });
    });
    if (!map || !activeId) return;
    const marker = markersRef.current[activeId];
    if (marker) {
      map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), zoom), { duration: 0.6 });
      marker.openPopup();
    }
  }, [activeId, zoom]);

  return <div ref={containerRef} className={styles.mapCanvas} style={{ height }} />;
}
