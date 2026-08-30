import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  MessageCircle,
  Home as HomeIcon,
  Search,
  Building2,
  Shield,
  Headphones,
  BadgeCheck,
  TrendingUp,
  MapPinned,
  Quote,
  Star,
  Award,
} from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import SEO from "../components/SEO";
import { PROPERTIES } from "../data/properties";

const HERO_SLIDES = [
  "/images/property-safa-1.jpg",
  "/images/property-ajwad.jpg",
  "/images/property-palace.jpg",
];

const STATS = [
  { value: 14, suffix: "+", label: "عقار متاح" },
  { value: 12, suffix: "+", label: "سنة خبرة" },
  { value: 98, suffix: "%", label: "رضا العملاء" },
];

const SERVICES = [
  { icon: HomeIcon, title: "بيع العقارات", desc: "نساعدك في بيع عقارك بأفضل سعر ومناسب السوق" },
  { icon: Search, title: "شراء العقارات", desc: "نبحث لك عن العقار المثالي الذي يناسب احتياجاتك" },
  { icon: Building2, title: "تأجير العقارات", desc: "حلول تأجير مرنة للعائلات والأفراد والشركات" },
  { icon: Headphones, title: "استشارات عقارية", desc: "استشارات متخصصة من خبراء السوق العقاري" },
];

const WHY_US = [
  { icon: Shield, title: "خبرة وثقة", desc: "أكثر من 12 عامًا من الخبرة في السوق العقاري السعودي" },
  { icon: BadgeCheck, title: "شفافية تامة", desc: "نلتزم بالشفافية في جميع تعاملاتنا مع عملائنا" },
  { icon: TrendingUp, title: "نتائج ملموسة", desc: "نسعى لتحقيق أفضل النتائج لعملائنا في أسرع وقت" },
];

const STEPS = [
  { num: "01", title: "حدد احتياجاتك", desc: "أخبرنا بمواصفات العقار الذي تبحث عنه أو تريد بيعه" },
  { num: "02", title: "نساعدك في البحث", desc: "فريقنا المتخصص يبحث ويقدم لك أفضل الخيارات المتاحة" },
  { num: "03", title: "أتمم صفقاتك", desc: "نساعدك في إتمام الصفقة بأمان وسرعة واحترافية" },
];

const TESTIMONIALS = [
  {
    name: "عبدالله الشمري",
    role: "مستثمر عقاري",
    text: "تجربة ممتازة مع المحضار للعقار. ساعدوني في العثور على عقار استثماري مميز بسعر مناسب. أنصح بالتعامل معهم بشدة.",
    rating: 5,
  },
  {
    name: "نورة العتيبي",
    role: "صاحبة عقار",
    text: "بعت عقاري خلال أسبوعين فقط بفضل احترافية فريق المحضار. التعامل كان شفافاً ومميزاً من البداية للنهاية.",
    rating: 5,
  },
  {
    name: "محمد القحطاني",
    role: "بائع عقار",
    text: "فريق محترف ومتعاون. حصلت على سعر أفضل مما توقعت لعقاري. شكراً لكم على השירות المتميز.",
    rating: 5,
  },
  {
    name: "سعود المطيري",
    role: "مستثمر عقاري",
    text: "تعاملت مع المحضار لشراء شقة استثمارية في الرياض. كانوا دقيقين في التقييم وساعدوني في التفاوض على سعر ممتاز.",
    rating: 5,
  },
  {
    name: "فاطمة الزهراني",
    role: "صاحبة فلة",
    text: "أفضل تجربة عقارية مررت بها. فريق المحضار اهتم بكل التفاصيل من أول اتصال حتى توقيع العقد. أنصح بهم بكل قوة.",
    rating: 5,
  },
  {
    name: "خالد الحربي",
    role: "رائد أعمال",
    text: "بعت عقار تجاري عبر المحضار بسعر تجاوز توقعاتي. احترافية عالية وشفافية تامة في التعامل.",
    rating: 5,
  },
  {
    name: "ريم السبيعي",
    role: "باحثة عن إيجار",
    text: "وجدت شقة إيجار مثالية لعائلتي بفضل المحضار. كانوا صبورين وفهّموا احتياجاتنا بالتفصيل.",
    rating: 5,
  },
  {
    name: "عمر البلوي",
    role: "مستثمر عقاري",
    text: "استثمرت مع المحضار في عدة عقارات بمدينة جدة. عائد ممتاز وخدمة ما بعد البيع رائعة.",
    rating: 5,
  },
  {
    name: "هند العنزي",
    role: "صاحبة عقار",
    text: "كنت متوترة من عملية البيع لكن فريق المحضار جعلها سهلة وسريعة. أكرر شكري لهم.",
    rating: 5,
  },
  {
    name: "ياسر الغامدي",
    role: "رجل أعمال",
    text: "بعت فلة فاخرة عبر المحضار. خبرتهم في السوق المحلي لا تُقدّر بثمن. نتائج فورية.",
    rating: 5,
  },
  {
    name: "منال القرني",
    role: "صاحبة عقار",
    text: "كنت أبحث عن مشتري مناسب لعقاري منذ أشهر. المحضار وجدوه في أسبوعين فقط!",
    rating: 5,
  },
  {
    name: "ماجد الشهري",
    role: "مستثمر",
    text: "المحضار ليس مجرد مكتب عقاري، بل شريك حقيقي في الاستثمار. نتائجهم تتحدث عنهم.",
    rating: 5,
  },
];

const PROPERTY_TYPES = [
  { icon: Building2, label: "عمارات", count: 8 },
  { icon: HomeIcon, label: "فلل", count: 3 },
  { icon: MapPinned, label: "أراضي", count: 1 },
  { icon: Award, label: "قصور", count: 1 },
];

function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-in-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const featured = PROPERTIES.slice(0, 4);
  const lead = featured[0];
  const supporting = featured.slice(1, 4);

  return (
    <>
      <SEO
        title="المحضار للعقار — شريكك الموثوق في السوق العقاري السعودي"
        description="مكتب المحضار للعقار في جدة. بيع وشراء وتأجير العقارات مع خبرة أكثر من 12 عامًا. تواصل معنا الآن."
        url="/"
      />

      {/* Hero */}
      <section className="hero">
        {HERO_SLIDES.map((src, i) => (
          <div key={src} className={`hero-slide ${i === slide ? "active" : ""}`}>
            <img src={src} alt="" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} width="1920" height="800" />
          </div>
        ))}
        <div className="hero-overlay" aria-hidden="true" />
        {/* Slide indicators */}
        <div style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          zIndex: 10,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === slide ? 32 : 10,
                height: 10,
                borderRadius: 5,
                border: "none",
                background: i === slide ? "var(--gold)" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ))}
        </div>
        <div className="site-container hero-content">
          <div className="hero-overline">مكتب المحضار للعقار</div>
          <h1>
            ابحث عن العقار
            <em>الذي يناسبك</em>
          </h1>
          <p>
            نقدم لك أفضل الخيارات العقارية في جدة والمنطقة الغربية. مع خبرة تمتد لأكثر من 12 عامًا،
            نساعدك في العثور على العقار المثالي.
          </p>
          <div className="hero-actions">
            <Link to="/properties" className="btn btn-primary">
              تصفح العقارات
              <ArrowLeft size={18} />
            </Link>
            <Link to="/add-property" className="btn btn-outline">
              أضف عقارك
            </Link>
            <a
              href="https://wa.me/966500094550?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%B9%D8%B1%D8%B6%20%D8%B9%D9%82%D8%A7%D8%B1%20%D9%84%D8%AF%D9%89%20%D8%A7%D9%84%D9%85%D8%AD%D8%B6%D8%A7%D8%B1%20%D9%84%D9%84%D8%B9%D9%82%D8%A7%D8%B1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-strip">
        <div className="site-container">
          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <AnimatedCounter key={i} target={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </div>

      {/* Property Types */}
      <section className="section" style={{ paddingBottom: 60 }} aria-labelledby="types-heading">
        <div className="site-container">
          <div className="property-types-grid fade-in-up">
            {PROPERTY_TYPES.map((type) => (
              <Link
                key={type.label}
                to="/properties"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "20px 24px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--gold-muted)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--gold)",
                  flexShrink: 0,
                }}>
                  <type.icon size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)" }}>{type.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{type.count} عقار متاح</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section" aria-labelledby="featured-heading">
        <div className="site-container">
          <div className="section-intro fade-in-up">
            <div>
              <div className="section-kicker">
                <span className="section-number">01</span>
                العقارات المميزة
              </div>
              <h2 id="featured-heading">أحدث العقارات المتاحة</h2>
            </div>
            <Link
              to="/properties"
              className="btn"
              style={{ color: "var(--navy)", border: "1px solid var(--border)", background: "var(--bg-card)", borderRadius: "var(--radius-full)", padding: "10px 24px", fontSize: 13, fontWeight: 600 }}
            >
              عرض الكل
              <ArrowLeft size={16} />
            </Link>
          </div>
          <p className="section-lead fade-in-up">
            اكتشف مجموعة منتقاة من أفضل العقارات المتاحة في جدة والمدن المجاورة
          </p>

          <div className="featured-showcase fade-in-up">
            {lead && (
              <div className="featured-lead-property">
                <PropertyCard {...lead} />
              </div>
            )}
            <div className="featured-supporting-properties">
              {supporting.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{ background: "var(--bg-card)" }} aria-labelledby="services-heading">
        <div className="site-container">
          <div className="section-intro fade-in-up" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <div>
              <div className="section-kicker" style={{ justifyContent: "center" }}>
                <span className="section-number">02</span>
                خدماتنا
              </div>
              <h2 id="services-heading">خدماتنا العقارية</h2>
            </div>
          </div>
          <p className="section-lead fade-in-up" style={{ textAlign: "center", marginInline: "auto" }}>
            نقدم مجموعة شاملة من الخدمات العقارية المتكاملة
          </p>

          <div className="services-grid fade-in-up">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="service-item">
                <div className="service-icon">
                  <svc.icon size={26} />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" aria-labelledby="why-heading">
        <div className="site-container">
          <div className="section-intro fade-in-up" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <div>
              <div className="section-kicker" style={{ justifyContent: "center" }}>
                <span className="section-number">03</span>
                لماذا نحن
              </div>
              <h2 id="why-heading">لماذا المحضار للعقار؟</h2>
            </div>
          </div>

          <div className="why-us-grid fade-in-up">
            {WHY_US.map((item) => (
              <div key={item.title} className="why-us-item">
                <div className="icon">
                  <item.icon size={28} />
                </div>
                <h3>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.9, marginTop: 12 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: "var(--bg-card)" }} aria-labelledby="testimonials-heading">
        <div className="site-container">
          <div className="section-intro fade-in-up" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <div>
              <div className="section-kicker" style={{ justifyContent: "center" }}>
                <span className="section-number">04</span>
                آراء عملائنا
              </div>
              <h2 id="testimonials-heading">ماذا يقول عملاؤنا</h2>
            </div>
          </div>
          <p className="section-lead fade-in-up" style={{ textAlign: "center", marginInline: "auto" }}>
            نفخر بثقة عملائنا ورضاهم عن خدماتنا
          </p>

          <div className="testimonials-grid fade-in-up">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <Quote
                  size={28}
                  style={{
                    color: "var(--gold)",
                    opacity: 0.15,
                    position: "absolute",
                    top: 20,
                    insetInlineEnd: 20,
                  }}
                />
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={13} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                  ))}
                </div>
                <p style={{
                  color: "var(--text-secondary)",
                  fontSize: 13.5,
                  lineHeight: 2,
                  marginBottom: 20,
                  fontStyle: "italic",
                }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--gold-gradient)",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    flexShrink: 0,
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)" }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section" aria-labelledby="steps-heading">
        <div className="site-container">
          <div className="section-intro fade-in-up" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <div>
              <div className="section-kicker" style={{ justifyContent: "center" }}>
                <span className="section-number">05</span>
                كيف نعمل
              </div>
              <h2 id="steps-heading">ثلاث خطوات بسيطة</h2>
            </div>
          </div>

          <div className="steps-grid fade-in-up">
            {STEPS.map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section fade-in-up">
        <div className="site-container">
          <h2>جاهز للعثور على عقارك؟</h2>
          <p>
            تواصل معنا الآن ودعنا نساعدك في العثور على العقار المثالي الذي يناسب احتياجاتك
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
    </>
  );
}
