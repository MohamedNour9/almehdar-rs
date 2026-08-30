// ============================================
// Analytics & Tracking Utilities
// ============================================

// Umami-compatible pageview tracking
export function trackPageview(path: string, title?: string) {
  if (typeof window === "undefined") return;
  window.umami?.track("pageview", { path, title: title || document.title });
}

// Event tracking
export function trackEvent(name: string, data?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.umami?.track(name, data);
}

// Conversion tracking (WhatsApp click)
export function trackWhatsAppClick(propertyId?: string) {
  trackEvent("whatsapp_click", { property_id: propertyId || "general" });
}

// Property view tracking
export function trackPropertyView(propertyId: string, title: string) {
  trackEvent("property_view", { property_id: propertyId, title });
}

// Search tracking
export function trackSearch(query: string, results: number) {
  trackEvent("search", { query, results_count: results });
}

// Filter tracking
export function trackFilter(filterType: string, value: string) {
  trackEvent("filter", { filter_type: filterType, value });
}

// Favorite tracking
export function trackFavorite(propertyId: string, action: "add" | "remove") {
  trackEvent("favorite", { property_id: propertyId, action });
}

// Booking tracking
export function trackBooking(propertyId: string) {
  trackEvent("booking_request", { property_id: propertyId });
}

// ============================================
// A/B Testing
// ============================================

type ABTestVariant = "A" | "B";

const AB_STORAGE_KEY = "almahddar.ab_tests";

function getABTests(): Record<string, ABTestVariant> {
  try {
    const raw = localStorage.getItem(AB_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function setABTests(tests: Record<string, ABTestVariant>) {
  localStorage.setItem(AB_STORAGE_KEY, JSON.stringify(tests));
}

export function getVariant(testName: string): ABTestVariant {
  const tests = getABTests();
  if (tests[testName]) return tests[testName];
  const variant: ABTestVariant = Math.random() > 0.5 ? "A" : "B";
  tests[testName] = variant;
  setABTests(tests);
  return variant;
}

// ============================================
// Web Vitals
// ============================================

export function reportWebVitals() {
  if (typeof window === "undefined") return;

  // LCP
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      trackEvent("web_vital", { metric: "LCP", value: Math.round(lastEntry.startTime) });
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch {}

  // FID
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        trackEvent("web_vital", { metric: "FID", value: Math.round(entry.processingStart - entry.startTime) });
      });
    }).observe({ type: "first-input", buffered: true });
  } catch {}

  // CLS
  try {
    let clsValue = 0;
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) clsValue += entry.value;
      });
      trackEvent("web_vital", { metric: "CLS", value: Math.round(clsValue * 1000) });
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
}

// ============================================
// Rate Limiting (client-side)
// ============================================

const RATE_LIMIT_KEY = "almahddar.rate_limit";

export function checkRateLimit(action: string, maxPerMinute = 10): boolean {
  const now = Date.now();
  const key = `${RATE_LIMIT_KEY}.${action}`;
  try {
    const raw = localStorage.getItem(key);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter((t) => now - t < 60000);
    if (recent.length >= maxPerMinute) return false;
    recent.push(now);
    localStorage.setItem(key, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
}

// Declare global umami type
declare global {
  interface Window {
    umami?: { track: (name: string, data?: Record<string, string | number>) => void };
  }
}
