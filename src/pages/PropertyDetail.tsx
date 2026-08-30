import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import {
  MapPin, Maximize2, BedDouble, Bath, Heart, Share2, Printer,
  MessageCircle, ArrowRight, ArrowLeft, ChevronLeft, X, Building2, Calendar,
  Shield, Clock, BadgeCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import PropertyMap from "../components/PropertyMap";
import PropertyRating from "../components/PropertyRating";
import BookingModal from "../components/BookingModal";
import QRCode from "../components/QRCode";
import PropertyCard from "../components/PropertyCard";
import { generatePDFReport } from "../components/PropertyPDFReport";
import { PROPERTIES } from "../data/properties";
import { useFavorites } from "../hooks/use-favorites";
import { trackPropertyView, trackWhatsAppClick } from "../lib/analytics";

const WHATSAPP_PHONE = "+966500094550";
const WHATSAPP_MESSAGE = encodeURIComponent("السلام عليكم، أرغب في الاستفسار عن العقار.");

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = PROPERTIES.find((p) => p.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (property) trackPropertyView(property.id, property.title);
  }, [property]);

  if (!property) {
    return (
      <div className="site-theme">
        <div style={{ textAlign: "center", padding: "140px 0" }}>
          <h1 style={{ fontSize: 56, fontWeight: 800, color: "var(--navy)", fontFamily: "var(--font-display)" }}>404</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: 28, fontSize: 16 }}>العقار غير موجود</p>
          <Link to="/properties" className="btn btn-primary">
            <ArrowRight size={16} />
            العودة للعقارات
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(property.id);
  const waText = `${WHATSAPP_MESSAGE} - ${property.title} - ${property.price}`;
  const waLink = `https://wa.me/${WHATSAPP_PHONE.replace("+", "")}?text=${encodeURIComponent(waText)}`;

  // Similar properties
  const similar = PROPERTIES.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `${property.title} - ${property.price}`;
    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "copy") {
      await navigator.clipboard.writeText(url);
      alert("تم نسخ الرابط");
    }
    setShareOpen(false);
  };

  const handlePrint = () => window.print();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description || property.title,
    url: window.location.href,
    image: property.image,
    offers: {
      "@type": "Offer",
      price: property.price.replace(/[^\d]/g, ""),
      priceCurrency: "SAR",
    },
  };

  return (
    <div className="site-theme">
      <SEO
        title={property.title}
        description={property.description || `${property.title} - ${property.location} - ${property.price}`}
        image={property.image}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <div style={{ borderBottom: "1px solid var(--border-light)", background: "var(--bg-warm)" }}>
        <div className="site-container" style={{ padding: "14px 0" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text-muted)" }} aria-label="مسار التنقل">
            <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}>الرئيسية</Link>
            <ChevronLeft size={13} />
            <Link to="/properties" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}>العقارات</Link>
            <ChevronLeft size={13} />
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>{property.title}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section style={{ padding: "36px 0" }}>
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ position: "relative", cursor: "pointer", overflow: "hidden", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }}
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={property.image}
              alt={property.title}
              style={{ width: "100%", height: 520, objectFit: "cover", display: "block", borderRadius: "var(--radius-xl)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
              onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            <div style={{ position: "absolute", top: 18, right: 18, display: "flex", gap: 10 }}>
              {property.accent && (
                <span style={{ background: "var(--gold-gradient)", color: "#fff", padding: "7px 16px", fontSize: 12, fontWeight: 600, borderRadius: "var(--radius-full)", boxShadow: "var(--shadow-gold)" }}>
                  {property.accent}
                </span>
              )}
              <span style={{ background: "rgba(15,18,25,0.82)", backdropFilter: "blur(14px)", color: "#fff", padding: "7px 16px", fontSize: 12, fontWeight: 600, borderRadius: "var(--radius-full)" }}>
                {property.deal}
              </span>
            </div>
            <div style={{ position: "absolute", bottom: 18, left: 18, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(14px)", color: "#fff", padding: "9px 16px", fontSize: 12, display: "flex", alignItems: "center", gap: 6, borderRadius: "var(--radius-full)" }}>
              🔍 اضغط للمعاينة
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingBottom: 80 }}>
        <div className="site-container detail-layout">
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ background: "var(--bg-warm)", padding: "6px 14px", fontSize: 12, color: "var(--text-muted)", borderRadius: "var(--radius-full)", fontWeight: 600 }}>{property.type}</span>
              <span style={{ background: "var(--navy)", color: "#fff", padding: "6px 14px", fontSize: 12, borderRadius: "var(--radius-full)", fontWeight: 500 }}>{property.deal}</span>
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 14px", color: "var(--navy)", fontFamily: "var(--font-display)" }}>{property.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
              <MapPin size={16} />
              {property.location}
            </div>

            {/* Specs */}
            <div style={{ display: "flex", gap: 28, padding: "22px 0", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text)" }}>
                <Maximize2 size={17} style={{ color: "var(--gold)" }} />
                <span>{property.area}</span>
              </div>
              {property.beds !== "بيانات غير متاحة" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text)" }}>
                  <BedDouble size={17} style={{ color: "var(--gold)" }} />
                  <span>{property.beds}</span>
                </div>
              )}
              {property.baths !== "بيانات غير متاحة" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text)" }}>
                  <Bath size={17} style={{ color: "var(--gold)" }} />
                  <span>{property.baths}</span>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              {[
                { icon: Shield, label: "تحقق معتمد" },
                { icon: BadgeCheck, label: "بيانات موثوقة" },
                { icon: Clock, label: "تحديث حديث" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  background: "var(--gold-muted)",
                  borderRadius: "var(--radius-full)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--gold-dark)",
                }}>
                  <Icon size={14} />
                  {label}
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: "var(--navy)" }}>وصف العقار</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 2 }}>
                {property.description || `${property.title} - يقع في ${property.location} بمساحة ${property.area}. متاح للبيع بسعر ${property.price}.` + (property.accent ? ` - ${property.accent}.` : "")}
              </p>
            </div>

            {/* Rating */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: "var(--navy)" }}>تقييم العقار</h2>
              <PropertyRating propertyId={property.id} showCount />
            </div>

            {/* Map */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: "var(--navy)" }}>الموقع على الخريطة</h2>
              <PropertyMap location={property.location} title={property.title} />
            </div>

            {/* QR Code */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: "var(--navy)" }}>رمز QR</h2>
              <QRCode url={window.location.href} />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ position: "sticky", top: 100 }}
          >
            {/* Price Card */}
            <div style={{ border: "1px solid var(--border-light)", background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-xl)", marginBottom: 18, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 6, color: "var(--gold-dark)", letterSpacing: "-0.02em" }}>{property.price}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 24 }}>{property.location}</div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: "100%", justifyContent: "center", marginBottom: 12, padding: 16, fontSize: 15, borderRadius: "var(--radius-sm)" }}
                onClick={() => trackWhatsAppClick(property.id)}
              >
                <MessageCircle size={18} />
                استفسار عبر واتساب
              </a>
              <button
                onClick={() => setBookingOpen(true)}
                className="filter-btn"
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, marginBottom: 12, borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 500 }}
              >
                <Calendar size={16} />
                حجز موعد للمعاينة
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="filter-btn"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 13, borderRadius: "var(--radius-sm)" }}
                >
                  <Heart size={15} fill={favorited ? "var(--gold)" : "none"} style={{ color: favorited ? "var(--gold)" : "inherit" }} />
                  {favorited ? "محفوظ" : "حفظ"}
                </button>
                <button onClick={() => setShareOpen(!shareOpen)} className="filter-btn" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 13, borderRadius: "var(--radius-sm)" }}>
                  <Share2 size={15} />
                  مشاركة
                </button>
                <button onClick={() => generatePDFReport(property)} className="filter-btn" style={{ padding: 13, borderRadius: "var(--radius-sm)" }} title="تحميل تقرير PDF">
                  <Printer size={15} />
                </button>
              </div>

              {/* Share dropdown */}
              <AnimatePresence>
                {shareOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{ marginTop: 12, border: "1px solid var(--border-light)", background: "var(--bg-card)", borderRadius: "var(--radius-sm)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}
                  >
                    <button onClick={() => handleShare("whatsapp")} style={{ width: "100%", padding: "13px 18px", textAlign: "right", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "var(--text)", fontFamily: "var(--font)", borderBottom: "1px solid var(--border-light)", transition: "background 0.2s" }}>
                      مشاركة عبر واتساب
                    </button>
                    <button onClick={() => handleShare("twitter")} style={{ width: "100%", padding: "13px 18px", textAlign: "right", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "var(--text)", fontFamily: "var(--font)", borderBottom: "1px solid var(--border-light)", transition: "background 0.2s" }}>
                      مشاركة على تويتر
                    </button>
                    <button onClick={() => handleShare("copy")} style={{ width: "100%", padding: "13px 18px", textAlign: "right", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "var(--text)", fontFamily: "var(--font)", transition: "background 0.2s" }}>
                      نسخ الرابط
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Office Info */}
            <div style={{ border: "1px solid var(--border-light)", background: "var(--bg-card)", padding: 28, borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <Building2 size={22} style={{ color: "var(--gold)" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)" }}>المحضار للعقار</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>مكتب عقاري موثوق</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE.replace("+", "")}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--green)", fontSize: 14, textDecoration: "none", fontWeight: 500 }}
              >
                <MessageCircle size={15} />
                +966 500 094 550
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section className="section" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-light)" }}>
          <div className="site-container">
            <div className="section-intro fade-in-up">
              <div>
                <div className="section-kicker">
                  <span className="section-number">✦</span>
                  عقارات مشابهة
                </div>
                <h2>عقارات من نفس النوع</h2>
              </div>
              <Link
                to="/properties"
                className="btn"
                style={{ color: "var(--navy)", border: "1px solid var(--border)", background: "var(--bg-card)", borderRadius: "var(--radius-full)", padding: "10px 24px", fontSize: 13, fontWeight: 600 }}
              >
                عرض الكل
                <ArrowLeft size={16} />
              </Link>
            </div>
            <p className="section-lead fade-in-up">
              اكتشف عقارات مشابهة قد تهمك
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }} className="fade-in-up">
              {similar.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{ position: "absolute", top: 28, left: 28, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "none", color: "#fff", width: 48, height: 48, display: "grid", placeItems: "center", cursor: "pointer", borderRadius: "50%", fontSize: 18, transition: "background 0.2s" }}
          >
            <X size={22} />
          </button>
          <img
            src={property.image}
            alt={property.title}
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: "var(--radius)" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} propertyTitle={property.title} />
    </div>
  );
}
