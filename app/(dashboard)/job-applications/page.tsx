"use client";
import { mockJobs } from "@/lib/mock-data/jobs";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "rgba(245,158,11,0.12)", text: "#F59E0B", label: "Pending Review" },
  interview: { bg: "rgba(14,165,233,0.12)", text: "#0EA5E9", label: "Interview Scheduled" },
  rejected: { bg: "rgba(59,77,122,0.12)", text: "#3B4D7A", label: "Not Selected" },
};

export default function JobApplicationsPage() {
  const apps = mockJobs.slice(0, 2).map((job, i) => ({
    ...job,
    status: i === 0 ? "pending" : "interview",
    appliedAt: i === 0 ? "3 days ago" : "1 week ago",
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#151B30] mb-1">My Applications</h1>
        <p className="text-[#3B4D7A] font-medium">Track your job applications and their status.</p>
      </div>

      <div className="space-y-4">
        {apps.map((job) => {
          const s = statusColors[job.status];
          return (
            <div
              key={job.id}
              className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-lg text-[#151B30]">{job.title}</h3>
                  <p className="text-sm text-[#3B4D7A] font-semibold mt-0.5">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-xs text-[#3B4D7A] font-medium mt-1">Applied {job.appliedAt}</p>
                </div>
                <span
                  className="self-start sm:self-auto text-xs font-black px-3 py-1.5 rounded-full"
                  style={{ background: s.bg, color: s.text, border: `1px solid ${s.text}30` }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* Coming soon banner */}
        <div className="rounded-2xl p-6 bg-[#F1F4F9] border border-dashed border-[#3B4D7A]/40 text-center">
          <p className="text-sm text-[#3B4D7A] font-semibold">
            🚀 Real AI-powered job matching coming soon. Applications are mock for now.
          </p>
          <a href="/jobs" className="mt-3 inline-flex items-center text-sm font-bold text-[#0EA5E9] hover:underline">
            Browse Live Jobs →
          </a>
        </div>
      </div>
    </div>
  );
}
