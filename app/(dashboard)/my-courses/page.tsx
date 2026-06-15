"use client";
import { mockCourses } from "@/lib/mock-data/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyCoursesPage() {
  // Mock progress data (would come from backend)
  const progressData: Record<string, number> = {
    "1": 45,
    "2": 10,
    "3": 0
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="space-y-6">
        {mockCourses.map(course => {
          const progress = progressData[course.id] || 0;
          return (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <Button asChild className="mt-4">
                  <Link href={`/courses/${course.id}`}>Continue</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}