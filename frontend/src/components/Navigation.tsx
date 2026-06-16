"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Mountain, Menu, Globe, ChevronDown } from "lucide-react";

const languageNames: { [key in Language]: string } = {
  AZ: "Azərbaycan",
  EN: "English",
  AR: "العربية",
  RU: "Русский",
  TR: "Türkçe",
  IT: "Italiano",
  FR: "Français",
  DE: "Deutsch",
  ZH: "中文",
  JA: "日本語",
  HI: "हिन्दी",
};

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 bg-[#12161A]/80 backdrop-blur-md border-b border-slate-800/60">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 group-hover:border-amber-500/40 transition-all">
          <Mountain className="h-6 w-6 text-amber-500" />
        </div>
        <span className="text-xl font-bold tracking-wider text-white bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text">
          {t.logo}
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors">{t.home}</Link>
        <Link href="/catalog" className="text-slate-400 hover:text-white transition-colors">{t.catalog}</Link>
        <Link href="/about" className="text-slate-400 hover:text-white transition-colors">{t.about}</Link>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-smeta-modal"))}
          className="hidden sm:inline-flex text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#12161A] px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/10 active:scale-95"
        >
          {t.calcBtn}
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-[#1C232B] border border-slate-700 hover:bg-slate-800 hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase"
          >
            <Globe className="w-4 h-4" />
            <span>{language}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#1C232B] border border-slate-800 rounded-lg shadow-lg z-50">
              <div className="p-1">
                {Object.keys(languageNames).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang as Language);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-slate-800 rounded-md"
                  >
                    {languageNames[lang as Language]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="md:hidden p-2 text-slate-400 hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}