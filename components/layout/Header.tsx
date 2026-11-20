"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/jobs", label: "Jobs" },
  { href: "/assessments", label: "Assessments" },
  { href: "/learning-paths", label: "Paths" },
  { href: "/career-coach", label: "AI Coach" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/forum", label: "Forum" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "#151B30",
        borderBottom: "1px solid rgba(59, 77, 122, 0.3)",
        boxShadow: "0 2px 12px rgba(21, 27, 48, 0.2)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight shrink-0 text-white"
        >
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#151B30] text-base font-black shadow-sm shrink-0"
            style={{ background: "#0EA5E9" }}
          >
            s
          </span>
          <span className="font-extrabold text-xl text-white">SkillBridge</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
              style={{
                color: pathname === l.href ? "#0EA5E9" : "#F1F4F9",
                background: pathname === l.href ? "rgba(59, 77, 122, 0.3)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full hidden sm:inline-flex text-[#F1F4F9] hover:text-[#0EA5E9]"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <button
                onClick={logout}
                className="text-sm font-medium px-4 py-1.5 rounded-full border transition-colors hover:bg-red-500/10 text-rose-300 border-rose-400/30"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-full hidden sm:inline-flex text-[#F1F4F9] hover:text-[#0EA5E9] hover:bg-[#3B4D7A]/20">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full px-5 font-bold shadow-sm"
                style={{ background: "#F59E0B", color: "#151B30", border: "none" }}
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "#F1F4F9" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t px-4 py-4 space-y-1"
          style={{ background: "#151B30", borderColor: "rgba(59, 77, 122, 0.3)" }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold"
              style={{
                color: pathname === l.href ? "#0EA5E9" : "#F1F4F9",
                background: pathname === l.href ? "rgba(59, 77, 122, 0.3)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-3 border-t flex gap-2" style={{ borderColor: "rgba(59, 77, 122, 0.3)" }}>
              <Button asChild variant="outline" size="sm" className="flex-1 rounded-full border-[#3B4D7A] bg-[#151B30] text-[#F1F4F9]">
                <Link href="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 rounded-full font-bold"
                style={{ background: "#F59E0B", color: "#151B30", border: "none" }}>
                <Link href="/register" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}