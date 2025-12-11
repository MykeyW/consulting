// src/landing/ServicesSection.js
import React from "react";
import { IconCog, IconCheck, IconArrows, IconMap } from "../icons";
import { ServiceCard } from "./components";
import { useLangTheme } from "./LangThemeProvider";

function ServicesSection() {
  const { t, isDark } = useLangTheme();

  return (
    <section
      id="services"
      className="py-16 md:py-20 border-b border-slate-200/70 dark:border-slate-800"
    >
      <div className="mb-8 max-w-3xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <IconCog
            className={"h-8 w-8 " + (isDark ? "text-sky-300" : "text-sky-600")}
          />
          <h2
            className={
              "text-3xl md:text-4xl font-semibold " +
              (isDark ? "text-slate-50" : "text-slate-900")
            }
          >
            {t.section_services_title}
          </h2>
        </div>
        <p
          className={
            "text-base md:text-xl " +
            (isDark ? "text-slate-200" : "text-slate-700")
          }
        >
          {t.section_services_sub}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <ServiceCard
          title={t.service_1_title}
          text={t.service_1_text}
          Icon={IconCheck}
          isDark={isDark}
        />
        <ServiceCard
          title={t.service_2_title}
          text={t.service_2_text}
          Icon={IconArrows}
          isDark={isDark}
        />
        <ServiceCard
          title={t.service_3_title}
          text={t.service_3_text}
          Icon={IconMap}
          isDark={isDark}
        />
      </div>
    </section>
  );
}

export default ServicesSection;
