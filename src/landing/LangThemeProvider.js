import React from "react";
import { translations } from "../i18n";

const LangThemeContext = React.createContext(null);

export function LangThemeProvider({ children }) {
  const [lang, setLang] = React.useState("en");
  const [theme, setTheme] = React.useState("dark"); // default dark
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isDark = theme === "dark";

  // t works exactly like before: t.brand, t.booking_title, t.email_demo_title, etc.
  const t = translations[lang];

  // keep <html lang="...">
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // keep <html class="dark/light">
  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const value = {
    lang,
    setLang,
    theme,
    setTheme,
    isDark,
    t,
    mobileOpen,
    setMobileOpen,
  };

  return (
    <LangThemeContext.Provider value={value}>
      {children}
    </LangThemeContext.Provider>
  );
}

export function useLangTheme() {
  const ctx = React.useContext(LangThemeContext);
  if (!ctx) {
    throw new Error("useLangTheme must be used inside a LangThemeProvider");
  }
  return ctx;
}
