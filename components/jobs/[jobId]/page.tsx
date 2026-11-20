import { notFound } from "next/navigation";
import Link from "next/link";
import { mockJobs } from "@/lib/mock-data/jobs";

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = mockJobs.find(j => j.id === jobId);
  if (!job) return notFound();

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 64px" }}>
      <div style={{ backgroundColor: "#151B30", padding: "52px 24px 44px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link
            href="/jobs"
            style={{
              color: "#0EA5E9",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 20
            }}
          >
            ← Back to Jobs
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <span
              style={{
                backgroundColor: "#0EA5E9",
                color: "#151B30",
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "capitalize"
              }}
            >
              {job.type}
            </span>
            <span style={{ color: "#F1F4F9", fontSize: 13, opacity: 0.75 }}>
              📅 Posted on {job.postedAt}
            </span>
          </div>

          <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, margin: "0 0 12px" }}>
            {job.title}
          </h1>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 600 }}>
              🏢 {job.company}
            </span>
            <span style={{ color: "#0EA5E9", fontSize: 15, fontWeight: 600 }}>
              📍 {job.location}
            </span>
            {job.salaryMin && job.salaryMax && (
              <span style={{ color: "#F59E0B", fontSize: 15, fontWeight: 700 }}>
                💰 ETB {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} / mo
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 24px 0" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: "36px 32px",
            border: "1px solid #3B4D7A",
            marginBottom: 28
          }}
        >
          <h2 style={{ color: "#151B30", fontSize: 20, fontWeight: 800, margin: "0 0 16px" }}>
            Job Overview & Description
          </h2>
          <p style={{ color: "#151B30", fontSize: 16, lineHeight: 1.8, margin: "0 0 28px" }}>
            {job.description}
          </p>

          <h2 style={{ color: "#151B30", fontSize: 20, fontWeight: 800, margin: "0 0 16px" }}>
            Verified Skills Required
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {job.requiredSkills.map(skill => (
              <span
                key={skill}
                style={{
                  backgroundColor: "#F1F4F9",
                  border: "1.5px solid #3B4D7A",
                  color: "#151B30",
                  borderRadius: 999,
                  padding: "6px 16px",
                  fontSize: 13,
                  fontWeight: 700
                }}
              >
                ✓ {skill}
              </span>
            ))}
          </div>

          <button
            style={{
              width: "100%",
              backgroundColor: "#F59E0B",
              color: "#151B30",
              border: "none",
              borderRadius: 12,
              padding: "16px 24px",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer"
            }}
          >
            ⚡ One-Click Apply with SkillBridge Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
