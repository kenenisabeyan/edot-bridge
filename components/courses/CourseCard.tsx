"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/mock-data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description.slice(0, 80)}...</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{course.lessons.length} lessons</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/courses/${course.id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}