"use client";
import { useAuth } from "@/lib/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/my-courses", label: "My Courses", icon: "📚" },
  { href: "/my-certificates", label: "Certificates", icon: "🏆" },
  { href: "/my-portfolio", label: "Portfolio", icon: "📁" },
  { href: "/job-applications", label: "Applications", icon: "💼" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))", animation: "spin 1s linear infinite" }} />
          <p style={{ color: "hsl(var(--muted))" }}>Loading…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
      </div>
    );
  }
  if (!user) return null;

  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : user.email?.[0].toUpperCase() ?? "U";

  return (
    <div className="flex min-h-screen" style={{ background: "hsl(var(--surface))" }}>
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:flex`}
        style={{
          background: "hsl(var(--background))",
          borderRight: "1px solid hsl(var(--border))",
          boxShadow: "4px 0 24px rgba(0,0,0,.04)",
        }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b" style={{ borderColor: "hsl(var(--border))" }}>
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))" }}
            >S</span>
            <span className="gradient-text">SkillBridge</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: active ? "hsl(var(--primary) / .1)" : "transparent",
                  color: active ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  fontWeight: active ? "600" : "500",
                }}
              >
                <span className="text-base">{l.icon}</span>
                {l.label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--primary))" }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="p-3 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <div className="flex items-center gap-3 px-2 py-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))" }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{user.name}</div>
              <div className="text-xs truncate" style={{ color: "hsl(var(--muted))" }}>{user.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-1 w-full text-sm py-2 rounded-xl text-center transition-colors"
            style={{ color: "hsl(0 84% 55%)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseOver={(e) => ((e.target as HTMLElement).style.background = "hsl(0 84% 60% / .08)")}
            onMouseOut={(e) => ((e.target as HTMLElement).style.background = "transparent")}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <div
          className="h-14 flex items-center px-4 gap-3 md:hidden sticky top-0 z-20 border-b"
          style={{ background: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
        >
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg"
            style={{ color: "hsl(var(--muted))", background: "hsl(var(--surface))", border: "none", cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-bold text-sm gradient-text">SkillBridge</span>
        </div>

        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}