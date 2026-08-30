import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import SEO from "../components/SEO";
import { PROPERTIES } from "../data/properties";

const DEAL_TYPES = ["الكل", "بيع", "إيجار"];
const PROPERTY_TYPES = ["الكل", "شقة", "فيلا", "أرض", "محل تجاري", "عمارة"];
const CITIES = ["الكل", "جدة"];

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dealType, setDealType] = useState(searchParams.get("deal") || "الكل");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "الكل");
  const [city, setCity] = useState(searchParams.get("city") || "الكل");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [budgetMax, setBudgetMax] = useState(searchParams.get("budget") || "");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (dealType !== "الكل") params.deal = dealType;
    if (propertyType !== "الكل") params.type = propertyType;
    if (city !== "الكل") params.city = city;
    if (query) params.q = query;
    if (budgetMax) params.budget = budgetMax;
    setSearchParams(params, { replace: true });
  }, [dealType, propertyType, city, query, budgetMax, setSearchParams]);

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (dealType !== "الكل" && p.deal !== dealType) return false;
      if (propertyType !== "الكل" && p.type !== propertyType) return false;
      if (city !== "الكل" && !p.location.includes(city)) return false;
      if (query && !p.title.includes(query) && !p.location.includes(query)) return false;
      if (budgetMax) {
        const price = parseInt(p.price.replace(/[^\d]/g, ""));
        if (price > parseInt(budgetMax)) return false;
      }
      return true;
    });
  }, [dealType, propertyType, city, query, budgetMax]);

  return (
    <div className="site-theme">
      <SEO
        title="العقارات المتاحة — المحضار للعقار"
        description="تصفح أحدث العقارات المتاحة للبيع والتأجير في جدة. شقق، فلل، أراضي، محلات تجارية."
        url="/properties"
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="site-container">
          <h1>
            العقارات <em>المتاحة</em>
          </h1>
          <p>
            اكتشف مجموعة واسعة من العقارات المتاحة للبيع والتأجير في جدة والمنطقة الغربية
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section" style={{ paddingTop: 36 }}>
        <div className="site-container">
          {/* Search Bar */}
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="ابحث بالاسم أو الموقع..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 16px 15px 48px",
                  fontSize: 14,
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  background: "var(--bg-card)",
                  color: "var(--text)",
                  fontFamily: "var(--font)",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  style={{
                    position: "absolute",
                    left: 48,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "var(--bg-warm)",
                    border: "none",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    transition: "background 0.2s",
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-btn"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 24px" }}
            >
              <SlidersHorizontal size={16} />
              الفلاتر
            </button>
          </div>

          {/* Quick Deal Type Filters */}
          <div className="filters-bar">
            {DEAL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setDealType(type)}
                className={`filter-btn ${dealType === type ? "active" : ""}`}
              >
                {type}
              </button>
            ))}
            <span className="filter-count">{filtered.length} عقار</span>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              padding: 24,
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-xl)",
              marginBottom: 28,
              boxShadow: "var(--shadow-sm)",
            }}>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>نوع العقار</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`filter-btn ${propertyType === type ? "active" : ""}`}
                      style={{ fontSize: 12, padding: "7px 16px" }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>المدينة</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`filter-btn ${city === c ? "active" : ""}`}
                      style={{ fontSize: 12, padding: "7px 16px" }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>الحد الأقصى للميزانية</label>
                <input
                  type="number"
                  placeholder="مثال: 1000000"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  style={{
                    padding: "9px 16px",
                    fontSize: 13,
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontFamily: "var(--font)",
                    width: 220,
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                />
              </div>
            </div>
          )}

          {/* Properties Grid */}
          {filtered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {filtered.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "96px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>🏢</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--navy)" }}>لا توجد عقارات مطابقة</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                جرّب تغيير معايير البحث للعثور على ما تبحث عنه
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
