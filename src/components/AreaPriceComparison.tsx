import { PROPERTIES } from "@/data/properties";

// Calculate average prices by district
function getAreaPrices() {
  const districts: Record<string, number[]> = {};
  PROPERTIES.forEach((p) => {
    const price = parseInt(p.price.replace(/[^\d]/g, ""));
    if (!price || price <= 0) return;
    const parts = p.location.split("·");
    const district = parts[1]?.trim() || "غير محدد";
    if (!districts[district]) districts[district] = [];
    districts[district].push(price);
  });

  return Object.entries(districts)
    .map(([name, prices]) => ({
      name,
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      count: prices.length,
      min: Math.min(...prices),
      max: Math.max(...prices),
    }))
    .sort((a, b) => b.avg - a.avg);
}

export default function AreaPriceComparison() {
  const areas = getAreaPrices();
  const maxPrice = Math.max(...areas.map((a) => a.avg));

  return (
    <div style={{ border: "1px solid var(--border)", background: "var(--card)", padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px" }}>متوسط الأسعار حسب الحي</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {areas.map((area) => (
          <div key={area.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
              <span style={{ fontWeight: 500 }}>{area.name}</span>
              <span style={{ color: "var(--muted-foreground)" }}>{area.avg.toLocaleString("ar-SA")} ر.س</span>
            </div>
            <div style={{ height: 8, background: "var(--muted)", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${(area.avg / maxPrice) * 100}%`,
                  background: "linear-gradient(90deg, var(--bronze), var(--bronze-dark))",
                  borderRadius: 4,
                  transition: "width 0.8s ease-out",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2, fontSize: 10, color: "var(--muted-foreground)" }}>
              <span>{area.count} عقار</span>
              <span>{area.min.toLocaleString("ar-SA")} - {area.max.toLocaleString("ar-SA")} ر.س</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
