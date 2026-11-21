import Link from "next/link";
import { Button } from "@/components/ui/button";

const paths = [
  { id: "frontend", title: "Frontend Developer Path", description: "Become a professional frontend developer with React, TypeScript & Next.js", courses: 4, duration: "8 weeks" },
  { id: "fullstack", title: "Full Stack Engineer Path", description: "Build complete end-to-end web applications with modern databases & APIs", courses: 6, duration: "12 weeks" },
  { id: "data", title: "Data Analyst & AI Path", description: "Master data analysis with Python, Pandas, SQL and modern LLM frameworks", courses: 5, duration: "10 weeks" },
];

export default function LearningPathsPage() {
  return (
    <div style={{ backgroundColor: "#151B30", minHeight: "100vh", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(14,165,233,0.12)", border: "1px solid #0EA5E9", borderRadius: 999, padding: "4px 14px", marginBottom: 12 }}>
            <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>🗺️ Structured Roadmaps</span>
          </div>
          <h1 style={{ color: "#FFFFFF", fontSize: 36, fontWeight: 900, margin: "0 0 10px" }}>
            Career Learning Paths
          </h1>
          <p style={{ color: "#F1F4F9", fontSize: 16, margin: 0, opacity: 0.85, maxWidth: 640 }}>
            Structured curriculums designed to take you from foundational concepts to job-ready with verified milestones.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {paths.map(path => (
            <div
              key={path.id}
              style={{
                backgroundColor: "#192038",
                border: "1.5px solid #3B4D7A",
                borderRadius: 20,
                padding: "28px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
              }}
            >
              <div>
                <h3 style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>
                  {path.title}
                </h3>
                <p style={{ color: "#F1F4F9", fontSize: 14, margin: "0 0 16px", opacity: 0.85, lineHeight: 1.6 }}>
                  {path.description}
                </p>
                <div style={{ backgroundColor: "#151B30", border: "1px solid #3B4D7A", color: "#0EA5E9", padding: "6px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700, width: "fit-content", marginBottom: 24 }}>
                  {path.courses} courses • {path.duration}
                </div>
              </div>

              <div>
                <Button asChild className="w-full rounded-xl px-6 py-3 font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm border-none">
                  <Link href={`/learning-paths`}>View Full Path →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
