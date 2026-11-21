"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/mock-data/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <div
      style={{
        backgroundColor: "#192038",
        border: "1.5px solid #3B4D7A",
        borderRadius: 20,
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h3 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>
            {job.title}
          </h3>
          <p style={{ color: "#0EA5E9", fontSize: 14, fontWeight: 700, margin: "0 0 12px" }}>
            {job.company} • {job.location} • <span style={{ textTransform: "capitalize", color: "#F59E0B" }}>{job.type}</span>
          </p>
          <p style={{ color: "#F1F4F9", fontSize: 14, margin: "0 0 16px", opacity: 0.85, lineHeight: 1.6 }}>
            {job.description.slice(0, 160)}...
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {job.requiredSkills.map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: "#151B30",
                  color: "#FFFFFF",
                  border: "1px solid #3B4D7A",
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700
                }}
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        <div style={{ alignSelf: "center", flexShrink: 0 }}>
          <Button asChild className="rounded-xl px-6 py-3 font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap border-none">
            <Link href={`/jobs/${job.id}`}>View Details →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
