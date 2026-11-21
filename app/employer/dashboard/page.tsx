"use client";
import { useState } from "react";

// Mock posted jobs
const initialJobs = [
  { id: "j1", title: "Frontend Developer", posted: "2026-06-01", applicants: 12, location: "Addis Ababa", type: "Full-time" },
  { id: "j2", title: "Data Analyst", posted: "2026-06-05", applicants: 8, location: "Remote", type: "Part-time" },
];

const mockCandidates = [
  { id: "c1", name: "Abebe T.", skills: ["React", "TypeScript", "Node.js"], cert: "React Fundamentals", score: 92 },
  { id: "c2", name: "Meron H.", skills: ["Python", "SQL", "Data Analysis"], cert: "Data Science Essentials", score: 88 },
  { id: "c3", name: "Dawit G.", skills: ["Figma", "CSS", "UX Research"], cert: "UX Design Pro", score: 95 },
];

type TabKey = "jobs" | "post" | "candidates";

export default function EmployerDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("jobs");
  const [jobs, setJobs] = useState(initialJobs);
  const [newJob, setNewJob] = useState({ title: "", description: "", location: "", type: "Full-time" });
  const [posted, setPosted] = useState(false);

  const postJob = () => {
    if (!newJob.title) return;
    setJobs([...jobs, {
      id: Date.now().toString(),
      title: newJob.title,
      posted: new Date().toISOString().slice(0, 10),
      applicants: 0,
      location: newJob.location || "TBD",
      type: newJob.type
    }]);
    setNewJob({ title: "", description: "", location: "", type: "Full-time" });
    setPosted(true);
    setTimeout(() => setPosted(false), 3000);
  };

  const tabs: { key: TabKey; label: string; emoji: string }[] = [
    { key: "jobs", label: "My Jobs", emoji: "💼" },
    { key: "post", label: "Post a Job", emoji: "➕" },
    { key: "candidates", label: "Find Talent", emoji: "🔍" },
  ];

  return (
    <div style={{ backgroundColor: "#151B30", minHeight: "100vh", padding: "0 0 64px", color: "#F1F4F9" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "#192038", padding: "44px 32px 36px", borderBottom: "1px solid #3B4D7A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: 12,
                backgroundColor: "#0EA5E9", color: "#151B30",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22
              }}
            >
              🏢
            </div>
            <div>
              <h1 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 800, margin: 0 }}>
                Employer Dashboard
              </h1>
              <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.8 }}>
                Manage your job posts and discover verified, certified talent
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { label: "Active Jobs", value: jobs.length, color: "#0EA5E9" },
              { label: "Total Applicants", value: jobs.reduce((s, j) => s + j.applicants, 0), color: "#F59E0B" },
              { label: "Verified Candidates", value: mockCandidates.length, color: "#FFFFFF" },
            ].map(stat => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "#151B30",
                  borderRadius: 12, padding: "14px 24px",
                  border: "1px solid #3B4D7A"
                }}
              >
                <p style={{ color: stat.color, fontSize: 26, fontWeight: 800, margin: "0 0 2px" }}>
                  {stat.value}
                </p>
                <p style={{ color: "#F1F4F9", fontSize: 13, margin: 0, opacity: 0.7 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        {/* Tab Bar */}
        <div
          style={{
            display: "flex", gap: 8, backgroundColor: "#192038",
            borderRadius: 14, padding: 6, marginBottom: 28,
            border: "1px solid #3B4D7A", width: "fit-content"
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 22px", borderRadius: 10, border: "none",
                cursor: "pointer", fontWeight: 700, fontSize: 14,
                transition: "all 0.18s",
                backgroundColor: activeTab === tab.key ? "#0EA5E9" : "transparent",
                color: activeTab === tab.key ? "#151B30" : "#F1F4F9",
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: My Jobs ── */}
        {activeTab === "jobs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {jobs.map(job => (
              <div
                key={job.id}
                style={{
                  backgroundColor: "#192038", borderRadius: 14,
                  padding: "20px 24px", border: "1px solid #3B4D7A",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: 14
                }}
              >
                <div>
                  <h3 style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 17, margin: "0 0 6px" }}>
                    {job.title}
                  </h3>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ color: "#F1F4F9", opacity: 0.7, fontSize: 13 }}>📅 Posted: {job.posted}</span>
                    <span style={{ color: "#F1F4F9", opacity: 0.7, fontSize: 13 }}>📍 {job.location}</span>
                    <span
                      style={{
                        backgroundColor: "#151B30", color: "#0EA5E9",
                        border: "1px solid #3B4D7A",
                        borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 600
                      }}
                    >
                      {job.type}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#F59E0B", fontWeight: 800, fontSize: 22, margin: 0 }}>
                      {job.applicants}
                    </p>
                    <p style={{ color: "#F1F4F9", opacity: 0.7, fontSize: 11, margin: 0 }}>Applicants</p>
                  </div>
                  <button
                    style={{
                      backgroundColor: "#F59E0B", color: "#151B30",
                      border: "none", borderRadius: 10,
                      padding: "10px 20px", fontWeight: 700,
                      fontSize: 14, cursor: "pointer"
                    }}
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <div
                style={{
                  backgroundColor: "#192038", borderRadius: 14, padding: 40,
                  border: "1px solid #3B4D7A", textAlign: "center"
                }}
              >
                <p style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 600 }}>No jobs posted yet.</p>
                <p style={{ color: "#F1F4F9", opacity: 0.7, fontSize: 14 }}>Click "Post a Job" to get started.</p>
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Post a Job ── */}
        {activeTab === "post" && (
          <div style={{ maxWidth: 600 }}>
            <div
              style={{
                backgroundColor: "#192038", borderRadius: 16,
                padding: "32px 32px", border: "1px solid #3B4D7A"
              }}
            >
              <h2 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, margin: "0 0 24px" }}>
                Post a New Job
              </h2>

              {posted && (
                <div
                  style={{
                    backgroundColor: "#151B30", border: "1.5px solid #0EA5E9",
                    borderRadius: 10, padding: "12px 16px", marginBottom: 20
                  }}
                >
                  <p style={{ color: "#0EA5E9", fontWeight: 600, fontSize: 14, margin: 0 }}>
                    ✓ Job posted successfully!
                  </p>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
                    Job Title *
                  </label>
                  <input
                    placeholder="e.g. Senior React Developer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px",
                      backgroundColor: "#151B30", border: "1.5px solid #3B4D7A",
                      borderRadius: 10, color: "#FFFFFF", fontSize: 14,
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
                    Job Description
                  </label>
                  <textarea
                    placeholder="Describe the role, requirements, and what you offer..."
                    rows={5}
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px",
                      backgroundColor: "#151B30", border: "1.5px solid #3B4D7A",
                      borderRadius: 10, color: "#FFFFFF", fontSize: 14,
                      outline: "none", resize: "vertical", boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
                    Location
                  </label>
                  <input
                    placeholder="e.g. Addis Ababa or Remote"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px",
                      backgroundColor: "#151B30", border: "1.5px solid #3B4D7A",
                      borderRadius: 10, color: "#FFFFFF", fontSize: 14,
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
                    Employment Type
                  </label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px",
                      backgroundColor: "#151B30", border: "1.5px solid #3B4D7A",
                      borderRadius: 10, color: "#FFFFFF", fontSize: 14,
                      outline: "none", cursor: "pointer"
                    }}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <button
                  onClick={postJob}
                  style={{
                    backgroundColor: "#F59E0B", color: "#151B30",
                    border: "none", borderRadius: 10, padding: "14px 0",
                    fontWeight: 800, fontSize: 16, cursor: "pointer",
                    marginTop: 8
                  }}
                >
                  🚀 Post Job
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Find Talent ── */}
        {activeTab === "candidates" && (
          <div>
            <div
              style={{
                backgroundColor: "#192038", borderRadius: 14,
                padding: "20px 24px", marginBottom: 20,
                border: "1px solid #3B4D7A"
              }}
            >
              <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0 }}>
                🔍 Browse candidates with verified SkillBridge certificates and real assessment scores.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {mockCandidates.map(candidate => (
                <div
                  key={candidate.id}
                  style={{
                    backgroundColor: "#192038", borderRadius: 14,
                    padding: "22px 24px", border: "1px solid #3B4D7A",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: 14
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: "50%",
                        backgroundColor: "#3B4D7A", color: "#F1F4F9",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: 18, flexShrink: 0
                      }}
                    >
                      {candidate.name[0]}
                    </div>
                    <div>
                      <h3 style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>
                        {candidate.name}
                      </h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {candidate.skills.map(skill => (
                          <span
                            key={skill}
                            style={{
                              backgroundColor: "#151B30", border: "1px solid #3B4D7A",
                              color: "#0EA5E9", borderRadius: 999,
                              padding: "2px 10px", fontSize: 12, fontWeight: 600
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "#F59E0B", fontSize: 13, fontWeight: 600, margin: "0 0 2px" }}>
                        🏆 {candidate.cert}
                      </p>
                      <p style={{ color: "#0EA5E9", fontSize: 20, fontWeight: 800, margin: 0 }}>
                        {candidate.score}%
                      </p>
                    </div>
                    <button
                      style={{
                        backgroundColor: "#0EA5E9", color: "#151B30",
                        border: "none", borderRadius: 10,
                        padding: "10px 20px", fontWeight: 700,
                        fontSize: 14, cursor: "pointer"
                      }}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
