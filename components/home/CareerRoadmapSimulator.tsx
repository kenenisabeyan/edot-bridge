"use client";

import { useState } from "react";
import Link from "next/link";

interface CareerPathData {
  role: string;
  avgSalary: string;
  duration: string;
  demand: string;
  skills: string[];
  firstCourse: string;
  description: string;
}

const careerData: Record<string, CareerPathData> = {
  frontend: {
    role: "Frontend Developer",
    avgSalary: "$40,000 - $75,000 / yr",
    duration: "8 weeks (10 hrs/week)",
    demand: "🔥 High (850+ open remote roles)",
    skills: ["HTML5 / CSS3", "TypeScript", "React 19", "Next.js", "Tailwind CSS"],
    firstCourse: "React & Modern UI Architecture",
    description: "Design pixel-perfect user interfaces, master responsive layouts, and build high-performance client applications.",
  },
  fullstack: {
    role: "Full-Stack Engineer",
    avgSalary: "$55,000 - $95,000 / yr",
    duration: "12 weeks (12 hrs/week)",
    demand: "🚀 Critical (1,200+ open roles)",
    skills: ["Next.js App Router", "Node.js / Express", "PostgreSQL / Prisma", "Auth & Security", "REST & GraphQL"],
    firstCourse: "Full-Stack Mastery with Next.js & Supabase",
    description: "Architect end-to-end applications from database models to responsive frontend designs with verified code quality.",
  },
  ai: {
    role: "AI & Data Engineer",
    avgSalary: "$60,000 - $110,000 / yr",
    duration: "10 weeks (10 hrs/week)",
    demand: "🌟 Explosive (500% YoY growth)",
    skills: ["Python", "Pandas & NumPy", "OpenAI SDK", "Vector DBs", "Prompt Engineering"],
    firstCourse: "Python for Data Science & AI Systems",
    description: "Build intelligent automated applications, query language models, and turn raw data into actionable enterprise insights.",
  },
};

export function CareerRoadmapSimulator() {
  const [selectedRole, setSelectedRole] = useState<string>("frontend");
  const active = careerData[selectedRole];

  return (
    <div className="master-card rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs font-black uppercase tracking-wider mb-3">
            <span>🗺️ Career & Compensation Calculator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
            Simulate Your Dream Career Roadmap
          </h3>
          <p className="text-sm text-[#F1F4F9]/80 font-medium">
            Choose your target track to estimate completion time, market salary expectations, and key technologies.
          </p>
        </div>

        {/* Role toggle */}
        <div className="flex gap-1.5 p-1.5 rounded-2xl bg-[#151B30] border border-[#3B4D7A] shadow-inner">
          {[
            { id: "frontend", label: "Frontend" },
            { id: "fullstack", label: "Full-Stack" },
            { id: "ai", label: "AI & Data" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedRole(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedRole === item.id
                  ? "bg-[#0EA5E9] text-[#151B30] shadow-md"
                  : "text-[#F1F4F9]/80 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left summary */}
        <div className="lg:col-span-7 bg-[#151B30] border border-[#3B4D7A] rounded-2xl p-6 flex flex-col justify-between shadow-inner">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3B4D7A]/40">
              <span className="text-xs font-black uppercase tracking-wider text-[#0EA5E9]">
                Career Projection
              </span>
              <span className="text-xs font-bold text-[#F59E0B]">{active.demand}</span>
            </div>

            <h4 className="text-2xl font-black text-white mb-2">{active.role}</h4>
            <p className="text-sm text-[#F1F4F9]/80 leading-relaxed font-medium mb-6">
              {active.description}
            </p>

            <p className="text-xs font-black uppercase tracking-wider text-[#0EA5E9] mb-3">
              Required Core Technologies
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {active.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-[#192038] border border-[#3B4D7A] text-xs font-bold text-white shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#192038] border border-[#3B4D7A] flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#F1F4F9]/60 font-semibold uppercase">Recommended Starting Course</p>
              <p className="text-sm font-extrabold text-white">{active.firstCourse}</p>
            </div>
            <Link
              href="/courses"
              className="px-3 py-1.5 rounded-lg bg-[#0EA5E9] text-[#151B30] text-xs font-black hover:opacity-90"
            >
              Enroll Free →
            </Link>
          </div>
        </div>

        {/* Right Metric Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-[#151B30] border border-[#3B4D7A] shadow-inner">
            <span className="block text-xs font-black uppercase tracking-wider text-[#F1F4F9]/60 mb-1">
              Estimated Global Remote Salary
            </span>
            <p className="text-3xl font-black text-[#F59E0B] mb-1">{active.avgSalary}</p>
            <p className="text-xs text-[#F1F4F9]/70">Based on verified 2026 hired graduates</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#151B30] border border-[#3B4D7A] shadow-inner">
            <span className="block text-xs font-black uppercase tracking-wider text-[#F1F4F9]/60 mb-1">
              Learning Time to First Job
            </span>
            <p className="text-2xl font-black text-white mb-1">{active.duration}</p>
            <p className="text-xs text-[#F1F4F9]/70">Includes assessments, projects & coaching</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30">
            <p className="text-xs font-black text-[#0EA5E9] uppercase tracking-wider mb-1">
              🛡️ Guaranteed Placement Pathway
            </p>
            <p className="text-xs text-white leading-relaxed">
              Achieve 90%+ on this path's proctored assessments to unlock direct recruiter intro calls without resume filtering.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-[#F1F4F9]/60">
          Want a customized roadmap generated specifically for your background?
        </span>
        <Link
          href="/career-coach"
          className="btn-cyan-outline px-6 py-2.5 rounded-xl text-xs font-black text-center"
        >
          Consult AI Career Coach 24/7 →
        </Link>
      </div>
    </div>
  );
}
