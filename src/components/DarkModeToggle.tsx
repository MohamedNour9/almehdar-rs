import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "almahddar.theme";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) === "dark"; } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", dark);
    try { localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); } catch {}
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="header-tool"
      aria-label={dark ? "الوضع الفاتح" : "الوضع الداكن"}
      title={dark ? "الوضع الفاتح" : "الوضع الداكن"}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
      <span>{dark ? "فاتح" : "داكن"}</span>
    </button>
  );
}
