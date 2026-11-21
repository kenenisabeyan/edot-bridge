import Link from "next/link";
import { mockAssessments } from "@/lib/mock-data/assessments";
import { Button } from "@/components/ui/button";

export default function AssessmentsPage() {
  return (
    <div style={{ backgroundColor: "#151B30", minHeight: "100vh", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(14,165,233,0.12)", border: "1px solid #0EA5E9", borderRadius: 999, padding: "4px 14px", marginBottom: 12 }}>
            <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>🎯 Industry Verified Tests</span>
          </div>
          <h1 style={{ color: "#FFFFFF", fontSize: 36, fontWeight: 900, margin: "0 0 10px" }}>
            Skill Assessments
          </h1>
          <p style={{ color: "#F1F4F9", fontSize: 16, margin: 0, opacity: 0.85, maxWidth: 640 }}>
            Validate your expertise with proctored, verifiable skill assessments accepted by top hiring partners.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {mockAssessments.map(assessment => (
            <div
              key={assessment.id}
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
                  {assessment.title}
                </h3>
                <p style={{ color: "#F1F4F9", fontSize: 14, margin: "0 0 20px", opacity: 0.85, lineHeight: 1.6 }}>
                  {assessment.description}
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                  <span style={{ backgroundColor: "#151B30", border: "1px solid #3B4D7A", color: "#0EA5E9", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                    {assessment.questions.length} Questions
                  </span>
                  <span style={{ backgroundColor: "#151B30", border: "1px solid #3B4D7A", color: "#F59E0B", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
                    Passing Score: {assessment.passingScore}%
                  </span>
                </div>
              </div>

              <div>
                <Button asChild className="w-full rounded-xl px-6 py-3 font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm border-none">
                  <Link href={`/assessments/${assessment.id}`}>Start Assessment →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
