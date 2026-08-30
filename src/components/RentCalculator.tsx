import { useState } from "react";
import { Calculator } from "lucide-react";

export default function RentCalculator() {
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [result, setResult] = useState<{ yield: number; annual: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price.replace(/[^\d]/g, ""));
    const r = parseFloat(rent.replace(/[^\d]/g, ""));
    if (!p || !r || p <= 0) return;
    const annualRent = r * 12;
    const yieldPercent = (annualRent / p) * 100;
    setResult({ yield: yieldPercent, annual: annualRent });
  };

  return (
    <div style={{ border: "1px solid var(--border)", background: "var(--card)", padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <Calculator size={18} style={{ color: "var(--bronze-dark)" }} />
        حاسبة العائد على الإيجار
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>سعر العقار (ريال)</label>
          <input type="text" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))} placeholder="مثال: 1000000" style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--border)", background: "var(--background)", fontSize: 12, fontFamily: "var(--font-sans)", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>الإيجار الشهري (ريال)</label>
          <input type="text" inputMode="numeric" value={rent} onChange={(e) => setRent(e.target.value.replace(/[^\d]/g, ""))} placeholder="مثال: 5000" style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--border)", background: "var(--background)", fontSize: 12, fontFamily: "var(--font-sans)", boxSizing: "border-box" }} />
        </div>
      </div>
      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px 16px", fontSize: 12 }} onClick={calculate}>احسب العائد</button>
      {result && (
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ textAlign: "center", padding: 10, background: "var(--muted)" }}>
            <div style={{ fontSize: 10, color: "var(--muted-foreground)" }}>العائد السنوي</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--bronze-dark)" }}>{result.yield.toFixed(1)}%</div>
          </div>
          <div style={{ textAlign: "center", padding: 10, background: "var(--muted)" }}>
            <div style={{ fontSize: 10, color: "var(--muted-foreground)" }}>الإيجار السنوي</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{result.annual.toLocaleString("ar-SA")} ر.س</div>
          </div>
        </div>
      )}
    </div>
  );
}
