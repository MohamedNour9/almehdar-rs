import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const touchStart = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  if (images.length === 0) return null;

  return (
    <div style={{ position: "relative" }}>
      {/* Main image */}
      <div
        style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
        onClick={() => setZoomed(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[current]}
          alt={`${alt} - صورة ${current + 1}`}
          style={{ width: "100%", height: 500, objectFit: "cover", display: "block", transition: "transform 0.3s" }}
        />
        <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(0,0,0,0.6)", color: "#fff", padding: "6px 12px", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
          <ZoomIn size={14} />اضغط للمعاينة
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "absolute", top: "50%", right: 12, transform: "translateY(-50%)", width: 36, height: 36, background: "rgba(255,255,255,0.9)", border: "none", display: "grid", placeItems: "center", cursor: "pointer" }} aria-label="السابق">
              <ChevronRight size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)", width: 36, height: 36, background: "rgba(255,255,255,0.9)", border: "none", display: "grid", placeItems: "center", cursor: "pointer" }} aria-label="التالي">
              <ChevronLeft size={18} />
            </button>
          </>
        )}

        {/* Counter */}
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.6)", color: "#fff", padding: "4px 10px", fontSize: 11 }}>
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: 6, marginTop: 8, overflowX: "auto" }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                flexShrink: 0, width: 64, height: 48, border: i === current ? "2px solid var(--bronze)" : "1px solid var(--border)", padding: 0, cursor: "pointer", background: "none", overflow: "hidden",
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {zoomed && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setZoomed(false)}>
          <button onClick={() => setZoomed(false)} style={{ position: "absolute", top: 20, left: 20, background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 40, height: 40, display: "grid", placeItems: "center", cursor: "pointer", borderRadius: "50%", zIndex: 10 }}>✕</button>
          <img src={images[current]} alt={alt} style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 44, height: 44, display: "grid", placeItems: "center", cursor: "pointer", borderRadius: "50%" }}><ChevronRight size={24} /></button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 44, height: 44, display: "grid", placeItems: "center", cursor: "pointer", borderRadius: "50%" }}><ChevronLeft size={24} /></button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
