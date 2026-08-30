import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "almahddar.favoritePropertyIds";

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("almahddar:favorites-changed"));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    const handler = () => setFavorites(readFavorites());
    window.addEventListener("storage", handler);
    window.addEventListener("almahddar:favorites-changed", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("almahddar:favorites-changed", handler);
    };
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    const current = readFavorites();
    const next = current.includes(id) ? current.filter((f) => f !== id) : [...current, id];
    writeFavorites(next);
    setFavorites(next);
  }, []);

  const clearFavorites = useCallback(() => {
    writeFavorites([]);
    setFavorites([]);
  }, []);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
