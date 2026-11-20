"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/mock-data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-sm hover:shadow-md transition-shadow"
    >
      <div>
        <h3 className="text-xl font-bold text-[#151B30] mb-2 leading-snug">{course.title}</h3>
        <p className="text-sm text-[#3B4D7A] font-medium leading-relaxed mb-4">{course.description.slice(0, 100)}...</p>
        <p className="text-xs font-bold text-[#3B4D7A]">{course.lessons?.length || 0} lessons</p>
      </div>
      <div className="mt-6">
        <Button asChild className="w-full rounded-lg font-bold bg-[#151B30] text-[#FFFFFF] hover:bg-[#3B4D7A] transition-colors shadow-sm">
          <Link href={`/courses/${course.id}`}>View Course</Link>
        </Button>
      </div>
    </div>
  );
}
