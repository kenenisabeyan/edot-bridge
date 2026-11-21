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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#151B30" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "4px solid #3B4D7A",
              borderTopColor: "#0EA5E9",
              margin: "0 auto 16px",
              animation: "spin 0.8s linear infinite"
            }}
          />
          <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: 14 }}>Loading workspace...</p>
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
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#151B30" }}>
      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:flex`}
        style={{
          backgroundColor: "#151B30",
          borderRight: "1.5px solid rgba(59,77,122,0.4)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1.5px solid rgba(59,77,122,0.4)"
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#0EA5E9",
                color: "#151B30",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 16
              }}
            >
              ⚡
            </span>
            <span style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 18 }}>SkillBridge</span>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {sidebarLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 16px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: active ? 800 : 600,
                  textDecoration: "none",
                  backgroundColor: active ? "rgba(14,165,233,0.15)" : "transparent",
                  color: active ? "#0EA5E9" : "#F1F4F9",
                  borderLeft: active ? "3px solid #0EA5E9" : "3px solid transparent",
                  transition: "all 0.15s"
                }}
              >
                <span style={{ fontSize: 16 }}>{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div style={{ padding: 16, borderTop: "1.5px solid rgba(59,77,122,0.4)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 12,
              borderRadius: 12,
              backgroundColor: "#192038",
              border: "1px solid #3B4D7A"
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "#0EA5E9",
                color: "#151B30",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 14,
                flexShrink: 0
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 13, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{user.name}</div>
              <div style={{ color: "#F1F4F9", fontSize: 11, opacity: 0.7, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{user.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "8px 0",
              borderRadius: 8,
              border: "1px solid #3B4D7A",
              backgroundColor: "transparent",
              color: "#F1F4F9",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s"
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, backgroundColor: "#151B30" }}>
        <main style={{ flex: 1, padding: "32px 32px", backgroundColor: "#151B30" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
