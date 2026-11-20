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
    color: "#0EA5E9",
  },
  {
    icon: "🏆",
    label: "Certificates Earned",
    value: 1,
    sub: "React Fundamentals",
    href: "/my-certificates",
    cta: "View All →",
    color: "#F59E0B",
  },
  {
    icon: "💼",
    label: "Job Matches",
    value: 3,
    sub: "Based on your skills",
    href: "/jobs",
    cta: "Explore Jobs →",
    color: "#3B4D7A",
  },
  {
    icon: "🎯",
    label: "Assessments Passed",
    value: 2,
    sub: "Skill verified",
    href: "/assessments",
    cta: "Take More →",
    color: "#151B30",
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#151B30] fade-in">
            Welcome back, <span className="text-[#0EA5E9]">{firstName}</span> 👋
          </h1>
          <p className="mt-1 text-[#3B4D7A] font-medium fade-in-1">
            Track your learning progress and career journey.
          </p>
        </div>
        <Link
          href="/career-coach"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm bg-[#151B30] text-[#FFFFFF] hover:bg-[#3B4D7A]"
        >
          🤖 AI Career Coach
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-2xl p-5 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm fade-in-${i + 1} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span
                className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.label}
              </span>
            </div>
            <div className="text-3xl font-extrabold mb-0.5" style={{ color: s.color }}>
              {"getValue" in s ? s.getValue(mockCourses) : s.value}
            </div>
            <div className="text-xs text-[#3B4D7A] font-medium mb-3">{s.sub}</div>
            <Link href={s.href} className="text-xs font-bold" style={{ color: s.color }}>
              {s.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Learning Progress */}
      <div className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm">
        <h2 className="text-lg font-extrabold text-[#151B30] mb-5">Learning Progress</h2>
        <div className="space-y-5">
          {mockCourses.slice(0, 3).map((c, i) => {
            const pct = (i + 1) * 33;
            return (
              <div key={c.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-[#151B30]">{c.title}</span>
                  <span className="font-bold" style={{ color: pct > 60 ? "#0EA5E9" : "#3B4D7A" }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#F1F4F9] overflow-hidden border border-[#3B4D7A]/15">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: pct > 60 ? "#0EA5E9" : "#3B4D7A",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm">
          <h2 className="text-lg font-extrabold text-[#151B30] mb-5">Recent Activity</h2>
          <ul className="space-y-4">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#151B30] leading-snug">{a.text}</p>
                  <p className="text-xs text-[#3B4D7A] font-medium mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Courses */}
        <div className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm">
          <h2 className="text-lg font-extrabold text-[#151B30] mb-5">Recommended for You</h2>
          <div className="space-y-3">
            {recommended.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all bg-[#F1F4F9] border border-[#3B4D7A]/20 hover:border-[#0EA5E9] hover:bg-[#FFFFFF] group"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#151B30] text-sm font-black shrink-0"
                  style={{ background: "#0EA5E9" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-[#151B30] group-hover:text-[#0EA5E9] transition-colors">{r.title}</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B4D7A] bg-[#FFFFFF] border border-[#3B4D7A]/25 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                    {r.level}
                  </span>
                </div>
                <span className="text-[#3B4D7A] font-bold group-hover:text-[#0EA5E9] transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
