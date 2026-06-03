import { notFound } from "next/navigation";
import { mockCourses } from "@/lib/mock-data/courses";
import { TranslationButton } from "@/components/courses/TranslationButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const { courseId, lessonId } = await params;
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return notFound();
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) return notFound();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button asChild variant="ghost" className="mb-4">
        <Link href={`/courses/${courseId}`}>← Back to Course</Link>
      </Button>
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <div className="mt-6 prose max-w-none">
        <p>{lesson.content}</p>
      </div>
      <div className="mt-6">
        <TranslationButton text={lesson.content} />
      </div>
    </div>
  );
}