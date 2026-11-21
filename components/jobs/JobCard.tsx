"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/mock-data/jobs";

export function JobCard({ job }: { job: Job }) {
  // Deterministic mock match score based on job id
  const matchScores: Record<string, number> = {
    "1": 96,
    "2": 92,
    "3": 89,
    "4": 94,
    "5": 91,
  };
  const matchScore = matchScores[job.id] || 93;

  return (
    <div className="master-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E2640] to-[#151B30] border border-[#3B4D7A] flex items-center justify-center text-lg font-black text-[#0EA5E9] shadow-inner group-hover:scale-105 transition-transform">
              {job.company.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-[#0EA5E9] transition-colors leading-snug">
                <Link href={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <p className="text-xs font-bold text-[#F1F4F9]/75 mt-0.5">
                {job.company} • 📍 {job.location}
              </p>
            </div>
          </div>

          {/* Match Score Badge */}
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] whitespace-nowrap shadow-sm">
            🎯 {matchScore}% Match
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-[#F1F4F9]/80 mb-5 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Salary & Type info */}
        <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
          {job.salaryMin && job.salaryMax ? (
            <span className="px-3 py-1 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-extrabold">
              💰 ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} / yr
            </span>
          ) : (
            <span className="px-3 py-1 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-extrabold">
              💰 Competitive Tech Salary
            </span>
          )}

          <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-white font-bold capitalize">
            {job.type}
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] font-bold">
            ⚡ Fast-Track Verified
          </span>
        </div>

        {/* Required verified skills */}
        <div className="pt-3 border-t border-[#3B4D7A]/40 mb-6">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#F1F4F9]/60 mb-2">
            Verified Skill Requirements:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] text-xs font-bold"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <span className="text-[11px] text-[#F1F4F9]/60 font-semibold">
          Posted {new Date(job.postedAt).toLocaleDateString()}
        </span>
        <Button asChild className="btn-amber-cta px-6 py-2.5 rounded-xl text-xs font-black shadow-md border-none">
          <Link href={`/jobs/${job.id}`}>View Opportunity →</Link>
        </Button>
      </div>
    </div>
  );
}
