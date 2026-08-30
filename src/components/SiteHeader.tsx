import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { Search, Heart, Bell, Menu, X, MessageCircle, ChevronLeft, Plus } from "lucide-react";
import { useFavorites } from "../hooks/use-favorites";
import DarkModeToggle from "./DarkModeToggle";

const NAV_LINKS = [
  { to: "/", label: "الرئيسية" },
  { to: "/properties", label: "العقارات" },
  { to: "/services", label: "الخدمات" },
  { to: "/about", label: "عن المكتب" },
  { to: "/guides", label: "الإرشادات" },
  { to: "/contact", label: "تواصل" },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        window.location.href = `/properties?q=${encodeURIComponent(searchQuery.trim())}`;
      }
    },
    [searchQuery]
  );

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        تخطي للمحتوى الرئيسي
      </a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} role="banner">
        <div className="site-container header-inner">
          {/* Brand */}
          <Link to="/" className="brand" aria-label="المحضار للعقار — الرئيسية">
            <div className="brand-mark" aria-hidden="true">م</div>
            <div className="brand-text">
              <strong>المحضار للعقار</strong>
              <small>Real Estate</small>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="main-nav" aria-label="القائمة الرئيسية">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Tools */}
          <div className="header-tools">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Search */}
            <div className="global-search">
              <button
                className="header-tool"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="بحث"
                aria-expanded={searchOpen}
              >
                <Search size={18} />
              </button>
              {searchOpen && (
                <form onSubmit={handleSearch} role="search">
                  <input
                    autoFocus
                    type="search"
                    placeholder="ابحث عن عقار..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="بحث عن عقار"
                  />
                  <button type="submit" aria-label="بحث">
                    <Search size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Favorites */}
            <Link to="/favorites" className="header-tool" aria-label={`المفضلة (${favorites.length})`}>
              <Heart size={18} />
            </Link>

            {/* Notifications */}
            <Link to="/notifications" className="header-tool" aria-label="الإشعارات">
              <Bell size={18} />
            </Link>

            {/* Add Property */}
            <Link to="/add-property" className="header-contact">
              <Plus size={15} />
              أضف عقارك
            </Link>

            {/* WhatsApp */}
            <a
              href="https://wa.me/966500094550"
              target="_blank"
              rel="noopener noreferrer"
              className="header-tool"
              aria-label="تواصل عبر واتساب"
              style={{ color: "#2D8C5A" }}
            >
              <MessageCircle size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile WhatsApp */}
          <a
            href="https://wa.me/966500094550"
            target="_blank"
            rel="noopener noreferrer"
            className="header-mobile-whatsapp"
            aria-label="تواصل عبر واتساب"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="قائمة الموبايل">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? "is-active" : ""}
              >
                {location.pathname === link.to && <ChevronLeft size={16} style={{ marginLeft: 8 }} />}
                {link.label}
              </Link>
            ))}
            <Link to="/add-property">أضف عقارك</Link>
            <Link to="/favorites">المفضلة ({favorites.length})</Link>
            <Link to="/notifications">الإشعارات</Link>
            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <DarkModeToggle />
            </div>
            <a
              href="https://wa.me/966500094550"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              تواصل معنا عبر واتساب
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
