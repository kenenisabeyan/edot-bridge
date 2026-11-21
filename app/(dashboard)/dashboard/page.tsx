"use client";
import { useAuth } from "@/lib/use-auth";
import { mockCourses } from "@/lib/mock-data/courses";
import Link from "next/link";

const statCards = [
  {
    icon: "📚",
    label: "Enrolled Courses",
    getValue: (courses: typeof mockCourses) => courses.length,
    sub: "In active progress",
    href: "/my-courses",
    cta: "Continue Learning →",
    color: "#0EA5E9",
  },
  {
    icon: "🏆",
    label: "Certificates Earned",
    value: 1,
    sub: "React Specialist Pro",
    href: "/my-certificates",
    cta: "View Credentials →",
    color: "#F59E0B",
  },
  {
    icon: "💼",
    label: "Job Matches",
    value: 3,
    sub: "Direct recruiter pipeline",
    href: "/jobs",
    cta: "Explore Jobs →",
    color: "#0EA5E9",
  },
  {
    icon: "🎯",
    label: "Assessments Passed",
    value: 2,
    sub: "Skill verified on profile",
    href: "/assessments",
    cta: "Take More Tests →",
    color: "#F59E0B",
  },
];

const activity = [
  { text: 'Completed lesson "Introduction to React"', time: "2 days ago", icon: "✅" },
  { text: "Passed React Fundamentals assessment (85%)", time: "5 days ago", icon: "🏆" },
  { text: "Applied to Frontend Engineer at TechCorp Ethiopia", time: "1 week ago", icon: "📨" },
  { text: 'Started course "Python for Data Science"', time: "2 weeks ago", icon: "📚" },
];

const recommended = [
  { title: "Advanced React Patterns & Performance", level: "Intermediate", href: "/courses" },
  { title: "Next.js 16 Fullstack & Server Actions", level: "Advanced", href: "/courses" },
  { title: "System Design for Modern Web Apps", level: "Intermediate", href: "/courses" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, margin: "0 0 6px" }}>
            Welcome back, <span style={{ color: "#0EA5E9" }}>{firstName}</span> 👋
          </h1>
          <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.8 }}>
            Track your verified learning progress, weekly streaks, and career milestones.
          </p>
        </div>
        <Link
          href="/career-coach"
          style={{
            backgroundColor: "#F59E0B",
            color: "#151B30",
            borderRadius: 12,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 800,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 2px 10px rgba(245,158,11,0.3)"
          }}
        >
          🤖 Open AI Career Coach
        </Link>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {statCards.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: "#192038",
              border: "1.5px solid #3B4D7A",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "3px 8px",
                  borderRadius: 999,
                  backgroundColor: "#151B30",
                  color: s.color,
                  border: `1px solid ${s.color}`,
                  textTransform: "uppercase"
                }}
              >
                {s.label}
              </span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#FFFFFF", marginBottom: 2 }}>
              {"getValue" in s ? s.getValue(mockCourses) : s.value}
            </div>
            <div style={{ fontSize: 12, color: "#F1F4F9", opacity: 0.7, marginBottom: 14 }}>{s.sub}</div>
            <Link href={s.href} style={{ fontSize: 12, fontWeight: 800, color: s.color, textDecoration: "none" }}>
              {s.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Learning Progress */}
      <div
        style={{
          backgroundColor: "#192038",
          border: "1.5px solid #3B4D7A",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>
          Active Course Progress
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {mockCourses.slice(0, 3).map((c, i) => {
            const pct = (i + 1) * 33;
            return (
              <div key={c.id}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
                  <span style={{ color: "#FFFFFF", fontWeight: 700 }}>{c.title}</span>
                  <span style={{ color: pct > 60 ? "#0EA5E9" : "#F59E0B", fontWeight: 800 }}>{pct}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, backgroundColor: "#151B30", overflow: "hidden", border: "1px solid #3B4D7A" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      backgroundColor: pct > 60 ? "#0EA5E9" : "#F59E0B",
                      borderRadius: 999
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Split: Recent Activity & Recommended */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        {/* Recent Activity */}
        <div
          style={{
            backgroundColor: "#192038",
            border: "1.5px solid #3B4D7A",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
        >
          <h2 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>
            Recent Activity
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <div>
                  <p style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>{a.text}</p>
                  <p style={{ color: "#F1F4F9", fontSize: 12, margin: 0, opacity: 0.6 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div
          style={{
            backgroundColor: "#192038",
            border: "1.5px solid #3B4D7A",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
        >
          <h2 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>
            Recommended Next Steps
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recommended.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  borderRadius: 14,
                  backgroundColor: "#151B30",
                  border: "1px solid #3B4D7A",
                  textDecoration: "none"
                }}
              >
                <div
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
                    fontSize: 13,
                    flexShrink: 0
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 13 }}>{r.title}</div>
                  <span style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>{r.level}</span>
                </div>
                <span style={{ color: "#F59E0B", fontWeight: 800 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
