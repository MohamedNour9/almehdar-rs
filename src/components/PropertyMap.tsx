import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface PropertyMapProps {
  location: string;
  title: string;
  lat?: number;
  lng?: number;
}

// Jeddah district coordinates (approximate)
const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  "حي الصفا": { lat: 21.5433, lng: 39.1728 },
  "حي العزيزية": { lat: 21.5597, lng: 39.1453 },
  "حي الأجواد": { lat: 21.5681, lng: 39.1677 },
  "حي الفيصلية": { lat: 21.5483, lng: 39.1368 },
  "طريق المدينة": { lat: 21.5822, lng: 39.1521 },
  "حي الشرقية": { lat: 21.5342, lng: 39.1988 },
  "أبحر الجنوبية": { lat: 21.6342, lng: 39.1128 },
  "حي الصفا 1": { lat: 21.5433, lng: 39.1728 },
  "حي الصفا 3": { lat: 21.5418, lng: 39.1745 },
  "حي الصفا 5": { lat: 21.5403, lng: 39.1762 },
  "حي الصفا 6": { lat: 21.5393, lng: 39.1775 },
  "حي المروة": { lat: 21.5512, lng: 39.1512 },
};

function getCoords(location: string): { lat: number; lng: number } {
  for (const [key, coords] of Object.entries(DISTRICT_COORDS)) {
    if (location.includes(key)) return coords;
  }
  return { lat: 21.5433, lng: 39.1728 }; // Default Jeddah
}

export default function PropertyMap({ location, title, lat, lng }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const coords = { lat: lat || getCoords(location).lat, lng: lng || getCoords(location).lng };

  useEffect(() => {
    if (!mapRef.current || mapReady) return;

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
    script.async = true;
    script.defer = true;

    (window as any).initMap = () => {
      if (!mapRef.current) return;
      const map = new google.maps.Map(mapRef.current, {
        center: coords,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
      });

      new google.maps.Marker({
        position: coords,
        map,
        title,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24C32 7.163 24.837 0 16 0z" fill="#b88a5a"/><circle cx="16" cy="16" r="6" fill="#fff"/></svg>`
          ),
          scaledSize: new google.maps.Size(32, 40),
        },
      });

      setMapReady(true);
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
      delete (window as any).initMap;
    };
  }, [coords, title, mapReady]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: 300, background: "var(--muted)", border: "1px solid var(--border)" }} />
      {!mapReady && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", color: "var(--muted-foreground)", fontSize: 13 }}>
          <MapPin size={20} style={{ marginLeft: 8 }} />
          {location}
        </div>
      )}
    </div>
  );
}
