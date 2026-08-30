import { MessageCircle, Phone, MapPin } from "lucide-react";
import SEO from "../components/SEO";

const CONTACTS = [
  {
    icon: MessageCircle,
    title: "واتساب",
    value: "+966 500 094 550",
    link: "https://wa.me/966500094550",
    color: "#2D8C5A",
    desc: "تواصل معنا فوراً عبر واتساب",
  },
  {
    icon: Phone,
    title: "الهاتف",
    value: "+966 500 094 550",
    link: "tel:+966500094550",
    color: "var(--gold)",
    desc: "اتصل بنا مباشرة خلال ساعات العمل",
  },
  {
    icon: MapPin,
    title: "الموقع",
    value: "جدة، المملكة العربية السعودية",
    link: "https://maps.google.com/?q=Jeddah",
    color: "var(--gold-dark)",
    desc: "زورنا في مكتبنا بمدينة جدة",
  },
];

export default function ContactPage() {
  return (
    <div className="site-theme">
      <SEO
        title="تواصل معنا — المحضار للعقار"
        description="تواصل مع مكتب المحضار للعقار. واتساب، هاتف، وموقع في جدة."
        url="/contact"
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="site-container">
          <h1>
            تواصل <em>معنا</em>
          </h1>
          <p>
            نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section">
        <div className="site-container">
          <div className="contact-grid">
            {CONTACTS.map((c) => (
              <a
                key={c.title}
                href={c.link}
                target={c.link.startsWith("http") ? "_blank" : undefined}
                rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-card fade-in-up"
              >
                <div className="icon-wrap" style={{ background: `${c.color}12` }}>
                  <c.icon size={28} style={{ color: c.color }} />
                </div>
                <h3>{c.title}</h3>
                <p style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>{c.value}</p>
                <p>{c.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="section" style={{ background: "var(--bg-card)" }}>
        <div className="site-container" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ justifyContent: "center" }}>
            <span className="section-number">01</span>
            ساعات العمل
          </div>
          <h2 style={{ margin: "10px 0 36px", fontSize: 30, fontWeight: 800, color: "var(--navy)", fontFamily: "var(--font-display)" }}>ساعات العمل</h2>

          <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto", gap: "14px 56px", textAlign: "right", fontSize: 15 }}>
            <span style={{ color: "var(--text-secondary)" }}>الأحد - الخميس</span>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>9:00 ص - 9:00 م</span>
            <span style={{ color: "var(--text-secondary)" }}>السبت</span>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>4:00 م - 9:00 م</span>
            <span style={{ color: "var(--text-secondary)" }}>الجمعة</span>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>مغلق</span>
          </div>
        </div>
      </section>

      {/* Quick WhatsApp */}
      <section className="cta-section fade-in-up">
        <div className="site-container">
          <h2>تواصل معنا الآن</h2>
          <p>فريقنا جاهز للإجابة على جميع أسئلتك ومساعدتك</p>
          <a
            href="https://wa.me/966500094550?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B9%D9%82%D8%A7%D8%B1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle size={18} />
            ابدأ المحادثة على واتساب
          </a>
        </div>
      </section>
    </div>
  );
}
