import { BookOpen, TrendingUp, Calculator, Home as HomeIcon } from "lucide-react";
import SEO from "../components/SEO";

const GUIDES = [
  {
    icon: HomeIcon,
    title: "دليل شراء العقارات",
    desc: "خطوات عملية ونصائح مهمة لشراء العقار المناسب. من تحديد الميزانية إلى التوقيع على العقد.",
    tags: ["شراء", "نصائح", "خطوات"],
  },
  {
    icon: BookOpen,
    title: "دليل تأجير العقارات",
    desc: "كل ما تحتاج معرفته عن تأجير العقارات. حقوق المستأجر والمالك وصياغة العقود.",
    tags: ["تأجير", "عقود", "حقوق"],
  },
  {
    icon: TrendingUp,
    title: "دليل الاستثمار العقاري",
    desc: "كيف تبدأ الاستثمار في العقارات وأفضل المناطق العقارية في جدة والمنطقة الغربية.",
    tags: ["استثمار", "عوائد", "تحليل"],
  },
  {
    icon: Calculator,
    title: "حاسبة القوة الشرائية",
    desc: "احسب قدرتك الشرائية ومعرفة هل يمكنك شراء العقار الذي تحلم به.",
    tags: ["حاسبة", "تمويل", "أقساط"],
  },
];

export default function GuidesPage() {
  return (
    <div className="site-theme">
      <SEO
        title="الإرشادات العقارية — المحضار للعقار"
        description="أدلة وإرشادات عقارية شاملة: شراء، تأجير، استثمار، وحاسبة القوة الشرائية."
        url="/guides"
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="site-container">
          <h1>
            الإرشادات <em>العقارية</em>
          </h1>
          <p>
            أدلة ونصائح عقارية تساعدك في اتخاذ قرارات مدروسة في رحلتك العقارية
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section">
        <div className="site-container">
          <div className="guides-grid">
            {GUIDES.map((guide) => (
              <div key={guide.title} className="guide-card fade-in-up">
                <div className="icon-wrap">
                  <guide.icon size={22} />
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.desc}</p>
                <div className="guide-tags">
                  {guide.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section" style={{ background: "var(--bg-card)" }}>
        <div className="site-container" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ justifyContent: "center" }}>
            <span className="section-number">01</span>
            أداة مساعدة
          </div>
          <h2 style={{ margin: "8px 0 16px", fontSize: 28, fontWeight: 700, color: "var(--navy)" }}>
            حاسبة القوة الشرائية
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.9, maxWidth: 480, marginInline: "auto", marginBottom: 32 }}>
            احسب قدرتك الشرائية بناءً على دخلك الشهري ومواردك المادية
          </p>
          <a href="/calculator" className="btn btn-primary">
            افتح الحاسبة
          </a>
        </div>
      </section>

      {/* Tips Section */}
      <section className="section">
        <div className="site-container">
          <div className="section-intro fade-in-up" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <div>
              <div className="section-kicker" style={{ justifyContent: "center" }}>
                <span className="section-number">02</span>
                نصائح سريعة
              </div>
              <h2>نصائح عقارية مهمة</h2>
            </div>
          </div>

          <div className="why-us-grid fade-in-up">
            {[
              { title: "حدد ميزانيتك أولاً", desc: "قبل البحث عن عقار، حدد المبلغ الذي تستطيع دفعه كدفعة أولى والأقساط الشهرية." },
              { title: "افحص العقار جيداً", desc: "تأكد من حالة العقار البنائية والقانونية قبل اتخاذ أي قرار." },
              { title: "لا تتسرع في القرار", desc: "خذ وقتك في المقارنة والاستشارة. القرار العقاري قرار طويل المدى." },
            ].map((tip) => (
              <div key={tip.title} className="why-us-item">
                <h3>{tip.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.8, marginTop: 8 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
