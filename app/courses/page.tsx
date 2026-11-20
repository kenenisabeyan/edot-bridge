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

  if (loading) return <div className="p-12 text-center text-[#8C95A6]">Loading courses...</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">All Courses</h1>
        <p className="text-lg text-[#8C95A6]">Explore courses with verified certificates and multilingual AI translation.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
}