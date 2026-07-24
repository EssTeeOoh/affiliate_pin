"use client";

import { useEffect, useState } from "react";

const storageKey = "setup-signal-theme";

type ThemeMode = "light" | "dark";

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(storageKey, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode | null>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle theme-toggle-icon button button-secondary"
      onClick={() => {
        const nextTheme: ThemeMode = isDark ? "light" : "dark";
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle-icon-mark" aria-hidden="true">
        {theme && isDark ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path
              d="M12 4.5V3m0 18v-1.5M5.64 5.64 4.58 4.58m14.84 14.84-1.06-1.06M4.5 12H3m18 0h-1.5M5.64 18.36l-1.06 1.06m14.84-14.84-1.06 1.06"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path
              d="M20 14.25A8.5 8.5 0 1 1 9.75 4a7 7 0 1 0 10.25 10.25Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="sr-only">{theme ? (isDark ? "Light mode" : "Dark mode") : "Theme"}</span>
    </button>
  );
}
