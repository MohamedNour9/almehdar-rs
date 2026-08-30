import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}

export default function SEO({ title, description, url, image, type = "website" }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | المحضار للعقار`;
    document.title = fullTitle;

    const set = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    set("description", description);
    set("og:title", fullTitle, true);
    set("og:description", description, true);
    set("og:type", type, true);
    set("og:locale", "ar_SA", true);
    if (url) set("og:url", url, true);
    if (image) {
      set("og:image", image, true);
      set("twitter:card", "summary_large_image");
      set("twitter:image", image);
    }
    set("twitter:title", fullTitle);
    set("twitter:description", description);

    let canonical = document.head.querySelector("link[rel=canonical]") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href;
  }, [title, description, url, image, type]);

  return null;
}
