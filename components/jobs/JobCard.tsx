"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/mock-data/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <div
      className="card-glow rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
      style={{ background: "#161B26", border: "1px solid #1C202C" }}
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-1.5">{job.title}</h3>
        <p className="text-sm text-[#8C95A6] mb-3">{job.company} • {job.location} • {job.type}</p>
        <p className="text-sm text-slate-300 mb-4">{job.description.slice(0, 140)}...</p>
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.map((skill) => (
            <span
              key={skill}
              className="bg-[#0D1016] text-[#8C95A6] border border-[#2C344A] px-2.5 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="shrink-0">
        <Button asChild className="rounded-lg px-6 py-2.5 font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-sm whitespace-nowrap">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
