import { Link } from "react-router";
import { MapPin, Phone, MessageCircle, ArrowUpRight, Mail } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="site-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  background: "linear-gradient(135deg, #D4B87A, #A68945)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 14,
                  fontSize: 21,
                  fontWeight: 800,
                  boxShadow: "0 4px 16px rgba(200, 169, 110, 0.3)",
                }}
              >
                م
              </div>
              <div>
                <strong style={{ fontSize: 17, letterSpacing: "-0.02em" }}>المحضار للعقار</strong>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Real Estate
                </div>
              </div>
            </div>
            <p>
              شريكك الموثوق في رحلة البحث عن العقار المثالي. خبرة تمتد لأكثر من 12 عامًا في
              السوق العقاري السعودي.
            </p>

            {/* Contact Info */}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="tel:+966500094550"
                style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
              >
                <Phone size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                +966 500 094 550
              </a>
              <span style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                <MapPin size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                جدة، المملكة العربية السعودية
              </span>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <a
                href="https://wa.me/966500094550"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 46,
                  height: 46,
                  background: "#2D8C5A",
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  marginBottom: 0,
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-label="تواصل عبر واتساب"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="tel:+966500094550"
                style={{
                  width: 46,
                  height: 46,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 0,
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-label="اتصل بنا"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4>روابط سريعة</h4>
            <Link to="/properties">العقارات</Link>
            <Link to="/services">الخدمات</Link>
            <Link to="/about">عن المكتب</Link>
            <Link to="/guides">الإرشادات</Link>
            <Link to="/add-property">أضف عقارك</Link>
            <Link to="/compare">مقارنة العقارات</Link>
            <Link to="/calculator">حاسبة الإيجار</Link>
          </div>

          {/* Services Column */}
          <div>
            <h4>خدماتنا</h4>
            <Link to="/services">بيع العقارات</Link>
            <Link to="/services">شراء العقارات</Link>
            <Link to="/services">تأجير العقارات</Link>
            <Link to="/services">استشارات عقارية</Link>
            <Link to="/contact">تواصل معنا</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} المحضار للعقار. جميع الحقوق محفوظة.</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={14} /> جدة، المملكة العربية السعودية
          </span>
        </div>
      </div>
    </footer>
  );
}
