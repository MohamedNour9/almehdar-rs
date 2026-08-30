import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Home,
  MapPin,
  User,
  Upload,
  X,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Building2,
  BedDouble,
  Bath,
  Maximize2,
  FileText,
  Loader2,
  CircleCheck,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import SEO from "@/components/SEO";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PropertyData {
  listingType: "sale" | "rent" | "";
  propertyType: string;
  city: string;
  district: string;
  price: string;
  area: string;
  rooms: string;
  bathrooms: string;
  description: string;
  ownerName: string;
  phone: string;
  email: string;
}

interface ImageFile {
  file: File;
  preview: string;
  isMain: boolean;
  id: string;
}

const INITIAL_DATA: PropertyData = {
  listingType: "",
  propertyType: "",
  city: "",
  district: "",
  price: "",
  area: "",
  rooms: "",
  bathrooms: "",
  description: "",
  ownerName: "",
  phone: "",
  email: "",
};

const PROPERTY_TYPES = [
  "شقة",
  "فيلا",
  "بنتهاوس",
  "دوبلكس",
  "استوديو",
  "أرض",
  "محل تجاري",
  "مكتب",
  "عمارة",
];

const CITIES = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الظهران",
  "الخبر",
  "تبوك",
  "أبها",
  "النعيم",
  "القطيف",
];

const STEP_LABELS = ["بيانات العقار", "الموقع والتفاصيل", "الصور", "بيانات المالك"];

const WHATSAPP_PHONE = "+966500094550";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "السلام عليكم، أرغب في عرض عقاري لدى المحضار للعقار.",
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function formatPrice(value: string): string {
  const num = value.replace(/[^\d]/g, "");
  if (!num) return "";
  return Number(num).toLocaleString("ar-SA");
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
  }),
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <Progress
        value={((currentStep + 1) / totalSteps) * 100}
        className="mb-6 h-2"
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {labels.map((label, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}
          >
            <motion.div
              animate={
                i === currentStep
                  ? { scale: [1, 1.12, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.4 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontSize: 14,
                fontWeight: 700,
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                background:
                  i < currentStep
                    ? "var(--gold-gradient)"
                    : i === currentStep
                      ? "var(--navy)"
                      : "var(--bg-warm)",
                color:
                  i <= currentStep ? "#fff" : "var(--text-muted)",
                boxShadow:
                  i === currentStep
                    ? "0 4px 20px rgba(30,42,58,0.25)"
                    : i < currentStep
                      ? "var(--shadow-gold)"
                      : "none",
              }}
            >
              {i < currentStep ? (
                <Check style={{ width: 16, height: 16 }} />
              ) : (
                i + 1
              )}
            </motion.div>
            <span
              style={{
                fontSize: 11,
                textAlign: "center",
                lineHeight: 1.4,
                fontWeight: i <= currentStep ? 600 : 400,
                color: i <= currentStep ? "var(--navy)" : "var(--text-muted)",
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FormField({
  label,
  icon: Icon,
  required,
  error,
  children,
}: {
  label: string;
  icon?: React.ElementType;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
        {Icon && <Icon style={{ width: 16, height: 16, color: "var(--gold)" }} />}
        {label}
        {required && <span style={{ color: "var(--gold)" }}>*</span>}
      </Label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function AddProperty() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<PropertyData>(INITIAL_DATA);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 4;

  const updateData = useCallback(
    (field: keyof PropertyData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  // -- Validation per step --
  const validateStep = useCallback(
    (s: number): boolean => {
      const e: Record<string, string> = {};

      if (s === 0) {
        if (!data.listingType) e.listingType = "اختر نوع الطلب";
        if (!data.propertyType) e.propertyType = "اختر نوع العقار";
        if (!data.price || Number(data.price.replace(/[^\d]/g, "")) <= 0)
          e.price = "أدخل سعرًا صحيحًا";
      }
      if (s === 1) {
        if (!data.city) e.city = "اختر المدينة";
        if (!data.area || Number(data.area) <= 0) e.area = "أدخل المساحة";
      }
      if (s === 3) {
        if (!data.ownerName.trim()) e.ownerName = "أدخل اسم المالك";
        if (!data.phone.trim()) e.phone = "أدخل رقم الجوال";
        else if (!/^[\d+\s()-]{7,20}$/.test(data.phone))
          e.phone = "أدخل رقم جوال صحيح";
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
          e.email = "أدخل بريدًا إلكترونيًا صحيحًا";
      }

      setErrors(e);
      return Object.keys(e).length === 0;
    },
    [data],
  );

  const goNext = useCallback(() => {
    if (!validateStep(step)) return;
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  // -- Image handling --
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const maxSize = 5 * 1024 * 1024;
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic"];

      const valid = files.filter((f) => {
        if (!allowed.includes(f.type)) return false;
        if (f.size > maxSize) return false;
        return true;
      });

      const newImages: ImageFile[] = valid.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isMain: images.length === 0 && valid.indexOf(file) === 0,
        id: generateId(),
      }));

      setImages((prev) => [...prev, ...newImages]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [images.length],
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  }, []);

  const setMainImage = useCallback((id: string) => {
    setImages((prev) =>
      prev.map((img) => ({ ...img, isMain: img.id === id })),
    );
  }, []);

  // -- Submit --
  const handleSubmit = useCallback(async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }, [validateStep]);

  // -- Render --

  // Success screen
  if (isSubmitted) {
    return (
      <div className="site-theme">
        <SEO title="تم الإرسال — المحضار للعقار" description="تم استلام بيانات عقارك بنجاح" url="/add-property" />
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-warm) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              maxWidth: 500,
              width: "100%",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 12 }}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "var(--gold-gradient)",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 32px",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <CircleCheck style={{ width: 44, height: 44, color: "#fff" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "var(--navy)",
                  marginBottom: 12,
                  fontFamily: "var(--font-display)",
                  lineHeight: 1.3,
                }}
              >
                تم استلام بيانات عقارك بنجاح
              </h1>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 15,
                  lineHeight: 2,
                  maxWidth: 380,
                  margin: "0 auto",
                }}
              >
                شكرًا لتواصلك مع المحضار للعقار، سيقوم فريقنا بمراجعة البيانات
                والتواصل معك.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 40,
              }}
            >
              <a
                href={`https://wa.me/${WHATSAPP_PHONE.replace("+", "")}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ justifyContent: "center" }}
              >
                <MessageCircle style={{ width: 18, height: 18 }} />
                تواصل معنا عبر واتساب
              </a>
              <button
                className="btn"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--navy)",
                  border: "1.5px solid var(--border)",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(0);
                  setData(INITIAL_DATA);
                  setImages([]);
                }}
              >
                <Home style={{ width: 16, height: 16 }} />
                إضافة عقار آخر
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="site-theme">
      <SEO title="أضف عقارك — المحضار للعقار" description="أضف عقارك للبيع أو الإيجار بسهولة" url="/add-property" />

      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border-light)",
          background: "var(--bg-frosted)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{ maxWidth: 720, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "var(--gold-gradient)",
                display: "grid",
                placeItems: "center",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <Building2 style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>
              أضف عقارك
            </h1>
          </div>
          <button
            onClick={() => window.history.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text-secondary)",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              fontFamily: "var(--font)",
              transition: "all 0.2s",
            }}
          >
            <ArrowRight style={{ width: 14, height: 14 }} />
            رجوع
          </button>
        </div>
      </header>

      {/* Main Form */}
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
        <StepIndicator
          currentStep={step}
          totalSteps={totalSteps}
          labels={STEP_LABELS}
        />

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
            padding: "32px 28px",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              {/* Step 0: Property Data */}
              {step === 0 && (
                <div>
                  <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                      بيانات العقار
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      أدخل البيانات الأساسية عن عقارك
                    </p>
                  </div>

                  <FormField label="نوع الطلب" icon={FileText} required error={errors.listingType}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        { value: "sale", label: "بيع", icon: Home },
                        { value: "rent", label: "إيجار", icon: Key },
                      ].map(({ value, label, icon: Icon }) => (
                        <motion.button
                          key={value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateData("listingType", value)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            borderRadius: 12,
                            border: `2px solid ${data.listingType === value ? "var(--gold)" : "var(--border)"}`,
                            background: data.listingType === value ? "var(--gold-muted)" : "var(--bg-card)",
                            color: data.listingType === value ? "var(--gold-dark)" : "var(--text-secondary)",
                            padding: "18px 16px",
                            cursor: "pointer",
                            fontFamily: "var(--font)",
                            fontSize: 14,
                            fontWeight: 600,
                            transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                            boxShadow: data.listingType === value ? "0 2px 12px rgba(200,169,110,0.15)" : "var(--shadow-xs)",
                          }}
                        >
                          <Icon style={{ width: 20, height: 20 }} />
                          {label}
                        </motion.button>
                      ))}
                    </div>
                  </FormField>

                  <FormField label="نوع العقار" icon={Building2} required error={errors.propertyType}>
                    <select
                      value={data.propertyType}
                      onChange={(e) => updateData("propertyType", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        fontSize: 14,
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        background: "var(--bg-card)",
                        color: "var(--text)",
                        fontFamily: "var(--font)",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">اختر نوع العقار</option>
                      {PROPERTY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="السعر المطلوب (ريال سعودي)" icon={FileText} required error={errors.price}>
                    <div style={{ position: "relative" }}>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="مثال: 500,000"
                        value={data.price ? formatPrice(data.price) : ""}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^\d]/g, "");
                          updateData("price", raw);
                        }}
                        style={{ textAlign: "left", direction: "ltr", paddingRight: 48 }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--gold)",
                        }}
                      >
                        ر.س
                      </span>
                    </div>
                  </FormField>

                  <FormField label="المساحة (م²)" icon={Maximize2} required error={errors.area}>
                    <Input
                      type="number"
                      placeholder="مثال: 200"
                      value={data.area}
                      onChange={(e) => updateData("area", e.target.value)}
                      min="1"
                      style={{ textAlign: "left", direction: "ltr" }}
                    />
                  </FormField>
                </div>
              )}

              {/* Step 1: Location & Details */}
              {step === 1 && (
                <div>
                  <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                      الموقع والتفاصيل
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      حدد موقع العقار ومواصفاته
                    </p>
                  </div>

                  <FormField label="المدينة" icon={MapPin} required error={errors.city}>
                    <select
                      value={data.city}
                      onChange={(e) => updateData("city", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        fontSize: 14,
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        background: "var(--bg-card)",
                        color: "var(--text)",
                        fontFamily: "var(--font)",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">اختر المدينة</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="الحي" icon={MapPin}>
                    <Input
                      placeholder="مثال: حي النرجس"
                      value={data.district}
                      onChange={(e) => updateData("district", e.target.value)}
                    />
                  </FormField>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <FormField label="عدد الغرف" icon={BedDouble} error={errors.rooms}>
                      <Input
                        type="number"
                        placeholder="0"
                        value={data.rooms}
                        onChange={(e) => updateData("rooms", e.target.value)}
                        min="0"
                        style={{ textAlign: "left", direction: "ltr" }}
                      />
                    </FormField>

                    <FormField label="عدد الحمامات" icon={Bath} error={errors.bathrooms}>
                      <Input
                        type="number"
                        placeholder="0"
                        value={data.bathrooms}
                        onChange={(e) => updateData("bathrooms", e.target.value)}
                        min="0"
                        style={{ textAlign: "left", direction: "ltr" }}
                      />
                    </FormField>
                  </div>

                  <FormField label="وصف العقار" icon={FileText}>
                    <Textarea
                      placeholder="اكتب وصفًا تفصيليًا للعقار..."
                      rows={4}
                      value={data.description}
                      onChange={(e) => updateData("description", e.target.value)}
                      style={{ resize: "none" }}
                    />
                  </FormField>
                </div>
              )}

              {/* Step 2: Images */}
              {step === 2 && (
                <div>
                  <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                      صور العقار
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      ارفع صورًا عالية الجودة للعقار (اختياري)
                    </p>
                  </div>

                  {/* Upload zone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 14,
                      borderRadius: 16,
                      border: "2px dashed var(--border)",
                      padding: "48px 24px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      background: "var(--bg)",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: "var(--gold-muted)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Upload style={{ width: 24, height: 24, color: "var(--gold)" }} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>
                        اضغط لرفع الصور
                      </p>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                        JPG, PNG, WebP — حتى 5 ميجابايت لكل صورة
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic"
                    multiple
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />

                  {/* Image previews */}
                  {images.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginTop: 16 }}>
                      <AnimatePresence>
                        {images.map((img, i) => (
                          <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            style={{
                              position: "relative",
                              borderRadius: 14,
                              overflow: "hidden",
                              border: `2px solid ${img.isMain ? "var(--gold)" : "var(--border)"}`,
                              boxShadow: img.isMain ? "var(--shadow-gold)" : "var(--shadow-xs)",
                            }}
                          >
                            <img
                              src={img.preview}
                              alt="معاينة"
                              style={{
                                aspectRatio: "1",
                                width: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                            {img.isMain && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                  background: "var(--gold-gradient)",
                                  color: "#fff",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  padding: "4px 10px",
                                  borderRadius: "var(--radius-full)",
                                }}
                              >
                                <Star style={{ width: 10, height: 10, fill: "currentColor" }} />
                                رئيسية
                              </div>
                            )}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0,0,0,0.45)",
                                opacity: 0,
                                transition: "opacity 0.25s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                              }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0"; }}
                            >
                              {!img.isMain && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMainImage(img.id);
                                  }}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    background: "rgba(255,255,255,0.9)",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "grid",
                                    placeItems: "center",
                                  }}
                                >
                                  <Star style={{ width: 14, height: 14, color: "var(--gold)" }} />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(img.id);
                                }}
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 8,
                                  background: "#dc2626",
                                  border: "none",
                                  cursor: "pointer",
                                  display: "grid",
                                  placeItems: "center",
                                }}
                              >
                                <X style={{ width: 14, height: 14, color: "#fff" }} />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}

                  {images.length === 0 && (
                    <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginTop: 16 }}>
                      لم تقم برفع أي صور بعد. يمكنك التخطي لإتمام البيانات لاحقًا.
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Owner Info + Summary */}
              {step === 3 && (
                <div>
                  <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                      بيانات المالك
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      أدخل بياناتك للتواصل معك
                    </p>
                  </div>

                  <FormField label="اسم المالك" icon={User} required error={errors.ownerName}>
                    <Input
                      placeholder="الاسم الكامل"
                      value={data.ownerName}
                      onChange={(e) => updateData("ownerName", e.target.value)}
                    />
                  </FormField>

                  <FormField label="رقم الجوال" icon={Phone} required error={errors.phone}>
                    <div style={{ position: "relative" }} dir="ltr">
                      <span
                        style={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--gold)",
                          zIndex: 1,
                        }}
                      >
                        +966
                      </span>
                      <Input
                        type="tel"
                        placeholder="5XXXXXXXX"
                        value={data.phone}
                        onChange={(e) => updateData("phone", e.target.value)}
                        style={{ paddingLeft: 48, textAlign: "left" }}
                      />
                    </div>
                  </FormField>

                  <FormField label="البريد الإلكتروني" icon={Mail} error={errors.email}>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={data.email}
                      onChange={(e) => updateData("email", e.target.value)}
                      dir="ltr"
                      style={{ textAlign: "left" }}
                    />
                  </FormField>

                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    style={{
                      marginTop: 32,
                      paddingTop: 24,
                      borderTop: "1px solid var(--border-light)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        marginBottom: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "var(--navy)",
                      }}
                    >
                      <Shield style={{ width: 16, height: 16, color: "var(--gold)" }} />
                      ملخص البيانات
                    </h3>
                    <div
                      style={{
                        background: "var(--bg-warm)",
                        borderRadius: 16,
                        padding: "20px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        fontSize: 13,
                      }}
                    >
                      <SummaryRow
                        label="نوع الطلب"
                        value={data.listingType === "sale" ? "بيع" : "إيجار"}
                      />
                      <SummaryRow label="نوع العقار" value={data.propertyType} />
                      <SummaryRow
                        label="السعر"
                        value={data.price ? `${formatPrice(data.price)} ر.س` : "—"}
                      />
                      <SummaryRow
                        label="المساحة"
                        value={data.area ? `${data.area} م²` : "—"}
                      />
                      <SummaryRow label="المدينة" value={data.city || "—"} />
                      <SummaryRow label="الحي" value={data.district || "—"} />
                      {data.rooms && <SummaryRow label="الغرف" value={data.rooms} />}
                      {data.bathrooms && <SummaryRow label="الحمامات" value={data.bathrooms} />}
                      {data.description && (
                        <SummaryRow label="الوصف" value={data.description} />
                      )}
                      <SummaryRow label="اسم المالك" value={data.ownerName} />
                      <SummaryRow label="رقم الجوال" value={`+966${data.phone}`} />
                      {data.email && <SummaryRow label="البريد" value={data.email} />}
                      {images.length > 0 && (
                        <SummaryRow
                          label="الصور"
                          value={`${images.length} صورة${images.length > 1 ? " (رئيسية محددة)" : ""}`}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
            gap: 12,
          }}
        >
          {step > 0 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goBack}
              className="btn"
              style={{
                background: "var(--bg-card)",
                color: "var(--navy)",
                border: "1.5px solid var(--border)",
              }}
            >
              <ArrowRight style={{ width: 16, height: 16 }} />
              السابق
            </motion.button>
          ) : (
            <div />
          )}

          {step < totalSteps - 1 ? (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={goNext}
              className="btn btn-primary"
            >
              التالي
              <ArrowLeft style={{ width: 16, height: 16 }} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ minWidth: 200, justifyContent: "center" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Check style={{ width: 16, height: 16 }} />
                  إرسال بيانات العقار
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </main>
    </div>
  );
}

// -- Summary Row --
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        paddingBottom: 10,
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <span style={{ color: "var(--text-muted)", flexShrink: 0, fontSize: 13 }}>{label}</span>
      <span style={{ color: "var(--navy)", fontWeight: 600, textAlign: "left", fontSize: 13 }}>{value}</span>
    </div>
  );
}

// -- Key icon (for rent) --
function Key(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  );
}
