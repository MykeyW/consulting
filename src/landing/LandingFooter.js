// src/landing/LandingFooter.js
import React from "react";
import { useLangTheme } from "./LangThemeProvider";

function LandingFooter() {
  const { t, isDark } = useLangTheme();

  return (
    <footer
      className={
        "border-t py-5 text-[11px] md:text-xs " +
        (isDark
          ? "border-slate-800 text-slate-500"
          : "border-slate-200 text-slate-500")
      }
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>
          © {new Date().getFullYear()} {t.brand}. {t.footer_rights}
        </span>
        <span>{t.footer_location}</span>
      </div>
    </footer>
  );
}

export default LandingFooter;
