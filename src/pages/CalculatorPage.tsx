import { useState } from "react";
import { Calculator, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function CalculatorPage() {
  const [income, setIncome] = useState("");
  const [years, setYears] = useState("25");
  const [rate, setRate] = useState("5");
  const [result, setResult] = useState<{ monthly: number; total: number; maxLoan: number } | null>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income.replace(/[^\d]/g, ""));
    if (!monthlyIncome || monthlyIncome <= 0) return;
    const monthlyPayment = monthlyIncome * 0.33;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(years) * 12;
    const maxLoan = r > 0 ? monthlyPayment * ((1 - Math.pow(1 + r, -n)) / r) : monthlyPayment * n;
    setResult({ monthly: monthlyPayment, total: monthlyPayment * n, maxLoan });
  };

  return (
    <div className="site-theme">
      <SEO
        title="حاسبة القوة الشرائية — المحضار للعقار"
        description="احسب قدرتك الشرائية وأقصى مبلغ يمكنك تحمّله لشراء عقار"
        url="/calculator"
      />

      <section className="page-hero">
        <div className="site-container">
          <h1>
            حاسبة <em>القوة الشرائية</em>
          </h1>
          <p>حدد دخلك الشهري لمعرفة أقصى مبلغ يمكنك تحمّله لشراء عقار</p>
        </div>
      </section>

      <section className="section">
        <div className="site-container" style={{ maxWidth: 640 }}>
          <div style={{ border: "1px solid var(--border-light)", background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)" }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "var(--navy)" }}>الدخل الشهري (ريال سعودي)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="مثال: 20,000"
                value={income}
                onChange={(e) => setIncome(e.target.value.replace(/[^\d]/g, ""))}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  fontSize: 14,
                  fontFamily: "var(--font)",
                  outline: "none",
                  boxSizing: "border-box",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "var(--navy)" }}>مدة القرض (سنوات)</label>
                <select
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, fontFamily: "var(--font)", borderRadius: "var(--radius-sm)", color: "var(--text)", transition: "border-color 0.2s" }}
                >
                  {[10, 15, 20, 25, 30].map((y) => (
                    <option key={y} value={y}>{y} سنة</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "var(--navy)" }}>نسبة الفائدة (%)</label>
                <select
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, fontFamily: "var(--font)", borderRadius: "var(--radius-sm)", color: "var(--text)", transition: "border-color 0.2s" }}
                >
                  {[3, 4, 5, 6, 7, 8].map((r) => (
                    <option key={r} value={r}>{r}%</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={calculate}>
              احسب
              <ArrowLeft size={16} />
            </button>
          </div>

          {result && (
            <div style={{ marginTop: 24, border: "1px solid var(--gold-light)", background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--gold-dark)" }}>النتيجة</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div style={{ textAlign: "center", padding: 16, background: "var(--bg-warm)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>أقصى قرض</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>{Math.round(result.maxLoan).toLocaleString("ar-SA")} ر.س</div>
                </div>
                <div style={{ textAlign: "center", padding: 16, background: "var(--bg-warm)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>القسط الشهري</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>{Math.round(result.monthly).toLocaleString("ar-SA")} ر.س</div>
                </div>
                <div style={{ textAlign: "center", padding: 16, background: "var(--bg-warm)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>إجمالي المدفوعات</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>{Math.round(result.total).toLocaleString("ar-SA")} ر.س</div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 16, textAlign: "center" }}>
                * هذه الحاسبة تقريبية. يُنصح بالتحقق من الشروط لدى البنك.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
