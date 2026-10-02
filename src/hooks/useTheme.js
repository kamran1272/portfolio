import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "kamran-portfolio-theme";

const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable — fall through to media query */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const listeners = new Set();
const emit = () => {
  listeners.forEach((listener) => listener());
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  const isLight = theme === "light";
  root.classList.toggle("light", isLight);
  root.style.colorScheme = isLight ? "light" : "dark";
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — theme still applies for this session */
  }
  emit();
};

/** Called once from the inline head script so the theme applies before paint. */
export const initTheme = () => {
  if (typeof window === "undefined") return;
  applyTheme(readStoredTheme());
};

const subscribe = (callback) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const getSnapshot = () => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark");
  const toggleTheme = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  return { theme, isLight: theme === "light", toggleTheme };
};
