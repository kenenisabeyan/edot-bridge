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
        backgroundColor: "#151B30",
        borderBottom: "1.5px solid rgba(59, 77, 122, 0.4)",
        boxShadow: "0 4px 20px rgba(21, 27, 48, 0.3)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-extrabold text-xl tracking-tight shrink-0 text-white"
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: "#0EA5E9",
              color: "#151B30",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 900,
              boxShadow: "0 2px 8px rgba(14,165,233,0.3)"
            }}
          >
            ⚡
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 20 }}>SkillBridge</span>
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#0EA5E9",
                borderRadius: 999,
                padding: "2px 8px",
                fontSize: 10,
                fontWeight: 800
              }}
            >
              PRO
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: isActive ? 800 : 600,
                  textDecoration: "none",
                  color: isActive ? "#0EA5E9" : "#F1F4F9",
                  backgroundColor: isActive ? "rgba(59, 77, 122, 0.35)" : "transparent",
                  transition: "all 0.15s"
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Daily Streak Badge */}
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "rgba(245,158,11,0.15)",
                  border: "1px solid #F59E0B",
                  color: "#F59E0B"
                }}
              >
                <span>🔥</span>
                <span>7 Days</span>
              </div>

              <Link
                href="/dashboard"
                style={{
                  padding: "7px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: "#FFFFFF",
                  color: "#151B30",
                  textDecoration: "none"
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  border: "1px solid #3B4D7A",
                  backgroundColor: "transparent",
                  color: "#F1F4F9",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#F1F4F9",
                  textDecoration: "none"
                }}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                style={{
                  backgroundColor: "#F59E0B",
                  color: "#151B30",
                  padding: "8px 20px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 2px 10px rgba(245,158,11,0.3)"
                }}
              >
                Get Started Free →
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "#F1F4F9", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="lg:hidden border-t px-4 py-4 space-y-1"
          style={{ backgroundColor: "#151B30", borderColor: "rgba(59, 77, 122, 0.4)" }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold"
              style={{
                color: pathname === l.href ? "#0EA5E9" : "#F1F4F9",
                background: pathname === l.href ? "rgba(59, 77, 122, 0.4)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-3 border-t flex gap-2" style={{ borderColor: "rgba(59, 77, 122, 0.4)" }}>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: 8,
                  border: "1px solid #3B4D7A",
                  color: "#F1F4F9",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none"
                }}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: 8,
                  backgroundColor: "#F59E0B",
                  color: "#151B30",
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: "none"
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
