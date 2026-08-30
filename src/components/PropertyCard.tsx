import { Link } from "react-router";
import { MapPin, Maximize2, BedDouble, Bath } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  type: string;
  deal: string;
  location: string;
  area: string;
  beds: string;
  baths: string;
  price: string;
  image: string;
  accent?: string;
  description?: string;
}

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  area: string;
  deal?: string;
  dealType?: string;
  type?: string;
  propertyType?: string;
  beds?: string;
  baths?: string;
  rooms?: number;
  bathrooms?: number;
  featured?: boolean;
  layout?: "vertical" | "horizontal";
  description?: string;
}

export default function PropertyCard({
  id,
  title,
  price,
  location,
  image,
  area,
  deal,
  dealType,
  type,
  propertyType,
  beds,
  baths,
  layout = "vertical",
}: PropertyCardProps) {
  const dealLabel = deal || dealType;
  const typeLabel = type || propertyType;

  return (
    <Link to={`/properties/${id}`} className="property-card" aria-label={`عقار: ${title}`}>
      <div className="property-image">
        <img src={image} alt={title} loading="lazy" width="400" height="230" />
        {dealLabel && (
          <span className={`property-tag ${layout === "vertical" ? "accent" : ""}`}>
            {dealLabel}
          </span>
        )}
        {typeLabel && <span className="property-badge">{typeLabel}</span>}
        <div className="property-quick-view" aria-hidden="true">
          <span>عرض التفاصيل</span>
        </div>
      </div>

      <div className="property-info">
        <h3>{title}</h3>

        <div className="property-meta">
          <MapPin size={14} />
          {location}
        </div>

        <div className="property-specs">
          <span>
            <Maximize2 size={14} />
            {area}
          </span>
          {beds && beds !== "بيانات غير متاحة" && (
            <span>
              <BedDouble size={14} />
              {beds}
            </span>
          )}
          {baths && baths !== "بيانات غير متاحة" && (
            <span>
              <Bath size={14} />
              {baths}
            </span>
          )}
        </div>

        <div className="property-price-row">
          <span className="property-price">{price}</span>
          {dealLabel && <span className="property-type-badge">{dealLabel}</span>}
        </div>
      </div>
    </Link>
  );
}
