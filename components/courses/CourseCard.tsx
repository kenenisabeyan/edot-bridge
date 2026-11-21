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
    <div className="master-card rounded-2xl p-6 flex flex-col justify-between shadow-xl group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider"
            style={{
              backgroundColor: `${levelColor}15`,
              color: levelColor,
              border: `1px solid ${levelColor}40`,
            }}
          >
            {level}
          </span>

          <div className="flex items-center gap-1.5 text-xs text-[#F1F4F9]/75 font-semibold">
            <span>⭐ 4.9</span>
            <span>•</span>
            <span className="text-[#F59E0B] font-bold">+{xpReward} XP</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-white mb-2 leading-snug group-hover:text-[#0EA5E9] transition-colors">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-[#F1F4F9]/80 mb-5 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Course Details Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] font-bold">
            📖 {course.lessons?.length || 0} Lessons
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-[#F1F4F9]/70 font-semibold">
            ⏱️ ~{hours} Hours
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-[#10B981] font-semibold">
            🛡️ Verified Cert
          </span>
        </div>

        {/* Available Languages */}
        <div className="pt-3 border-t border-[#3B4D7A]/40 mb-6">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#F1F4F9]/60 mb-2">
            Available Translations:
          </p>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-[#F1F4F9]">
            <span className="px-2 py-0.5 rounded bg-[#151B30] border border-[#3B4D7A]">🇪🇹 Oromoo</span>
            <span className="px-2 py-0.5 rounded bg-[#151B30] border border-[#3B4D7A]">🇪🇹 አማርኛ</span>
            <span className="px-2 py-0.5 rounded bg-[#151B30] border border-[#3B4D7A]">🇰🇪 Swahili</span>
            <span className="px-2 py-0.5 rounded bg-[#151B30] border border-[#3B4D7A]">🇬🇧 English</span>
          </div>
        </div>
      </div>

      <div>
        <Button asChild className="btn-amber-cta w-full py-3.5 rounded-xl text-xs font-black shadow-md border-none">
          <Link href={`/courses/${course.id}`} className="flex items-center justify-center gap-2">
            <span>Start Course</span>
            <span>→</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
