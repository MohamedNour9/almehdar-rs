import { Bell } from "lucide-react";
import SEO from "../components/SEO";

export default function NotificationsPage() {
  return (
    <div className="site-theme">
      <SEO title="الإشعارات — المحضار للعقار" description="إشعاراتك من المحضار للعقار" url="/notifications" />

      <section className="page-hero">
        <div className="site-container">
          <h1>الإشعارات</h1>
          <p>آخر التحديثات والأخبار من المحضار للعقار</p>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ width: 72, height: 72, background: "var(--gold-glow)", borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto 20px", color: "var(--gold)" }}>
              <Bell size={32} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--navy)" }}>لا توجد إشعارات جديدة</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              سنخبرك عند وجود عقارات جديدة تناسب اهتماماتك
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
