"use client";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import { mockJobs, Job } from "@/lib/mock-data/jobs";

const availableFilterSkills = ["All", "React", "TypeScript", "Python", "SQL", "Node.js", "PostgreSQL", "Tailwind"];
const jobTypes = ["All", "full-time", "remote", "part-time", "contract"];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "salary">("newest");

  useEffect(() => {
    fetch("/api/jobs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
      })
      .catch(() => {
        // Fallback to mockJobs if offline
        setJobs(mockJobs);
      });
  }, []);

  // Filter & Sort logic
  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "All" || job.type.toLowerCase() === selectedType.toLowerCase();

      const matchesSkill =
        selectedSkill === "All" ||
        job.requiredSkills.some(s => s.toLowerCase() === selectedSkill.toLowerCase());

      return matchesSearch && matchesType && matchesSkill;
    })
    .sort((a, b) => {
      if (sortBy === "salary") {
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      }
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 72px" }}>
      {/* Hero Header */}
      <div style={{ backgroundColor: "#151B30", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "4px 14px", marginBottom: 12 }}>
                <span style={{ color: "#0EA5E9", fontSize: 13, fontWeight: 800 }}>⚡ Direct Hiring Pipeline</span>
              </div>
              <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
                Verified Tech Opportunities
              </h1>
              <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.85, maxWidth: 640 }}>
                Explore open engineering roles with verified salary transparency. Candidates with verified SkillBridge assessment badges receive fast-tracked employer reviews.
              </p>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 20px", border: "1px solid rgba(255,255,255,0.12)", textAlign: "center" }}>
                <p style={{ color: "#F59E0B", fontSize: 22, fontWeight: 900, margin: "0 0 2px" }}>{jobs.length}</p>
                <p style={{ color: "#F1F4F9", fontSize: 11, margin: 0, opacity: 0.75 }}>Open Roles</p>
              </div>
              <div style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 20px", border: "1px solid rgba(255,255,255,0.12)", textAlign: "center" }}>
                <p style={{ color: "#0EA5E9", fontSize: 22, fontWeight: 900, margin: "0 0 2px" }}>100%</p>
                <p style={{ color: "#F1F4F9", fontSize: 11, margin: 0, opacity: 0.75 }}>Verified Employers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 0" }}>
        {/* Interactive Search & Filter Controls */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: "20px 24px",
            border: "1.5px solid #3B4D7A",
            boxShadow: "0 4px 16px rgba(21,27,48,0.04)",
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          {/* Top row: search & sort */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by job title, company, or tech stack..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#F1F4F9",
                  border: "1.5px solid #3B4D7A",
                  borderRadius: 10,
                  color: "#151B30",
                  fontSize: 14,
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#3B4D7A", fontSize: 13, fontWeight: 700 }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                style={{
                  padding: "10px 14px",
                  backgroundColor: "#F1F4F9",
                  border: "1.5px solid #3B4D7A",
                  borderRadius: 10,
                  color: "#151B30",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                <option value="newest">📅 Newest First</option>
                <option value="salary">💰 Highest Salary</option>
              </select>
            </div>
          </div>

          {/* Job Type Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "#151B30", fontSize: 13, fontWeight: 800 }}>Role Type:</span>
            {jobTypes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                style={{
                  backgroundColor: selectedType.toLowerCase() === t.toLowerCase() ? "#151B30" : "#F1F4F9",
                  color: selectedType.toLowerCase() === t.toLowerCase() ? "#FFFFFF" : "#151B30",
                  border: "1px solid #3B4D7A",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.15s"
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Skill Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", borderTop: "1px solid rgba(59,77,122,0.15)", paddingTop: 14 }}>
            <span style={{ color: "#151B30", fontSize: 13, fontWeight: 800 }}>Skills:</span>
            {availableFilterSkills.map(sk => (
              <button
                key={sk}
                onClick={() => setSelectedSkill(sk)}
                style={{
                  backgroundColor: selectedSkill === sk ? "#0EA5E9" : "#FFFFFF",
                  color: "#151B30",
                  border: "1px solid #3B4D7A",
                  borderRadius: 8,
                  padding: "4px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                {sk}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Match Banner */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ color: "#151B30", fontSize: 14, fontWeight: 700, margin: 0 }}>
            Showing <span style={{ color: "#0EA5E9" }}>{filteredJobs.length}</span> verified roles
          </p>
          {(search || selectedType !== "All" || selectedSkill !== "All") && (
            <button
              onClick={() => { setSearch(""); setSelectedType("All"); setSelectedSkill("All"); }}
              style={{
                background: "none",
                border: "none",
                color: "#F59E0B",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer"
              }}
            >
              Reset Filters ✕
            </button>
          )}
        </div>

        {/* Job Listings Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}

          {filteredJobs.length === 0 && (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: "48px 24px",
                textAlign: "center",
                border: "1.5px solid #3B4D7A"
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <h3 style={{ color: "#151B30", fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>
                No matching opportunities found
              </h3>
              <p style={{ color: "#3B4D7A", fontSize: 14, margin: "0 0 16px" }}>
                Try adjusting your search terms or skill filters to discover more open positions.
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedType("All"); setSelectedSkill("All"); }}
                style={{
                  backgroundColor: "#F59E0B",
                  color: "#151B30",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer"
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
