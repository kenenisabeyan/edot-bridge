"use client";
import { mockCourses } from "@/lib/mock-data/courses";
import { CourseCard } from "@/components/courses/CourseCard";

export default function MyCoursesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}