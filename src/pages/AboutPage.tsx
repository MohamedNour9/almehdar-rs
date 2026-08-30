import { Link } from "react-router";
import { MapPin, Phone, MessageCircle, Shield, BadgeCheck, TrendingUp, Home as HomeIcon } from "lucide-react";
import SEO from "../components/SEO";

const VALUES = [
  { icon: Shield, title: "النزاهة والشفافية", desc: "نلتزم بالشفافية المطلقة في جميع تعاملاتنا. لا رسوم مخفية ولا مفاجآت." },
  { icon: BadgeCheck, title: "الجودة والتميز", desc: "نسعى لتقديم أعلى معايير الجودة في كل خدمة نقدمها لعملائنا." },
  { icon: TrendingUp, title: "الابتكار المستمر", desc: "نستخدم أحدث التقنيات والأدوات لتقديم تجربة عقارية متميزة." },
  { icon: HomeIcon, title: "التركيز على العميل", desc: "احتياجاتك هي أولويتنا. نصمم حلولاً مخصصة تناسب متطلباتك." },
];

export default function AboutPage() {
  return (
    <div className="site-theme">
      <SEO
        title="عن المكتب — المحضار للعقار"
        description="تعرف على مكتب المحضار للعقار. خبرة أكثر من 12 عامًا في السوق العقاري السعودي."
        url="/about"
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="site-container">
          <h1>
            عن <em>المكتب</em>
          </h1>
          <p>
            تعرّف على رحلتنا وقيمنا التي جعلتنا الخيار الأول للعقار في جدة
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="site-container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="/images/property-safa-1.jpg"
                alt="مكتب المحضار للعقار"
                width="560"
                height="400"
                loading="lazy"
              />
            </div>
            <div>
              <div className="section-kicker">
                <span className="section-number">01</span>
                من نحن
              </div>
              <h2 style={{ margin: "10px 0 20px", fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--navy)", fontFamily: "var(--font-display)" }}>
                المحضار للعقار
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 2, marginBottom: 20 }}>
                مكتب المحضار للعقار هو شريكك الموثوق في السوق العقاري السعودي. نقدم خدمات متكاملة
                في البيع والشراء والتأجير والاستشارات العقارية منذ أكثر من 12 عامًا.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 2, marginBottom: 32 }}>
                نفخر بخدمة مئات العملاء الذين وثقوا بخبرتنا في أهم قراراتهم العقارية. هدفنا هو
                تقديم أفضل الخيارات المتاحة مع ضمان أعلى معايير الشفافية والاحترافية.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ padding: 24, background: "var(--gold-muted)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, background: "var(--gold-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>+12</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, fontWeight: 500 }}>سنة خبرة</div>
                </div>
                <div style={{ padding: 24, background: "var(--gold-muted)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, background: "var(--gold-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>+500</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, fontWeight: 500 }}>عميل سعيد</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "var(--bg-card)" }}>
        <div className="site-container">
          <div className="section-intro fade-in-up" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <div>
              <div className="section-kicker" style={{ justifyContent: "center" }}>
                <span className="section-number">02</span>
                قيمنا
              </div>
              <h2>ما الذي يميزنا؟</h2>
            </div>
          </div>

          <div className="why-us-grid fade-in-up">
            {VALUES.map((item) => (
              <div key={item.title} className="why-us-item">
                <div className="icon">
                  <item.icon size={26} />
                </div>
                <h3>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.9, marginTop: 12 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="cta-section fade-in-up">
        <div className="site-container">
          <h2>جاهز للعمل معنا؟</h2>
          <p>
            تواصل معنا اليوم ودعنا نساعدك في العثور على العقار المثالي
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
            <a href="tel:+966500094550" className="btn btn-primary">
              <Phone size={18} />
              اتصل بنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
