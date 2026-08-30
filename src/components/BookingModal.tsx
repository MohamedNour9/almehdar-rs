import { useState } from "react";
import { X, Calendar, Clock, MessageCircle, Check } from "lucide-react";

const WHATSAPP_PHONE = "+966500094550";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
}

const TIME_SLOTS = [
  "09:00 صباحاً", "10:00 صباحاً", "11:00 صباحاً",
  "02:00 ظهراً", "03:00 ظهراً", "04:00 ظهراً",
  "05:00 مساءً", "06:00 مساءً", "07:00 مساءً",
];

export default function BookingModal({ open, onClose, propertyTitle }: BookingModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  if (!open) return null;

  const handleBook = () => {
    if (!date || !time || !name || !phone) return;
    const msg = `السلام عليكم، أريد حجز موعد لمعاينة العقار:\n${propertyTitle}\nالتاريخ: ${date}\nالوقت: ${time}\nالاسم: ${name}\nالجوال: ${phone}`;
    window.open(`https://wa.me/${WHATSAPP_PHONE.replace("+", "")}?text=${encodeURIComponent(msg)}`, "_blank");
    setBooked(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    fontSize: 14,
    fontFamily: "var(--font)",
    boxSizing: "border-box",
    borderRadius: "var(--radius-sm)",
    color: "var(--text)",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
    color: "var(--navy)",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div
        style={{
          background: "var(--bg-card)",
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-2xl)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-light)",
        }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: "var(--navy)" }}>حجز موعد للمعاينة</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "4px 0 0" }}>{propertyTitle}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg-warm)",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              transition: "all 0.2s",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {booked ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--green)",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 20px",
              boxShadow: "0 4px 16px rgba(45, 140, 90, 0.3)",
            }}>
              <Check size={30} />
            </div>
            <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "var(--navy)" }}>تم الحجز بنجاح!</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8 }}>سيتواصل معك فريقنا قريباً لتأكيد الموعد</p>
          </div>
        ) : (
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}><Calendar size={14} style={{ marginLeft: 4, color: "var(--gold)" }} /> التاريخ</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}><Clock size={14} style={{ marginLeft: 4, color: "var(--gold)" }} /> الوقت</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    style={{
                      padding: "10px 4px",
                      fontSize: 11,
                      border: `1.5px solid ${time === slot ? "var(--gold)" : "var(--border)"}`,
                      background: time === slot ? "var(--gold-muted)" : "var(--bg-card)",
                      color: time === slot ? "var(--gold-dark)" : "var(--text-secondary)",
                      cursor: "pointer",
                      fontFamily: "var(--font)",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: time === slot ? 600 : 400,
                      transition: "all 0.2s",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>الاسم</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>رقم الجوال</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XXXXXXXX"
                style={inputStyle}
              />
            </div>

            <button
              className="btn btn-whatsapp"
              style={{ width: "100%", justifyContent: "center", padding: "16px 24px", borderRadius: "var(--radius-sm)" }}
              onClick={handleBook}
              disabled={!date || !time || !name || !phone}
            >
              <MessageCircle size={18} />
              تأكيد الحجز عبر واتساب
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
