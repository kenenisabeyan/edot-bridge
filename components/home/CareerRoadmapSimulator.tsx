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
    <div
      style={{
        backgroundColor: "#192038",
        border: "1.5px solid #3B4D7A",
        borderRadius: 24,
        padding: "32px 32px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(14,165,233,0.12)",
              border: "1px solid #0EA5E9",
              borderRadius: 999,
              padding: "4px 14px",
              marginBottom: 10
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#0EA5E9" }} />
            <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>🗺️ Career Calculator</span>
          </div>
          <h3 style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
            Simulate Your Dream Career Roadmap
          </h3>
          <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.8 }}>
            Choose your target career track to estimate completion time, salary expectations, and key skills.
          </p>
        </div>

        {/* Role toggle */}
        <div style={{ display: "flex", gap: 6, backgroundColor: "#151B30", border: "1px solid #3B4D7A", borderRadius: 12, padding: 4 }}>
          {[
            { id: "frontend", label: "Frontend" },
            { id: "fullstack", label: "Full-Stack" },
            { id: "ai", label: "AI & Data" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedRole(item.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                border: "none",
                backgroundColor: selectedRole === item.id ? "#0EA5E9" : "transparent",
                color: selectedRole === item.id ? "#151B30" : "#F1F4F9",
                transition: "all 0.15s"
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator stats banner */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
        <div style={{ backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#F1F4F9", opacity: 0.7 }}>Global Salary Range</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>{active.avgSalary}</div>
        </div>
        <div style={{ backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#F1F4F9", opacity: 0.7 }}>Estimated Roadmap Time</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#0EA5E9", marginTop: 4 }}>{active.duration}</div>
        </div>
        <div style={{ backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#F1F4F9", opacity: 0.7 }}>Market Demand</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#F59E0B", marginTop: 4 }}>{active.demand}</div>
        </div>
      </div>

      {/* Detailed overview */}
      <div style={{ backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 18, padding: 24, marginBottom: 20 }}>
        <h4 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>
          {active.role} Roadmap
        </h4>
        <p style={{ color: "#F1F4F9", fontSize: 14, margin: "0 0 18px", opacity: 0.85, lineHeight: 1.6 }}>
          {active.description}
        </p>

        <div>
          <div style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
            Core Verified Skills You Will Master
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {active.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: "#192038",
                  border: "1px solid #3B4D7A",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#FFFFFF"
                }}
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Kickoff */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          backgroundColor: "#151B30",
          border: "1.5px solid #3B4D7A",
          borderRadius: 16,
          padding: "18px 24px"
        }}
      >
        <div>
          <div style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>
            Recommended Starting Step
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 800, marginTop: 2 }}>
            {active.firstCourse}
          </div>
        </div>
        <Link
          href="/register"
          style={{
            backgroundColor: "#F59E0B",
            color: "#151B30",
            borderRadius: 10,
            padding: "10px 22px",
            fontSize: 13,
            fontWeight: 800,
            textDecoration: "none"
          }}
        >
          Start This Path Free →
        </Link>
      </div>
    </div>
  );
}
