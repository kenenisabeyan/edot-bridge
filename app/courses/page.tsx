"use client";

import { useCourses } from "@/hooks/usePernApi";
import { CourseCard } from "@/components/courses/CourseCard";

export default function CoursesPage() {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading PERN stack courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block max-w-md">
          <p className="font-semibold">Unable to load courses</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="text-gray-600 mt-1">Master full-stack software development with hands-on projects.</p>
        </div>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
          PERN Express API Active
        </span>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No courses available yet.</p>
          <p className="text-sm text-gray-400 mt-1">Run `npm run db:seed` to populate sample courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}