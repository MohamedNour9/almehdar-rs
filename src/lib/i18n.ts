// ============================================
// i18n - Internationalization
// ============================================

export type Locale = "ar" | "en";

const translations: Record<Locale, Record<string, string>> = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.properties": "العقارات",
    "nav.services": "الخدمات",
    "nav.about": "عن المكتب",
    "nav.contact": "تواصل",
    "hero.title1": "نجد لك العقار",
    "hero.title2": "المناسب بثقة",
    "hero.desc": "خيارات عقارية مدروسة وحلول تساعدك على الوصول إلى العقار المناسب للبيع أو الإيجار.",
    "hero.cta1": "استكشف العقارات",
    "hero.cta2": "تواصل عبر واتساب",
    "stats.properties": "عقار متاح",
    "stats.experience": "سنة خبرة",
    "stats.satisfaction": "رضا العملاء",
    "featured.title": "عقارات مميزة",
    "featured.kicker": "مختاراتنا",
    "featured.viewAll": "عرض كل العقارات",
    "services.title": "خدماتنا العقارية",
    "services.kicker": "من احتياجك إلى قرارك",
    "about.title": "عن المحضار للعقار",
    "about.subtitle": "حلول عقارية ت开始 من احتياجك.",
    "about.desc": "المحضار للعقار هو مكتب عقاري يقدم حلولًا وخدمات تساعد العملاء في الوصول إلى الخيارات المناسبة للبيع والشراء والتأجير.",
    "whyUs.title": "لماذا المحضار؟",
    "whyUs.desc": "نضع احتياج العميل في المقدمة، ونبني تجربة تواصل سهلة من أول سؤال حتى الوصول إلى الخيار المناسب.",
    "steps.title": "كيف نساعدك؟",
    "cta.title": "العقار المناسب يبدأ بخطوة",
    "cta.desc": "دعنا نسمع احتياجك. تواصل معنا ونساعدك في الوصول إلى الخيار المناسب.",
    "cta.button": "تحدث معنا عبر واتساب",
    "footer.brand": "مكتب عقاري يساعد العملاء في الوصول إلى خيارات مناسبة للبيع والشراء والتأجير.",
    "footer.services": "الخدمات",
    "footer.more": "المزيد",
    "footer.contact": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة",
    "property.forSale": "للبيع",
    "property.forRent": "للإيجار",
    "property.area": "المساحة",
    "property.beds": "الغرف",
    "property.baths": "الحمامات",
    "property.location": "الموقع",
    "property.price": "السعر",
    "property.inquire": "استفسار عبر واتساب",
    "property.bookVisit": "حجز موعد",
    "property.save": "حفظ",
    "property.saved": "محفوظ",
    "property.share": "مشاركة",
    "property.print": "طباعة",
    "property.description": "وصف العقار",
    "property.map": "الموقع على الخريطة",
    "filter.all": "الكل",
    "filter.sale": "للبيع",
    "filter.rent": "للإيجار",
    "filter.allTypes": "كل الأنواع",
    "filter.results": "عقار",
    "compare.title": "مقارنة العقارات",
    "compare.add": "أضف عقار للمقارنة",
    "calculator.title": "حاسبة القوة الشرائية",
    "favorites.title": "عقاراتك المفضلة",
    "favorites.empty": "لم تقم بحفظ أي عقار بعد",
    "favorites.cta": "ابدأ بحفظ العقارات التي تعجبك",
    "notFound.title": "الصفحة غير موجودة",
    "notFound.desc": "يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    "notFound.cta": "العودة للرئيسية",
    "darkMode": "الوضع الداكن",
    "lightMode": "الوضع الفاتح",
    "skipToContent": "تخطي للمحتوى الرئيسي",
  },
  en: {
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.title1": "We find you the",
    "hero.title2": "right property",
    "hero.desc": "Carefully curated real estate options for sale or rent, with direct communication to reach the right property.",
    "hero.cta1": "Explore Properties",
    "hero.cta2": "Contact via WhatsApp",
    "stats.properties": "Available Properties",
    "stats.experience": "Years Experience",
    "stats.satisfaction": "Client Satisfaction",
    "featured.title": "Featured Properties",
    "featured.kicker": "Our Selection",
    "featured.viewAll": "View All Properties",
    "services.title": "Our Real Estate Services",
    "services.kicker": "From Your Need to Your Decision",
    "about.title": "About Al Mahddar Real Estate",
    "about.subtitle": "Real estate solutions starting from your need.",
    "about.desc": "Al Mahddar Real Estate is an office that provides solutions and services to help clients reach suitable options for buying, selling, and renting.",
    "whyUs.title": "Why Al Mahddar?",
    "whyUs.desc": "We put the client's need first, and build an easy communication experience from the first question to reaching the right option.",
    "steps.title": "How Do We Help?",
    "cta.title": "The Right Property Starts with a Step",
    "cta.desc": "Let us hear your need. Contact us and we'll help you reach the right option.",
    "cta.button": "Talk to us on WhatsApp",
    "footer.brand": "A real estate office helping clients reach suitable options for buying, selling, and renting.",
    "footer.services": "Services",
    "footer.more": "More",
    "footer.contact": "Contact Us",
    "footer.rights": "All Rights Reserved",
    "property.forSale": "For Sale",
    "property.forRent": "For Rent",
    "property.area": "Area",
    "property.beds": "Beds",
    "property.baths": "Baths",
    "property.location": "Location",
    "property.price": "Price",
    "property.inquire": "Inquire via WhatsApp",
    "property.bookVisit": "Book a Visit",
    "property.save": "Save",
    "property.saved": "Saved",
    "property.share": "Share",
    "property.print": "Print",
    "property.description": "Description",
    "property.map": "Location on Map",
    "filter.all": "All",
    "filter.sale": "For Sale",
    "filter.rent": "For Rent",
    "filter.allTypes": "All Types",
    "filter.results": "properties",
    "compare.title": "Compare Properties",
    "compare.add": "Add a property to compare",
    "calculator.title": "Purchasing Power Calculator",
    "favorites.title": "Your Favorite Properties",
    "favorites.empty": "You haven't saved any properties yet",
    "favorites.cta": "Start saving properties you like",
    "notFound.title": "Page Not Found",
    "notFound.desc": "The page you're looking for doesn't exist or has been moved.",
    "notFound.cta": "Back to Home",
    "darkMode": "Dark Mode",
    "lightMode": "Light Mode",
    "skipToContent": "Skip to Content",
  },
};

// Locale storage
const LOCALE_KEY = "almahddar.locale";

export function getLocale(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {}
  return "ar";
}

export function setLocale(locale: Locale) {
  localStorage.setItem(LOCALE_KEY, locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

export function t(key: string, locale?: Locale): string {
  const loc = locale || getLocale();
  return translations[loc][key] || translations.ar[key] || key;
}

export function useTranslation() {
  const locale = getLocale();
  return { t: (key: string) => t(key, locale), locale, setLocale };
}
