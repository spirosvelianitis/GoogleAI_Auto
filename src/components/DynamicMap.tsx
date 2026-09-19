import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Compass, Layers, Phone, Clock, ExternalLink } from 'lucide-react';

interface DynamicMapProps {
  dealershipName?: string;
  address?: string;
  phone?: string;
  hours?: string;
}

export const DEALERSHIP_COORDS: [number, number] = [35.1485, -80.8872]; // South Blvd / Auto Mall Parkway corridor

export default function DynamicMap({
  dealershipName = "Blue Diamon Auto",
  address = "7420 Diamond Crest Pkwy, Charlotte, NC 28217",
  phone = "(704) 588-3420",
  hours = "Mon-Fri: 8:30am-7:30pm | Sat: 9am-6pm"
}: DynamicMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [mapMode, setMapMode] = useState<'street' | 'carto'>('street');
  const [userDistance, setUserDistance] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent double init
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: DEALERSHIP_COORDS,
        zoom: 14,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      // Add zoom control at bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Tile layer
      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      });

      streetLayer.addTo(map);

      // Custom diamond marker icon
      const customIcon = L.divIcon({
        className: 'custom-dealership-marker',
        html: `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
            <div class="absolute w-12 h-12 rounded-full bg-blue-500/20 diamond-pulse-ring"></div>
            <div class="relative w-10 h-10 rounded-xl bg-blue-900 border-2 border-cyan-400 shadow-xl flex items-center justify-center transform rotate-45 transition-transform hover:scale-110">
              <span class="transform -rotate-45 text-cyan-300 font-bold text-xs tracking-tighter">◆</span>
            </div>
            <div class="absolute -bottom-1 w-2 h-2 bg-blue-900 rotate-45"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -42]
      });

      const popupContent = `
        <div class="p-2 min-w-[200px] text-slate-800">
          <div class="font-bold text-blue-950 text-sm flex items-center gap-1">
            <span class="text-cyan-600">◆</span> ${dealershipName}
          </div>
          <p class="text-xs text-slate-600 mt-1 leading-snug">${address}</p>
          <div class="mt-2 text-xs font-semibold text-blue-900 flex items-center gap-1">
            <span>📞</span> ${phone}
          </div>
          <div class="mt-1 text-[11px] text-slate-500">
            ${hours}
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${DEALERSHIP_COORDS[0]},${DEALERSHIP_COORDS[1]}" 
             target="_blank" 
             rel="noreferrer" 
             class="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md shadow-sm no-underline w-full justify-center">
            Get Directions →
          </a>
        </div>
      `;

      const marker = L.marker(DEALERSHIP_COORDS, { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent);

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [dealershipName, address, phone, hours]);

  // Recenter helper
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(DEALERSHIP_COORDS, 15, { animate: true });
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }
  };

  // Calculate distance using geolocation
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        // Haversine formula for miles
        const R = 3958.8; // Earth radius in miles
        const dLat = ((DEALERSHIP_COORDS[0] - userLat) * Math.PI) / 180;
        const dLon = ((DEALERSHIP_COORDS[1] - userLng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((userLat * Math.PI) / 180) *
            Math.cos((DEALERSHIP_COORDS[0] * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        setUserDistance(`${distance.toFixed(1)} miles away`);
        setLocating(false);

        // Add user marker & fit bounds
        if (mapInstanceRef.current) {
          const userIcon = L.divIcon({
            className: 'user-pin',
            html: `
              <div class="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md"></div>
            `,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

          L.marker([userLat, userLng], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup("<b>Your Current Location</b>")
            .openPopup();

          const bounds = L.latLngBounds([DEALERSHIP_COORDS, [userLat, userLng]]);
          mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
        }
      },
      (err) => {
        setLocating(false);
        setGeoError("Could not retrieve your location. Check browser location permissions.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div id="dynamic-map-card" className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col">
      {/* Top Map Control Bar */}
      <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-semibold text-slate-200">Interactive Dealership Location</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300">Auto Mall District</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRecenter}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            title="Center on Dealership"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Center Lot</span>
          </button>

          <button
            type="button"
            onClick={handleGetLocation}
            disabled={locating}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors disabled:opacity-50"
            title="Check distance from my location"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{locating ? "Locating..." : "Find My Distance"}</span>
          </button>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[360px] md:h-[420px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating badge for distance */}
        {userDistance && (
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm border border-emerald-200 shadow-lg px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <div>
              <span className="font-semibold text-emerald-700">Distance Calculated:</span> {userDistance}
            </div>
          </div>
        )}

        {/* Geo error banner */}
        {geoError && (
          <div className="absolute top-4 left-4 z-20 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-1.5 rounded-lg shadow">
            {geoError}
          </div>
        )}

        {/* Quick directions corner pill */}
        <div className="absolute bottom-4 left-4 z-20">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${DEALERSHIP_COORDS[0]},${DEALERSHIP_COORDS[1]}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-md backdrop-blur transition-all border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open in Navigation App</span>
          </a>
        </div>
      </div>

      {/* Map Info Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block">Dealership Address</span>
            <span>{address}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block">Lot & Showroom Hours</span>
            <span>{hours}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Phone className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block">Direct Sales Line</span>
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="text-blue-700 font-medium hover:underline">
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
