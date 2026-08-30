import { Link } from "react-router";
import { Home as HomeIcon, Search, Building2, Headphones, ArrowLeft, MessageCircle } from "lucide-react";
import SEO from "../components/SEO";

const SERVICES = [
  {
    icon: HomeIcon,
    title: "بيع العقارات",
    desc: "نساعدك في بيع عقارك بأفضل سعر ومناسب السوق. فريقنا المتخصص يرافقك من التسعير المناسب إلى إتمام الصفقة بأمان واحترافية.",
    features: ["تقييم العقار مجاناً", "تسويق احترافي", "التفاوض نيابةً عنك", "متابعة الصفقة حتى النهاية"],
  },
  {
    icon: Search,
    title: "شراء العقارات",
    desc: "نبحث لك عن العقار المثالي الذي يناسب احتياجاتك وميزانيتك. نوفر لك خيارات واسعة من الشقق والفلل والأراضي.",
    features: ["بحث مخصص حسب احتياجاتك", "معاينة العقارات", "التحقق من المستندات", "مساعدة في التمويل"],
  },
  {
    icon: Building2,
    title: "تأجير العقارات",
    desc: "حلول تأجير مرنة للعائلات والأفراد والشركات. نوفر لك أفضل الخيارات بأسعار تنافسية في مواقع مميزة.",
    features: ["إعداد العقود", "إدارة العقارات", "تحصيل الإيجار", "الصيانة والدعم"],
  },
  {
    icon: Headphones,
    title: "استشارات عقارية",
    desc: "استشارات متخصصة من خبراء السوق العقاري. نساعدك في اتخاذ قرارات عقارية مدروسة ومبنية على بيانات حقيقية.",
    features: ["تحليل السوق", "دراسات الجدوى", "استشارات استثمارية", "إرشادات قانونية"],
  },
];

export default function ServicesPage() {
  return (
    <div className="site-theme">
      <SEO
        title="خدماتنا — المحضار للعقار"
        description="خدمات عقارية متكاملة: بيع، شراء، تأجير، واستشارات عقارية في جدة."
        url="/services"
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="site-container">
          <h1>
            خدماتنا <em>العقارية</em>
          </h1>
          <p>
            نقدم مجموعة شاملة من الخدمات العقارية لتلبية جميع احتياجاتك في السوق العقاري
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section">
        <div className="site-container">
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className="fade-in-up"
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr",
                  gap: 56,
                  alignItems: "center",
                  padding: 48,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div style={{ width: 68, height: 68, background: "var(--gold-muted)", borderRadius: "var(--radius-lg)", display: "grid", placeItems: "center", color: "var(--gold)", marginBottom: 24 }}>
                    <svc.icon size={30} />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 14, color: "var(--navy)", letterSpacing: "-0.03em", fontFamily: "var(--font-display)" }}>{svc.title}</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.9, marginBottom: 24 }}>{svc.desc}</p>
                </div>
                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {svc.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "var(--bg-warm)", borderRadius: "var(--radius)", fontSize: 14, color: "var(--text)", border: "1px solid var(--border-light)" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section fade-in-up">
        <div className="site-container">
          <h2>هل تحتاج استشارة عقارية؟</h2>
          <p>
            فريقنا جاهز للإجابة على جميع أسئلتك ومساعدتك في اتخاذ أفضل قرار عقاري
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/966500094550"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              تواصل عبر واتساب
            </a>
            <Link to="/properties" className="btn btn-primary">
              تصفح العقارات
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
