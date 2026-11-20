"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    avgSalary: "$40,000 - $75,000",
    duration: "8 weeks (10 hrs/week)",
    demand: "🔥 High (850+ open remote roles)",
    skills: ["HTML5 / CSS3", "TypeScript", "React 19", "Next.js", "Tailwind CSS"],
    firstCourse: "React & Modern UI Architecture",
    description: "Design pixel-perfect user interfaces, master responsive layouts, and build high-performance client applications.",
  },
  fullstack: {
    role: "Full-Stack Engineer",
    avgSalary: "$55,000 - $95,000",
    duration: "12 weeks (12 hrs/week)",
    demand: "🚀 Critical (1,200+ open roles)",
    skills: ["Next.js App Router", "Node.js / Express", "PostgreSQL / Prisma", "Auth & Security", "REST & GraphQL"],
    firstCourse: "Full-Stack Mastery with Next.js & Supabase",
    description: "Architect end-to-end applications from database models to responsive frontend designs with verified code quality.",
  },
  ai: {
    role: "AI & Data Engineer",
    avgSalary: "$60,000 - $110,000",
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
    <div className="rounded-3xl border border-[#1C202C] bg-[#161B26] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#3896E8]/15 text-[#38BDF8] border border-[#3896E8]/25 mb-2">
            <span>🗺️ Personalized Career Calculator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Simulate Your Dream Career Roadmap
          </h3>
          <p className="text-xs sm:text-sm text-[#8C95A6] mt-1">
            Choose your target career track to estimate completion time, salary expectations, and key skills.
          </p>
        </div>

        {/* Role toggle */}
        <div className="flex p-1 rounded-xl bg-[#0D1016] border border-[#2C344A]">
          {[
            { id: "frontend", label: "Frontend" },
            { id: "fullstack", label: "Full-Stack" },
            { id: "ai", label: "AI & Data" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedRole(item.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedRole === item.id
                  ? "bg-[#566AF6] text-white shadow-sm"
                  : "text-[#8C95A6] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator stats banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-[#0D1016] border border-[#1C202C]">
          <div className="text-xs text-[#8C95A6]">Global Salary Range</div>
          <div className="text-lg font-bold text-white mt-1">{active.avgSalary}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#0D1016] border border-[#1C202C]">
          <div className="text-xs text-[#8C95A6]">Estimated Roadmap Time</div>
          <div className="text-lg font-bold text-[#3896E8] mt-1">{active.duration}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#0D1016] border border-[#1C202C]">
          <div className="text-xs text-[#8C95A6]">Market Demand</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">{active.demand}</div>
        </div>
      </div>

      {/* Detailed overview */}
      <div className="p-6 rounded-2xl bg-[#0D1016] border border-[#1C202C] mb-6">
        <h4 className="text-lg font-bold text-white mb-2">{active.role} Roadmap</h4>
        <p className="text-sm text-[#8C95A6] mb-5 leading-relaxed">{active.description}</p>

        <div>
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
            Core Verified Skills You Will Master
          </div>
          <div className="flex flex-wrap gap-2">
            {active.skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#161B26] border border-[#2C344A] px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Kickoff */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#566AF6]/15 via-[#3896E8]/10 to-transparent border border-[#566AF6]/30">
        <div>
          <div className="text-xs text-[#38BDF8] font-bold uppercase tracking-wider">
            Recommended Starting Step
          </div>
          <div className="text-base font-bold text-white mt-0.5">{active.firstCourse}</div>
        </div>
        <Button asChild className="rounded-xl px-6 py-2.5 font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-sm shrink-0">
          <Link href="/register">Start This Path Free →</Link>
        </Button>
      </div>
    </div>
  );
}
