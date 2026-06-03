import { notFound } from "next/navigation";
import { mockCourses } from "@/lib/mock-data/courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return notFound();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-2 text-muted-foreground">{course.description}</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Lessons</h2>
      <ul className="space-y-3">
        {course.lessons.map((lesson, idx) => (
          <li key={lesson.id} className="flex justify-between items-center border p-4 rounded-lg">
            <span className="font-medium">{idx + 1}. {lesson.title}</span>
            <Button variant="outline" asChild>
              <Link href={`/courses/${courseId}/learn/${lesson.id}`}>Start Lesson</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}