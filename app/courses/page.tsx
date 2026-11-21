"use client";
import { useEffect, useState } from "react";
import { CourseCard } from "@/components/courses/CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: any[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#151B30", minHeight: "100vh", padding: "48px 24px", textAlign: "center" }}>
        <p style={{ color: "#0EA5E9", fontSize: 16, fontWeight: 800 }}>Loading world-class courses...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#151B30", minHeight: "100vh", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(14,165,233,0.12)", border: "1px solid #0EA5E9", borderRadius: 999, padding: "4px 14px", marginBottom: 12 }}>
            <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>📚 Multilingual Tech Curriculum</span>
          </div>
          <h1 style={{ color: "#FFFFFF", fontSize: 36, fontWeight: 900, margin: "0 0 10px" }}>
            Explore All Courses
          </h1>
          <p style={{ color: "#F1F4F9", fontSize: 16, margin: 0, opacity: 0.85, maxWidth: 640 }}>
            Master frontend, full-stack, and AI engineering with verified milestone certificates and real-time translation into African languages.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {courses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      </div>
    </div>
  );
}
