import { useState } from "react";
import { Star } from "lucide-react";

const STORAGE_KEY = "almahddar.ratings";

function getRatings(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function setRatings(ratings: Record<string, number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}

interface PropertyRatingProps {
  propertyId: string;
  showCount?: boolean;
}

export default function PropertyRating({ propertyId, showCount = false }: PropertyRatingProps) {
  const [ratings, setRatingsState] = useState(getRatings);
  const currentRating = ratings[propertyId] || 0;
  const [hoverRating, setHoverRating] = useState(0);

  const handleRate = (rating: number) => {
    const updated = { ...ratings, [propertyId]: rating };
    setRatings(updated);
    setRatingsState(updated);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: star <= (hoverRating || currentRating) ? "var(--bronze)" : "var(--border)" }}
          aria-label={`${star} نجوم`}
        >
          <Star size={18} fill={star <= (hoverRating || currentRating) ? "var(--bronze)" : "none"} />
        </button>
      ))}
      {showCount && currentRating > 0 && (
        <span style={{ fontSize: 11, color: "var(--muted-foreground)", marginRight: 4 }}>{currentRating}/5</span>
      )}
    </div>
  );
}
