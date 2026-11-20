"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/mock-data/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-[#151B30] mb-1.5">{job.title}</h3>
        <p className="text-sm font-semibold text-[#3B4D7A] mb-3">{job.company} • {job.location} • {job.type}</p>
        <p className="text-sm text-[#151B30] font-medium mb-4">{job.description.slice(0, 140)}...</p>
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.map((skill) => (
            <span
              key={skill}
              className="bg-[#FFFFFF] text-[#151B30] border border-[#3B4D7A]/30 px-3 py-1 rounded-full text-xs font-bold shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="shrink-0">
        <Button asChild className="rounded-lg px-6 py-2.5 font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap border-none">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
