"use client";
import { useState } from "react";
import Link from "next/link";

const availableSkillTags = [
  "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
  "Node.js", "PostgreSQL", "Prisma", "Python", "Docker", "Git & GitHub", "Figma"
];

const summaryTemplates = [
  "Driven Full-Stack Developer with hands-on experience in React, Next.js, and TypeScript. Passionate about building accessible, performant web applications with verified certifications in frontend engineering.",
  "Results-oriented Software Engineer specializing in modern frontend architecture and clean APIs. Proven track record of shipping fast, responsive user experiences with strong problem-solving skills.",
  "Emerging tech talent passionate about digital products in East Africa. Certified in React Fundamentals with strong background in component systems, database design, and collaborative agile workflows."
];

export default function ResumeBuilderPage() {
  const [form, setForm] = useState({
    name: "Kenenisa Beyan",
    title: "Full-Stack Software Engineer",
    email: "kenenisa@skillbridge.com",
    phone: "+251 912 345678",
    location: "Addis Ababa, Ethiopia",
    summary: "Driven Full-Stack Developer with hands-on experience in React, Next.js, and TypeScript. Passionate about building accessible, performant web applications with verified certifications in frontend engineering.",
    experience: "Software Engineer Intern • TechCorp Ethiopia (2024–2025)\n• Built responsive web applications using Next.js 16 and TypeScript\n• Developed and integrated REST APIs with PostgreSQL backend\n• Improved web vital scores by 35% through image optimization and component caching",
    education: "BSc in Computer Science • Addis Ababa University (2025)\n• Relevant Coursework: Data Structures, Web Systems, Database Management",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]
  });

  const [activeTheme, setActiveTheme] = useState<"navy" | "minimal" | "slate">("navy");
  const [copied, setCopied] = useState(false);

  const addSkill = (skill: string) => {
    if (!form.skills.includes(skill)) {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
  };

  const setSummaryAI = (idx: number) => {
    setForm({ ...form, summary: summaryTemplates[idx] });
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate resume strength
  const strengthScore = [
    Boolean(form.name),
    Boolean(form.title),
    Boolean(form.email),
    Boolean(form.summary.length > 40),
    Boolean(form.experience.length > 50),
    Boolean(form.education.length > 20),
    Boolean(form.skills.length >= 4)
  ].filter(Boolean).length;
  const strengthPercentage = Math.round((strengthScore / 7) * 100);

  return (
    <div style={{ backgroundColor: "#151B30", minHeight: "100vh", padding: "0 0 64px" }}>
      {/* Print CSS styles injected */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #FFFFFF !important;
          }
          nav, header, footer, .no-print {
            display: none !important;
          }
          .resume-container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .resume-sheet {
            box-shadow: none !important;
            border: 1px solid #151B30 !important;
          }
        }
      `}</style>

      {/* Header bar */}
      <div className="no-print" style={{ backgroundColor: "#151B30", borderBottom: "1.5px solid rgba(59,77,122,0.4)", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 800, margin: "0 0 6px" }}>
                Interactive Resume Builder
              </h1>
              <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.8 }}>
                Craft a tailored tech resume and export as PDF with SkillBridge verified credentials
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {/* Strength indicator */}
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  padding: "8px 16px",
                  textAlign: "right"
                }}
              >
                <span style={{ color: "#0EA5E9", fontWeight: 800, fontSize: 15 }}>
                  {strengthPercentage}%
                </span>
                <p style={{ color: "#F1F4F9", fontSize: 11, margin: 0, opacity: 0.75 }}>
                  Resume Strength
                </p>
              </div>

              <button
                onClick={handlePrint}
                style={{
                  backgroundColor: "#F59E0B",
                  color: "#151B30",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 24px",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(245,158,11,0.3)"
                }}
              >
                📄 Export / Print PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="resume-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 32 }}>

          {/* Left Column: Form Editor */}
          <div className="no-print" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                backgroundColor: "#192038",
                borderRadius: 16,
                padding: "28px 24px",
                border: "1.5px solid #3B4D7A",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
              }}
            >
              <h2 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>
                1. Personal Details
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Full Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 10, color: "#FFFFFF", fontSize: 14, outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Target Job Title</label>
                  <input
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 10, color: "#FFFFFF", fontSize: 14, outline: "none" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Email</label>
                    <input
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 10, color: "#FFFFFF", fontSize: 14, outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Phone</label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 10, color: "#FFFFFF", fontSize: 14, outline: "none" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Location</label>
                  <input
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#151B30", border: "1.5px solid #3B4D7A", borderRadius: 10, color: "#FFFFFF", fontSize: 14, outline: "none" }}
                  />
                </div>
              </div>
            </div>

            {/* AI Summary Suggestions */}
            <div
              style={{
                backgroundColor: "#192038",
                borderRadius: 16,
                padding: "28px 24px",
                border: "1.5px solid #3B4D7A",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h2 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: 0 }}>
                  2. Professional Summary
                </h2>
                <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 700 }}>
                  ✨ AI Templates
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {["Template 1", "Template 2", "Template 3"].map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSummaryAI(idx)}
                    style={{
                      backgroundColor: "#151B30",
                      border: "1px solid #3B4D7A",
                      color: "#0EA5E9",
                      borderRadius: 8,
                      padding: "4px 10px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <textarea
                rows={4}
                value={form.summary}
                onChange={e => setForm({ ...form, summary: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  backgroundColor: "#151B30",
                  border: "1.5px solid #3B4D7A",
                  borderRadius: 10,
                  color: "#FFFFFF",
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.6
                }}
              />
            </div>

            {/* Skills manager */}
            <div
              style={{
                backgroundColor: "#192038",
                borderRadius: 16,
                padding: "28px 24px",
                border: "1.5px solid #3B4D7A",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
              }}
            >
              <h2 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 14px" }}>
                3. Skills & Technologies
              </h2>

              <p style={{ color: "#F1F4F9", fontSize: 12, fontWeight: 600, margin: "0 0 10px", opacity: 0.75 }}>
                Click to add relevant skills:
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                {availableSkillTags.map(skill => {
                  const isSelected = form.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => isSelected ? removeSkill(skill) : addSkill(skill)}
                      style={{
                        backgroundColor: isSelected ? "#0EA5E9" : "#151B30",
                        color: isSelected ? "#151B30" : "#F1F4F9",
                        border: "1px solid #3B4D7A",
                        borderRadius: 999,
                        padding: "5px 14px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {isSelected ? "✓ " : "+ "} {skill}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {form.skills.map(s => (
                  <span
                    key={s}
                    style={{
                      backgroundColor: "#151B30",
                      color: "#FFFFFF",
                      border: "1px solid #3B4D7A",
                      borderRadius: 999,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#F59E0B",
                        cursor: "pointer",
                        fontWeight: 800,
                        padding: 0
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Education */}
            <div
              style={{
                backgroundColor: "#192038",
                borderRadius: 16,
                padding: "28px 24px",
                border: "1.5px solid #3B4D7A",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
              }}
            >
              <h2 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 16px" }}>
                4. Experience & Education
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>
                    Work Experience
                  </label>
                  <textarea
                    rows={5}
                    value={form.experience}
                    onChange={e => setForm({ ...form, experience: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      backgroundColor: "#151B30",
                      border: "1.5px solid #3B4D7A",
                      borderRadius: 10,
                      color: "#FFFFFF",
                      fontSize: 13,
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>
                    Education & Certifications
                  </label>
                  <textarea
                    rows={3}
                    value={form.education}
                    onChange={e => setForm({ ...form, education: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      backgroundColor: "#151B30",
                      border: "1.5px solid #3B4D7A",
                      borderRadius: 10,
                      color: "#FFFFFF",
                      fontSize: 13,
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Resume Preview Paper */}
          <div>
            {/* Theme Selector Toolbar */}
            <div
              className="no-print"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                backgroundColor: "#192038",
                borderRadius: 12,
                padding: "10px 18px",
                border: "1px solid #3B4D7A",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
              }}
            >
              <span style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>
                Print Preview Palette:
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { id: "navy", label: "Midnight Navy" },
                  { id: "slate", label: "Slate Accent" },
                  { id: "minimal", label: "Clean Minimal" }
                ].map(th => (
                  <button
                    key={th.id}
                    onClick={() => setActiveTheme(th.id as any)}
                    style={{
                      backgroundColor: activeTheme === th.id ? "#0EA5E9" : "#151B30",
                      color: activeTheme === th.id ? "#151B30" : "#F1F4F9",
                      border: "1px solid #3B4D7A",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Resume Sheet */}
            <div
              className="resume-sheet"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                overflow: "hidden",
                border: "1.5px solid #3B4D7A",
                boxShadow: "0 10px 30px rgba(21,27,48,0.12)"
              }}
            >
              {/* Header section based on theme */}
              <div
                style={{
                  backgroundColor: activeTheme === "navy" ? "#151B30" : activeTheme === "slate" ? "#3B4D7A" : "#FFFFFF",
                  color: activeTheme === "minimal" ? "#151B30" : "#FFFFFF",
                  padding: "36px 36px 30px",
                  borderBottom: activeTheme === "minimal" ? "2px solid #151B30" : "none"
                }}
              >
                <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>
                  {form.name || "Your Name"}
                </h2>
                <p style={{ color: activeTheme === "minimal" ? "#3B4D7A" : "#0EA5E9", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>
                  {form.title || "Target Position"}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 13, opacity: 0.9 }}>
                  {form.email && <span>📧 {form.email}</span>}
                  {form.phone && <span>📱 {form.phone}</span>}
                  {form.location && <span>📍 {form.location}</span>}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Summary */}
                {form.summary && (
                  <div>
                    <h3
                      style={{
                        color: "#151B30",
                        fontSize: 14,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1.5px solid #3B4D7A",
                        paddingBottom: 6,
                        margin: "0 0 10px"
                      }}
                    >
                      Professional Summary
                    </h3>
                    <p style={{ color: "#151B30", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                      {form.summary}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {form.skills.length > 0 && (
                  <div>
                    <h3
                      style={{
                        color: "#151B30",
                        fontSize: 14,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1.5px solid #3B4D7A",
                        paddingBottom: 6,
                        margin: "0 0 12px"
                      }}
                    >
                      Core Technical Skills
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {form.skills.map(skill => (
                        <span
                          key={skill}
                          style={{
                            backgroundColor: "#F1F4F9",
                            border: "1px solid #3B4D7A",
                            color: "#151B30",
                            borderRadius: 6,
                            padding: "4px 10px",
                            fontSize: 12,
                            fontWeight: 700
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {form.experience && (
                  <div>
                    <h3
                      style={{
                        color: "#151B30",
                        fontSize: 14,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1.5px solid #3B4D7A",
                        paddingBottom: 6,
                        margin: "0 0 10px"
                      }}
                    >
                      Work & Project Experience
                    </h3>
                    <div style={{ color: "#151B30", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                      {form.experience}
                    </div>
                  </div>
                )}

                {/* Education */}
                {form.education && (
                  <div>
                    <h3
                      style={{
                        color: "#151B30",
                        fontSize: 14,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1.5px solid #3B4D7A",
                        paddingBottom: 6,
                        margin: "0 0 10px"
                      }}
                    >
                      Education & Verified Certifications
                    </h3>
                    <div style={{ color: "#151B30", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                      {form.education}
                    </div>
                  </div>
                )}

                {/* Verified Watermark */}
                <div
                  style={{
                    marginTop: 12,
                    padding: "12px 16px",
                    backgroundColor: "#F1F4F9",
                    borderRadius: 10,
                    border: "1px solid #3B4D7A",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span style={{ color: "#151B30", fontSize: 12, fontWeight: 700 }}>
                    ⚡ Verified SkillBridge Candidate Profile
                  </span>
                  <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>
                    skillbridge.et/portfolio/{form.name.toLowerCase().replace(/\s/g, "")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
