"use client";
import { mockJobs } from "@/lib/mock-data/jobs";
import Link from "next/link";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B", label: "Pending Review" },
  interview: { bg: "rgba(14,165,233,0.15)", text: "#0EA5E9", label: "Interview Scheduled" },
  rejected: { bg: "rgba(59,77,122,0.3)", text: "#F1F4F9", label: "Not Selected" },
};

export default function JobApplicationsPage() {
  const apps = mockJobs.slice(0, 2).map((job, i) => ({
    ...job,
    status: i === 0 ? "pending" : "interview",
    appliedAt: i === 0 ? "3 days ago" : "1 week ago",
  }));

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, margin: "0 0 6px" }}>
          My Job Applications
        </h1>
        <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.8 }}>
          Track your submissions, interview invitations, and verified recruiter matches.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {apps.map((job) => {
          const s = statusColors[job.status];
          return (
            <div
              key={job.id}
              style={{
                backgroundColor: "#192038",
                border: "1.5px solid #3B4D7A",
                borderRadius: 20,
                padding: "24px 28px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16
              }}
            >
              <div>
                <h3 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>
                  {job.title}
                </h3>
                <p style={{ color: "#0EA5E9", fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>
                  {job.company} • {job.location}
                </p>
                <p style={{ color: "#F1F4F9", fontSize: 12, margin: 0, opacity: 0.6 }}>
                  Applied {job.appliedAt}
                </p>
              </div>

              <span
                style={{
                  backgroundColor: "#151B30",
                  color: s.text,
                  border: `1.5px solid ${s.text}`,
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 800
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}

        <div
          style={{
            backgroundColor: "#192038",
            border: "1.5px dashed #3B4D7A",
            borderRadius: 18,
            padding: 24,
            textAlign: "center",
            marginTop: 12
          }}
        >
          <p style={{ color: "#F1F4F9", fontSize: 14, margin: "0 0 10px", opacity: 0.85 }}>
            🚀 Want more verified employer matches? Keep your certificates and portfolio updated.
          </p>
          <Link
            href="/jobs"
            style={{
              color: "#0EA5E9",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none"
            }}
          >
            Explore Open Tech Jobs →
          </Link>
        </div>
      </div>
    </div>
  );
}
