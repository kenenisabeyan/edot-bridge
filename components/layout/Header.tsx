"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/use-auth";

const navLinks = [
  { href: "/courses", label: "Courses", badge: "500+" },
  { href: "/jobs", label: "Jobs", badge: "Live" },
  { href: "/assessments", label: "Assessments" },
  { href: "/learning-paths", label: "Roadmaps" },
  { href: "/career-coach", label: "AI Coach" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/forum", label: "Forum" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"om" | "am" | "en">("om");

  const langLabels = {
    om: "🇪🇹 Oromoo",
    am: "🇪🇹 አማርኛ",
    en: "🇬🇧 English",
  };

  const cycleLang = () => {
    if (lang === "om") setLang("am");
    else if (lang === "am") setLang("en");
    else setLang("om");
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#151B30]/90 border-b border-[#3B4D7A]/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      {/* Top glowing ambient highlight line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#0EA5E9]/60 to-transparent" />

      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 font-extrabold text-xl tracking-tight shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-[#151B30] flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(14,165,233,0.4)] group-hover:scale-105 transition-transform duration-200">
              ⚡
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-xl tracking-tight group-hover:text-white transition-colors">
                Skill<span className="text-[#0EA5E9]">Bridge</span>
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#192038] border border-[#3B4D7A] text-[#F59E0B]">
                2.0
              </span>
            </div>
          </Link>

          {/* Quick Search trigger pill */}
          <Link
            href="/courses"
            className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#192038] border border-[#3B4D7A] text-xs font-semibold text-[#F1F4F9]/70 hover:border-[#0EA5E9] hover:text-white transition-all shadow-inner"
          >
            <span className="text-sm">🔍</span>
            <span>Search courses, roadmaps, jobs...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#151B30] border border-[#3B4D7A] text-[10px] font-mono text-[#0EA5E9]">
              ⌘K
            </kbd>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#0EA5E9] bg-[#192038] border border-[#3B4D7A]"
                    : "text-[#F1F4F9]/80 hover:text-white hover:bg-[#192038]/60"
                }`}
              >
                <span>{l.label}</span>
                {l.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? "bg-[#0EA5E9] text-[#151B30]" : "bg-[#3B4D7A]/50 text-[#F1F4F9]"
                  }`}>
                    {l.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#0EA5E9] rounded-full shadow-[0_0_8px_#0EA5E9]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher pill */}
          <button
            onClick={cycleLang}
            title="Switch Language (Afaan Oromoo / Amharic / English)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#192038] border border-[#3B4D7A] hover:border-[#0EA5E9] text-xs font-bold text-[#F1F4F9] transition-all cursor-pointer"
          >
            <span>{langLabels[lang]}</span>
            <span className="text-[10px] text-[#0EA5E9]">▾</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {/* Daily Streak Badge */}
              <div
                className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                title="7-Day Active Learning Streak"
              >
                <span className="text-sm">🔥</span>
                <span>7 Days</span>
              </div>

              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl text-xs font-black bg-[#FFFFFF] text-[#151B30] hover:bg-[#F1F4F9] transition-colors shadow-md"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="hidden sm:inline-flex px-3 py-2 rounded-xl text-xs font-bold text-[#F1F4F9]/70 hover:text-white border border-[#3B4D7A] hover:border-red-400/50 hover:bg-red-500/10 transition-all cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#F1F4F9] hover:text-white border border-[#3B4D7A] hover:border-[#0EA5E9] bg-[#192038]/50 transition-all"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="btn-amber-cta px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <span>→</span>
              </Link>
            </div>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#192038] border border-[#3B4D7A] text-[#F1F4F9]"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#3B4D7A] bg-[#151B30] px-4 py-5 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  pathname === l.href
                    ? "bg-[#0EA5E9] text-[#151B30]"
                    : "bg-[#192038] border border-[#3B4D7A] text-[#F1F4F9]"
                }`}
              >
                <span>{l.label}</span>
                {l.badge && <span className="text-[10px] opacity-75">{l.badge}</span>}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#3B4D7A]/50">
            <button
              onClick={cycleLang}
              className="px-3 py-1.5 rounded-lg bg-[#192038] border border-[#3B4D7A] text-xs font-bold text-[#F1F4F9]"
            >
              Language: {langLabels[lang]}
            </button>
            {!user ? (
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="btn-amber-cta px-4 py-1.5 rounded-lg text-xs font-extrabold"
              >
                Start Free →
              </Link>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-extrabold bg-[#FFFFFF] text-[#151B30]"
              >
                Open Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
