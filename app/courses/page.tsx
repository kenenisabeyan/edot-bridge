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

  if (loading) return <div className="p-8 text-center">Loading courses...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
}