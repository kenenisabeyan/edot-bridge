"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/mock-data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div
      className="card-glow rounded-2xl p-6 flex flex-col justify-between"
      style={{ background: "#161B26", border: "1px solid #1C202C" }}
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-2 leading-snug">{course.title}</h3>
        <p className="text-sm text-[#8C95A6] leading-relaxed mb-4">{course.description.slice(0, 100)}...</p>
        <p className="text-xs font-semibold text-slate-300">{course.lessons?.length || 0} lessons</p>
      </div>
      <div className="mt-6">
        <Button asChild className="w-full rounded-lg font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-sm">
          <Link href={`/courses/${course.id}`}>View Course</Link>
        </Button>
      </div>
    </div>
  );
}
