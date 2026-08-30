import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MapPin, Maximize2, BedDouble, Bath, Scale, ChevronDown, Sparkles, Home } from "lucide-react";
import SEO from "../components/SEO";
import { PROPERTIES } from "../data/properties";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } },
};

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const compared = PROPERTIES.filter((p) => selected.includes(p.id));

  useEffect(() => {
    setShowTable(compared.length >= 2);
  }, [compared.length]);

  const rows = [
    {
      label: "الصورة",
      render: (p: (typeof PROPERTIES)[0]) => (
        <img
          src={p.image}
          alt={p.title}
          style={{
            width: 140,
            height: 96,
            objectFit: "cover",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        />
      ),
    },
    {
      label: "السعر",
      render: (p: (typeof PROPERTIES)[0]) => (
        <span
          style={{
            fontWeight: 700,
            fontSize: 16,
            background: "var(--gold-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {p.price}
        </span>
      ),
    },
    {
      label: "الموقع",
      render: (p: (typeof PROPERTIES)[0]) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <MapPin size={14} style={{ color: "var(--gold)" }} />
          {p.location}
        </span>
      ),
    },
    {
      label: "المساحة",
      render: (p: (typeof PROPERTIES)[0]) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Maximize2 size={14} style={{ color: "var(--gold)" }} />
          {p.area}
        </span>
      ),
    },
    {
      label: "الغرف",
      render: (p: (typeof PROPERTIES)[0]) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <BedDouble size={14} style={{ color: "var(--gold)" }} />
          {p.beds || "—"}
        </span>
      ),
    },
    {
      label: "الحمامات",
      render: (p: (typeof PROPERTIES)[0]) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Bath size={14} style={{ color: "var(--gold)" }} />
          {p.baths || "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="site-theme">
      <SEO title="مقارنة العقارات — المحضار للعقار" description="قارن بين العقارات واختر الأنسب لك" url="/compare" />

      {/* Hero Section */}
      <section className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(30,42,58,0.03) 0%, rgba(200,169,110,0.06) 100%)" }} />
        <div className="site-container" style={{ position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "var(--gold-gradient)",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "var(--shadow-gold)",
                }}
              >
                <Scale size={22} style={{ color: "#fff" }} />
              </div>
              <span
                style={{
                  color: "var(--gold)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                أداة المقارنة
              </span>
            </div>
            <h1>
              مقارنة <em>العقارات</em>
            </h1>
            <p>اختر حتى 3 عقارات للمقارنة بينها والوصول لأفضل قرار</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          {/* Property Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 28px",
              marginBottom: 36,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                  اختر العقارات للمقارنة
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {selected.length === 0
                    ? "اختر عقارًا واحدًا على الأقل للمقارنة"
                    : selected.length < 2
                      ? `تم اختيار ${selected.length} — اختر عقارًا آخر`
                      : `تم اختيار ${selected.length}/3 عقارات`}
                </p>
              </div>
              {selected.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected([])}
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    background: "var(--bg-warm)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-full)",
                    cursor: "pointer",
                    fontFamily: "var(--font)",
                    transition: "all 0.2s",
                  }}
                >
                  مسح الكل
                </motion.button>
              )}
            </div>

            {/* Selection Progress */}
            <div
              style={{
                height: 4,
                background: "var(--border-light)",
                borderRadius: "var(--radius-full)",
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(selected.length / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: "100%",
                  background: "var(--gold-gradient)",
                  borderRadius: "var(--radius-full)",
                }}
              />
            </div>

            {/* Property Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PROPERTIES.map((p, i) => {
                const isActive = selected.includes(p.id);
                return (
                  <motion.button
                    key={p.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggle(p.id)}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 16px",
                      border: `1.5px solid ${isActive ? "var(--gold)" : "var(--border)"}`,
                      borderRadius: "var(--radius-full)",
                      cursor: selected.length >= 3 && !isActive ? "not-allowed" : "pointer",
                      opacity: selected.length >= 3 && !isActive ? 0.5 : 1,
                      background: isActive ? "var(--gold-muted)" : "var(--bg-card)",
                      color: isActive ? "var(--gold-dark)" : "var(--text-secondary)",
                      fontFamily: "var(--font)",
                      transition: "border-color 0.2s, background 0.2s, color 0.2s",
                      boxShadow: isActive ? "0 2px 12px rgba(200,169,110,0.15)" : "var(--shadow-xs)",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: isActive ? "var(--gold)" : "var(--bg-warm)",
                        color: isActive ? "#fff" : "var(--text-muted)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 10,
                        transition: "all 0.2s",
                      }}
                    >
                      {isActive ? <X size={10} /> : <Plus size={10} />}
                    </span>
                    {p.title.length > 28 ? p.title.slice(0, 28) + "…" : p.title}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Comparison Table */}
          <AnimatePresence mode="wait">
            {showTable ? (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflowX: "auto", borderRadius: "var(--radius-lg)" }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-lg)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "20px 24px",
                          textAlign: "right",
                          background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#fff",
                          borderBottom: "none",
                          minWidth: 140,
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Scale size={14} style={{ color: "var(--gold-light)" }} />
                          المعلومة
                        </span>
                      </th>
                      {compared.map((p, i) => (
                        <motion.th
                          key={p.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          style={{
                            padding: "20px 24px",
                            textAlign: "center",
                            background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#fff",
                            borderBottom: "none",
                            minWidth: 220,
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <span>{p.title}</span>
                            <span
                              style={{
                                fontSize: 11,
                                color: "var(--gold-light)",
                                fontWeight: 500,
                              }}
                            >
                              {p.type}
                            </span>
                          </div>
                        </motion.th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <motion.tr
                        key={row.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + ri * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "var(--gold-muted)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--navy)",
                            borderBottom: "1px solid var(--border-light)",
                          }}
                        >
                          {row.label}
                        </td>
                        {compared.map((p) => (
                          <td
                            key={p.id}
                            style={{
                              padding: "16px 24px",
                              textAlign: "center",
                              fontSize: 14,
                              color: "var(--text)",
                              borderBottom: "1px solid var(--border-light)",
                            }}
                          >
                            {row.render(p)}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{
                  textAlign: "center",
                  padding: "100px 20px",
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-xl)",
                  border: "2px dashed var(--border)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 24,
                    background: "var(--gold-muted)",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <Scale size={32} style={{ color: "var(--gold)" }} />
                </motion.div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "var(--navy)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  اختر عقارات للمقارنة
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14.5, maxWidth: 360, margin: "0 auto", lineHeight: 1.8 }}>
                  اختر من 2 إلى 3 عقارات من القائمة أعلاه لعرض جدول المقارنة التفصيلي
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 24,
                    color: "var(--text-muted)",
                    fontSize: 12,
                  }}
                >
                  <Sparkles size={14} style={{ color: "var(--gold)" }} />
                  <span>يمكنك اختيار حتى 3 عقارات</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Compare Cards */}
          {compared.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ marginTop: 40 }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--navy)",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Home size={18} style={{ color: "var(--gold)" }} />
                العقارات المختارة
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                <AnimatePresence>
                  {compared.map((p, i) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(200,169,110,0.12)" }}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        boxShadow: "var(--shadow-sm)",
                        transition: "box-shadow 0.3s",
                        cursor: "pointer",
                      }}
                      onClick={() => window.location.href = `/properties/${p.id}`}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggle(p.id);
                          }}
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)",
                            border: "none",
                            cursor: "pointer",
                            display: "grid",
                            placeItems: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "#ff4444";
                            (e.currentTarget as HTMLElement).style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)";
                            (e.currentTarget as HTMLElement).style.color = "inherit";
                          }}
                          aria-label={`إزالة ${p.title}`}
                        >
                          <X size={14} />
                        </button>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            left: 10,
                            color: "#fff",
                          }}
                        >
                          <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>{p.type}</div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{p.title}</div>
                        </div>
                      </div>
                      <div style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            background: "var(--gold-gradient)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginBottom: 8,
                          }}
                        >
                          {p.price}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            fontSize: 12,
                            color: "var(--text-muted)",
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <MapPin size={12} style={{ color: "var(--gold)" }} />
                            {p.location.split("·")[1]?.trim() || p.location}
                          </span>
                          <span>•</span>
                          <span>{p.area}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
