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
        background: "rgba(13, 16, 22, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid #1C202C",
        boxShadow: "0 1px 0 #1C202C",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight shrink-0"
        >
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-base font-bold shadow-sm shrink-0"
            style={{ background: "linear-gradient(135deg, #566AF6 0%, #3896E8 100%)" }}
          >
            s
          </span>
          <span className="gradient-text">SkillBridge</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: pathname === l.href ? "#FFFFFF" : "#8C95A6",
                background: pathname === l.href ? "#1C202C" : "transparent",
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
                className="rounded-full hidden sm:inline-flex"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <button
                onClick={logout}
                className="text-sm font-medium px-4 py-1.5 rounded-full border transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--muted))" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-full hidden sm:inline-flex text-[#8C95A6] hover:text-white hover:bg-[#1C202C]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full px-5 font-semibold text-white shadow-sm"
                style={{ background: "linear-gradient(135deg, #566AF6 0%, #3896E8 100%)", border: "none" }}
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "#8C95A6" }}
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
          style={{ background: "rgba(13, 16, 22, 0.98)", borderColor: "#1C202C" }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium"
              style={{
                color: pathname === l.href ? "#FFFFFF" : "#8C95A6",
                background: pathname === l.href ? "#1C202C" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-3 border-t flex gap-2" style={{ borderColor: "#1C202C" }}>
              <Button asChild variant="outline" size="sm" className="flex-1 rounded-full border-[#2C344A] bg-[#161B26] text-white">
                <Link href="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #566AF6 0%, #3896E8 100%)", border: "none" }}>
                <Link href="/register" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}