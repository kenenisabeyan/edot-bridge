"use client";
import { useAuth } from "@/lib/use-auth";
import { mockCourses } from "@/lib/mock-data/courses";
import Link from "next/link";

const statCards = [
  {
    icon: "📚",
    label: "Enrolled Courses",
    getValue: (courses: typeof mockCourses) => courses.length,
    sub: "In progress",
    href: "/my-courses",
    cta: "Continue Learning →",
    color: "hsl(250 100% 65%)",
  },
  {
    icon: "🏆",
    label: "Certificates Earned",
    value: 1,
    sub: "React Fundamentals",
    href: "/my-certificates",
    cta: "View All →",
    color: "hsl(38 100% 60%)",
  },
  {
    icon: "💼",
    label: "Job Matches",
    value: 3,
    sub: "Based on your skills",
    href: "/jobs",
    cta: "Explore Jobs →",
    color: "hsl(174 100% 42%)",
  },
  {
    icon: "🎯",
    label: "Assessments Passed",
    value: 2,
    sub: "Skill verified",
    href: "/assessments",
    cta: "Take More →",
    color: "hsl(280 80% 60%)",
  },
];

const activity = [
  { text: 'Completed lesson "Introduction to React"', time: "2 days ago", icon: "✅" },
  { text: "Passed React Fundamentals assessment (85%)", time: "5 days ago", icon: "🏆" },
  { text: "Applied to Frontend Engineer at TechEthiopia", time: "1 week ago", icon: "📨" },
  { text: 'Started course "Python for Data Science"', time: "2 weeks ago", icon: "📚" },
];

const recommended = [
  { title: "Advanced React Patterns", level: "Intermediate", href: "/courses" },
  { title: "Next.js & Fullstack Dev", level: "Advanced", href: "/courses" },
  { title: "System Design Basics", level: "Intermediate", href: "/courses" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold fade-in">
            Welcome back, <span className="gradient-text">{firstName}</span> 👋
          </h1>
          <p className="mt-1 fade-in-1" style={{ color: "hsl(var(--muted))" }}>
            Track your learning progress and career journey.
          </p>
        </div>
        <div className="flex gap-2 fade-in-1">
          <Link href="/career-coach"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: "hsl(var(--primary) / .1)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / .2)",
            }}>
            🤖 AI Career Coach
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div
            key={s.label}
            className={`card-glow rounded-2xl p-5 fade-in-${i + 1}`}
            style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.label}
              </span>
            </div>
            <div className="text-3xl font-extrabold mb-0.5" style={{ color: s.color }}>
              {"getValue" in s ? s.getValue(mockCourses) : s.value}
            </div>
            <div className="text-xs mb-3" style={{ color: "hsl(var(--muted))" }}>{s.sub}</div>
            <Link
              href={s.href}
              className="text-xs font-semibold"
              style={{ color: s.color }}
            >
              {s.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Learning Progress */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
      >
        <h2 className="text-lg font-bold mb-5">Learning Progress</h2>
        <div className="space-y-4">
          {mockCourses.slice(0, 3).map((c, i) => (
            <div key={c.id}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{c.title}</span>
                <span style={{ color: "hsl(var(--muted))" }}>{(i + 1) * 33}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${(i + 1) * 33}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
        >
          <h2 className="text-lg font-bold mb-5">Recent Activity</h2>
          <ul className="space-y-3">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug">{a.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted))" }}>{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Courses */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
        >
          <h2 className="text-lg font-bold mb-5">Recommended for You</h2>
          <div className="space-y-3">
            {recommended.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{
                  background: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--primary) / .4)")}
                onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))")}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{r.title}</div>
                  <span className="badge badge-primary text-[10px] mt-0.5">{r.level}</span>
                </div>
                <span style={{ color: "hsl(var(--muted))" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}