"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/mock-data/courses";

export function CourseCard({ course }: { course: Course }) {
  // Generate consistent mock metadata based on course id/title
  const isAdvanced = course.title.toLowerCase().includes("advanced") || course.title.toLowerCase().includes("system");
  const isBeginner = course.title.toLowerCase().includes("fundamental") || course.title.toLowerCase().includes("introduction");
  const level = isAdvanced ? "Advanced" : isBeginner ? "Beginner" : "Intermediate";
  const levelColor = isAdvanced ? "#F59E0B" : isBeginner ? "#10B981" : "#0EA5E9";
  const hours = (course.lessons?.length || 5) * 1.5;
  const xpReward = (course.lessons?.length || 5) * 50;

  return (
    <div className="master-card rounded-3xl p-7 flex flex-col justify-between shadow-2xl group overflow-hidden">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm"
            style={{
              backgroundColor: `${levelColor}18`,
              color: levelColor,
              border: `1px solid ${levelColor}45`,
            }}
          >
            {level}
          </span>

          <div className="nested-box px-3 py-1 flex items-center gap-1.5 text-xs text-[#F1F4F9]/85 font-bold">
            <span>⭐ 4.9</span>
            <span>•</span>
            <span className="text-[#F59E0B]">+{xpReward} XP</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2.5 leading-snug group-hover:text-[#0EA5E9] transition-colors">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-[#F1F4F9]/80 mb-6 line-clamp-2 leading-relaxed font-medium">
          {course.description}
        </p>

        {/* Course Details Nested Pill Box */}
        <div className="nested-box p-3 flex flex-wrap items-center justify-around gap-2 mb-6 text-xs font-bold text-center">
          <span className="text-[#0EA5E9]">
            📖 {course.lessons?.length || 0} Lessons
          </span>
          <span className="text-[#3B4D7A]">•</span>
          <span className="text-[#F1F4F9]/80">
            ⏱️ ~{hours} Hours
          </span>
          <span className="text-[#3B4D7A]">•</span>
          <span className="text-[#10B981]">
            🛡️ Verified Cert
          </span>
        </div>

        {/* Available Languages */}
        <div className="pt-4 border-t border-[#3B4D7A]/35 mb-6">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#0EA5E9] mb-2.5">
            Synchronized AI Languages:
          </p>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-[#F1F4F9]">
            <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A]/60 shadow-inner">🇪🇹 Oromoo</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A]/60 shadow-inner">🇪🇹 አማርኛ</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A]/60 shadow-inner">🇰🇪 Swahili</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A]/60 shadow-inner">🇬🇧 English</span>
          </div>
        </div>
      </div>

      <div>
        <Button asChild className="btn-amber-cta w-full py-4 rounded-xl text-xs font-black shadow-lg border-none">
          <Link href={`/courses/${course.id}`} className="flex items-center justify-center gap-2">
            <span>Start Learning Free</span>
            <span className="text-sm">→</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
