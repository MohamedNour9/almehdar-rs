import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/components/PropertyCard";

interface PropertySliderProps {
  properties: Property[];
}

export default function PropertySlider({ properties }: PropertySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "right" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          style={{ position: "absolute", top: "50%", left: -16, zIndex: 5, transform: "translateY(-50%)", width: 36, height: 36, background: "var(--card)", border: "1px solid var(--border)", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          aria-label="السابق"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          style={{ position: "absolute", top: "50%", right: -16, zIndex: 5, transform: "translateY(-50%)", width: 36, height: 36, background: "var(--card)", border: "1px solid var(--border)", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          aria-label="التالي"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", padding: "4px 0" }}
      >
        {properties.map((property) => (
          <div key={property.id} style={{ minWidth: 300, maxWidth: 340, flexShrink: 0, scrollSnapAlign: "start" }}>
            <PropertyCard
            id={property.id}
            title={property.title}
            price={property.price}
            location={property.location}
            image={property.image}
            area={property.area}
            deal={property.deal}
            type={property.type}
          />
          </div>
        ))}
      </div>
    </div>
  );
}
