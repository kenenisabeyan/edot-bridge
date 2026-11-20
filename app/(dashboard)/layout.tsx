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
      <div className="min-h-screen flex items-center justify-center bg-[#F1F4F9]">
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-4 border-[#3B4D7A]/20 border-t-[#0EA5E9] mx-auto mb-4"
            style={{ animation: "spin 0.8s linear infinite" }}
          />
          <p className="text-[#3B4D7A] font-semibold text-sm">Loading…</p>
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
    <div className="flex min-h-screen bg-[#F1F4F9]">
      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:flex`}
        style={{
          background: "#151B30",
          borderRight: "1px solid rgba(59,77,122,0.4)",
        }}
      >
        {/* Logo */}
        <div
          className="h-16 flex items-center px-5 border-b"
          style={{ borderColor: "rgba(59,77,122,0.4)" }}
        >
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg text-white">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#151B30] text-xs font-black shadow-sm"
              style={{ background: "#0EA5E9" }}
            >
              s
            </span>
            <span className="text-white">SkillBridge</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {sidebarLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: active ? "rgba(14,165,233,0.15)" : "transparent",
                  color: active ? "#0EA5E9" : "#F1F4F9",
                  borderLeft: active ? "3px solid #0EA5E9" : "3px solid transparent",
                }}
              >
                <span className="text-base">{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 h-px bg-[#3B4D7A]/40 mb-3" />

        {/* User card */}
        <div className="p-3 pb-5">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#FFFFFF]/5 border border-[#3B4D7A]/30">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#151B30] text-sm font-black shrink-0 shadow-sm"
              style={{ background: "#0EA5E9" }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white truncate">{user.name}</div>
              <div className="text-xs text-[#F1F4F9] truncate">{user.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 w-full text-sm py-2 rounded-xl text-center font-semibold transition-all border border-[#3B4D7A]/40 text-[#F1F4F9] hover:bg-[#3B4D7A]/30 hover:text-white cursor-pointer"
            style={{ background: "transparent" }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Area ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className="h-14 flex items-center px-4 gap-3 md:hidden sticky top-0 z-20 border-b"
          style={{ background: "#151B30", borderColor: "rgba(59,77,122,0.4)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-[#F1F4F9] hover:bg-[#3B4D7A]/30 cursor-pointer border-none bg-transparent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-extrabold text-sm text-white">SkillBridge</span>
        </div>

        <main className="flex-1 p-6 md:p-8 bg-[#F1F4F9]">
          {children}
        </main>
      </div>
    </div>
  );
}
