"use client";
import { mockCourses } from "@/lib/mock-data/courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyCoursesPage() {
  const progressData: Record<string, number> = { "1": 45, "2": 10, "3": 0 };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, margin: "0 0 6px" }}>
          My Enrolled Courses
        </h1>
        <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.8 }}>
          Track your course completion, lesson progress, and access interactive coding playgrounds.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {mockCourses.map((course) => {
          const progress = progressData[course.id] || 0;
          return (
            <div
              key={course.id}
              style={{
                backgroundColor: "#192038",
                border: "1.5px solid #3B4D7A",
                borderRadius: 20,
                padding: "24px 28px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                <div>
                  <h3 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>
                    {course.title}
                  </h3>
                  <p style={{ color: "#0EA5E9", fontSize: 13, fontWeight: 700, margin: 0 }}>
                    {course.lessons?.length || 0} lessons • Verified curriculum
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      padding: "4px 12px",
                      borderRadius: 999,
                      backgroundColor: "#151B30",
                      color: progress === 0 ? "#F1F4F9" : progress >= 100 ? "#0EA5E9" : "#F59E0B",
                      border: "1px solid #3B4D7A"
                    }}
                  >
                    {progress === 0 ? "Not Started" : progress >= 100 ? "Completed" : "In Progress"}
                  </span>
                  <Button asChild className="rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity border-none px-6 py-2.5">
                    <Link href={`/courses/${course.id}`}>
                      {progress === 0 ? "Start Course →" : "Continue →"}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                <span style={{ color: "#F1F4F9", opacity: 0.7 }}>Progress</span>
                <span style={{ color: "#0EA5E9" }}>{progress}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, backgroundColor: "#151B30", overflow: "hidden", border: "1px solid #3B4D7A" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: progress >= 80 ? "#F59E0B" : "#0EA5E9",
                    borderRadius: 999
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
