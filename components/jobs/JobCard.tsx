"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/mock-data/jobs";

export function JobCard({ job }: { job: Job }) {
  const matchScores: Record<string, number> = {
    "1": 96,
    "2": 92,
    "3": 89,
    "4": 94,
    "5": 91,
  };
  const matchScore = matchScores[job.id] || 93;

  return (
    <div className="master-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-2xl group overflow-hidden">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E2640] to-[#151B30] border border-[#3B4D7A]/60 flex items-center justify-center text-xl font-black text-[#0EA5E9] shadow-inner group-hover:scale-105 transition-transform shrink-0">
              {job.company.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#0EA5E9] transition-colors leading-snug">
                <Link href={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <p className="text-xs font-bold text-[#F1F4F9]/75 mt-0.5">
                {job.company} • 📍 {job.location}
              </p>
            </div>
          </div>

          {/* Match Score Badge Box */}
          <span className="px-3 py-1.5 rounded-full text-xs font-black bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            🎯 {matchScore}% Match
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-[#F1F4F9]/80 mb-6 line-clamp-2 leading-relaxed font-medium">
          {job.description}
        </p>

        {/* Salary & Type info box */}
        <div className="nested-box p-3.5 flex flex-wrap items-center gap-3 mb-6 text-xs">
          {job.salaryMin && job.salaryMax ? (
            <span className="font-extrabold text-[#F59E0B]">
              💰 ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} / yr
            </span>
          ) : (
            <span className="font-extrabold text-[#F59E0B]">
              💰 Competitive Tech Salary
            </span>
          )}

          <span className="text-[#3B4D7A]">•</span>

          <span className="text-white font-bold capitalize">
            {job.type}
          </span>

          <span className="text-[#3B4D7A]">•</span>

          <span className="text-[#0EA5E9] font-bold">
            ⚡ Fast-Track Verified
          </span>
        </div>

        {/* Required verified skills */}
        <div className="pt-4 border-t border-[#3B4D7A]/35 mb-6">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#0EA5E9] mb-2.5">
            Verified Skill Requirements:
          </p>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A]/60 text-[#0EA5E9] text-xs font-bold shadow-inner"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <span className="text-xs text-[#F1F4F9]/60 font-semibold">
          Posted {new Date(job.postedAt).toLocaleDateString()}
        </span>
        <Button asChild className="btn-amber-cta px-7 py-3 rounded-xl text-xs font-black shadow-lg border-none">
          <Link href={`/jobs/${job.id}`}>View Opportunity →</Link>
        </Button>
      </div>
    </div>
  );
}
