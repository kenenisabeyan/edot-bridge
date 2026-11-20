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
    <div className="rounded-3xl border border-[#3B4D7A]/25 bg-[#F1F4F9] p-6 sm:p-8 shadow-lg relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFFFFF] text-[#151B30] border border-[#3B4D7A]/30 mb-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
            <span>🗺️ Personalized Career Calculator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#151B30] tracking-tight">
            Simulate Your Dream Career Roadmap
          </h3>
          <p className="text-xs sm:text-sm text-[#3B4D7A] mt-1 font-medium">
            Choose your target career track to estimate completion time, salary expectations, and key skills.
          </p>
        </div>

        {/* Role toggle */}
        <div className="flex p-1 rounded-xl bg-[#FFFFFF] border border-[#3B4D7A]/25 shadow-sm">
          {[
            { id: "frontend", label: "Frontend" },
            { id: "fullstack", label: "Full-Stack" },
            { id: "ai", label: "AI & Data" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedRole(item.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedRole === item.id
                  ? "bg-[#151B30] text-[#FFFFFF] shadow-sm"
                  : "text-[#3B4D7A] hover:text-[#151B30] hover:bg-[#F1F4F9]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator stats banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/25 shadow-sm">
          <div className="text-xs font-semibold text-[#3B4D7A]">Global Salary Range</div>
          <div className="text-lg font-extrabold text-[#151B30] mt-1">{active.avgSalary}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/25 shadow-sm">
          <div className="text-xs font-semibold text-[#3B4D7A]">Estimated Roadmap Time</div>
          <div className="text-lg font-extrabold text-[#0EA5E9] mt-1">{active.duration}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/25 shadow-sm">
          <div className="text-xs font-semibold text-[#3B4D7A]">Market Demand</div>
          <div className="text-lg font-extrabold text-[#F59E0B] mt-1">{active.demand}</div>
        </div>
      </div>

      {/* Detailed overview */}
      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/25 mb-6 shadow-sm">
        <h4 className="text-lg font-extrabold text-[#151B30] mb-2">{active.role} Roadmap</h4>
        <p className="text-sm text-[#3B4D7A] mb-5 leading-relaxed font-medium">{active.description}</p>

        <div>
          <div className="text-xs font-bold text-[#151B30] uppercase tracking-wider mb-2.5">
            Core Verified Skills You Will Master
          </div>
          <div className="flex flex-wrap gap-2">
            {active.skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#F1F4F9] border border-[#3B4D7A]/25 px-3 py-1.5 rounded-full text-xs font-bold text-[#151B30]"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Kickoff */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#151B30] border border-[#3B4D7A] text-white shadow-md">
        <div>
          <div className="text-xs text-[#0EA5E9] font-bold uppercase tracking-wider">
            Recommended Starting Step
          </div>
          <div className="text-base font-extrabold text-white mt-0.5">{active.firstCourse}</div>
        </div>
        <Button asChild className="rounded-xl px-6 py-2.5 font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm shrink-0 border-none">
          <Link href="/register">Start This Path Free →</Link>
        </Button>
      </div>
    </div>
  );
}
