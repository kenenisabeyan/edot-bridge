"use client";
import { mockCourses } from "@/lib/mock-data/courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyCoursesPage() {
  const progressData: Record<string, number> = { "1": 45, "2": 10, "3": 0 };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#151B30] mb-1">My Courses</h1>
        <p className="text-[#3B4D7A] font-medium">Your enrolled courses and learning progress.</p>
      </div>

      <div className="space-y-5">
        {mockCourses.map((course) => {
          const progress = progressData[course.id] || 0;
          return (
            <div
              key={course.id}
              className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-extrabold text-lg text-[#151B30]">{course.title}</h3>
                  <p className="text-sm text-[#3B4D7A] font-medium mt-0.5">
                    {course.lessons?.length || 0} lessons
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full"
                    style={{
                      background: progress === 0 ? "#F1F4F9" : progress < 50 ? "rgba(14,165,233,0.12)" : "rgba(245,158,11,0.12)",
                      color: progress === 0 ? "#3B4D7A" : progress < 50 ? "#0EA5E9" : "#F59E0B",
                      border: `1px solid ${progress === 0 ? "rgba(59,77,122,0.3)" : progress < 50 ? "rgba(14,165,233,0.3)" : "rgba(245,158,11,0.3)"}`,
                    }}
                  >
                    {progress === 0 ? "Not Started" : progress >= 100 ? "Completed" : "In Progress"}
                  </span>
                  <Button asChild className="rounded-xl font-bold bg-[#151B30] text-[#FFFFFF] hover:bg-[#3B4D7A] transition-colors shadow-sm border-none px-5 py-2">
                    <Link href={`/courses/${course.id}`}>
                      {progress === 0 ? "Start →" : "Continue →"}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-1.5 flex justify-between text-xs font-semibold">
                <span className="text-[#3B4D7A]">Progress</span>
                <span style={{ color: progress > 0 ? "#0EA5E9" : "#3B4D7A" }}>{progress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-[#F1F4F9] overflow-hidden border border-[#3B4D7A]/15">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background: progress >= 80 ? "#F59E0B" : "#0EA5E9",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
