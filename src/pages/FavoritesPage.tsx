import { Link } from "react-router";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import SEO from "../components/SEO";
import { PROPERTIES } from "../data/properties";
import { useFavorites } from "../hooks/use-favorites";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const favoriteProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div className="site-theme">
      <SEO
        title="المفضلة — المحضار للعقار"
        description="عقاراتك المفضلة. راجع العقارات التي حفظتها."
        url="/favorites"
      />

      <section className="page-hero">
        <div className="site-container">
          <h1>
            العقارات <em>المفضلة</em>
          </h1>
          <p>
            العقارات التي حفظتها للمراجعة لاحقاً
          </p>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          {favoriteProperties.length > 0 ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{favoriteProperties.length} عقار محفوظ</span>
                <button
                  onClick={clearFavorites}
                  className="filter-btn"
                  style={{ display: "flex", alignItems: "center", gap: 6, color: "#e44", fontSize: 12 }}
                >
                  <Trash2 size={14} />
                  مسح الكل
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {favoriteProperties.map((p) => (
                  <div key={p.id} style={{ position: "relative" }}>
                    <PropertyCard {...p} />
                    <button
                      onClick={() => toggleFavorite(p.id)}
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                        border: "none",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        cursor: "pointer",
                        zIndex: 2,
                        color: "#e44",
                      }}
                      aria-label="إزالة من المفضلة"
                    >
                      <Heart size={14} fill="#e44" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: 72, height: 72, background: "var(--gold-glow)", borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto 20px", color: "var(--gold)" }}>
                <Heart size={32} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--navy)" }}>لا توجد عقارات مفضلة</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
                احفظ العقارات التي تعجبك للرجوع إليها لاحقاً
              </p>
              <Link to="/properties" className="btn btn-primary">
                تصفح العقارات
                <ArrowLeft size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
