import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="site-theme">
      <section style={{ textAlign: "center", padding: "120px 0", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="site-container">
          <div style={{ fontSize: 120, fontWeight: 700, color: "var(--border)", lineHeight: 1, marginBottom: 16 }}>404</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "var(--navy)" }}>الصفحة غير موجودة</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 28 }}>
            يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowRight size={16} />
            العودة للرئيسية
          </Link>
        </div>
      </section>
    </div>
  );
}
