import { notFound } from "next/navigation";
import { mockCourses } from "@/lib/mock-data/courses";
import { VideoLesson } from "@/components/courses/VideoLesson";
import { TranslationButton } from "@/components/courses/TranslationButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This page uses async params for Next.js 15 App Router
export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;

  const course = mockCourses.find((c) => c.id === courseId);
  if (!course) return notFound();

  const lesson = course.lessons.find((l) => l.id === lessonId);
  if (!lesson) return notFound();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button asChild variant="ghost" className="mb-4">
        <Link href={`/courses/${courseId}`}>← Back to Course</Link>
      </Button>

      <h1 className="text-2xl font-bold">{lesson.title}</h1>

      {lesson.videoUrl && (
        <VideoLesson videoUrl={lesson.videoUrl} title={lesson.title} />
      )}

      <div className="mt-6 prose max-w-none">
        <p>{lesson.content}</p>
      </div>

      <div className="mt-6">
        <TranslationButton text={lesson.content} />
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" disabled>
          Previous Lesson
        </Button>
        <Button variant="outline" disabled>
          Next Lesson
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Lesson ID: {lessonId} | Course ID: {courseId}
      </p>
    </div>
  );
}