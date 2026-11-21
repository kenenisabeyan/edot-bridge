"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/mock-data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div
      style={{
        backgroundColor: "#192038",
        border: "1.5px solid #3B4D7A",
        borderRadius: 20,
        padding: "24px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
      }}
    >
      <div>
        <h3 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, margin: "0 0 10px", lineHeight: 1.3 }}>
          {course.title}
        </h3>
        <p style={{ color: "#F1F4F9", fontSize: 14, margin: "0 0 16px", opacity: 0.85, lineHeight: 1.6 }}>
          {course.description.slice(0, 110)}...
        </p>
        <span
          style={{
            backgroundColor: "#151B30",
            border: "1px solid #3B4D7A",
            color: "#0EA5E9",
            borderRadius: 999,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 800
          }}
        >
          {course.lessons?.length || 0} lessons
        </span>
      </div>

      <div style={{ marginTop: 24 }}>
        <Button asChild className="w-full rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm border-none py-3">
          <Link href={`/courses/${course.id}`}>View Course →</Link>
        </Button>
      </div>
    </div>
  );
}
