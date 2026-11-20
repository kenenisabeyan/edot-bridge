import { notFound } from "next/navigation";
import { mockCourses } from "@/lib/mock-data/courses";
import { VideoLesson } from "@/components/courses/VideoLesson";
import { TranslationButton } from "@/components/courses/TranslationButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;

  const course = mockCourses.find((c) => c.id === courseId);
  if (!course) return notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) return notFound();
  const lesson = course.lessons[lessonIndex];
  const prevLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Top nav bar */}
      <div
        className="sticky top-16 z-30 border-b border-[#3B4D7A]/20 bg-[#FFFFFF] px-4 py-3"
      >
        <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B4D7A] hover:text-[#151B30] transition-colors"
            >
              ← Back
            </Link>
            <span className="text-[#3B4D7A]/40">|</span>
            <span className="text-sm font-bold text-[#151B30] truncate max-w-[200px] sm:max-w-xs">
              {course.title}
            </span>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F1F4F9] border border-[#3B4D7A]/25 text-[#151B30]">
            Lesson {lessonIndex + 1} / {course.lessons.length}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main lesson content */}
          <div className="lg:col-span-2 space-y-6">
            {lesson.videoUrl && (
              <div className="rounded-2xl overflow-hidden border border-[#3B4D7A]/20 shadow-sm">
                <VideoLesson videoUrl={lesson.videoUrl} title={lesson.title} />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-extrabold text-[#151B30] mb-4">{lesson.title}</h1>
              <div className="rounded-2xl bg-[#F1F4F9] border border-[#3B4D7A]/20 p-6">
                <p className="text-[#151B30] font-medium leading-relaxed">{lesson.content}</p>
              </div>
            </div>

            {/* Translation */}
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/20 p-5 shadow-sm">
              <p className="text-xs font-black text-[#3B4D7A] uppercase tracking-widest mb-3">
                🌍 AI Translation
              </p>
              <TranslationButton text={lesson.content} />
            </div>

            {/* Nav buttons */}
            <div className="flex justify-between gap-3 pt-2">
              {prevLesson ? (
                <Button asChild variant="outline" className="rounded-xl font-bold border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] hover:bg-[#3B4D7A] hover:text-[#FFFFFF] px-5">
                  <Link href={`/courses/${courseId}/learn/${prevLesson.id}`}>← Previous</Link>
                </Button>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Button asChild className="rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm px-5">
                  <Link href={`/courses/${courseId}/learn/${nextLesson.id}`}>Next Lesson →</Link>
                </Button>
              ) : (
                <Button asChild className="rounded-xl font-bold bg-[#0EA5E9] text-[#151B30] hover:opacity-90 border-none shadow-sm px-5">
                  <Link href={`/courses/${courseId}`}>Finish Course 🎉</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar: lesson list */}
          <div>
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm overflow-hidden sticky top-32">
              <div className="bg-[#151B30] px-5 py-4">
                <p className="text-xs font-black text-[#0EA5E9] uppercase tracking-widest">Course Lessons</p>
              </div>
              <ul className="divide-y divide-[#3B4D7A]/15 max-h-96 overflow-y-auto">
                {course.lessons.map((l, idx) => {
                  const active = l.id === lessonId;
                  return (
                    <li key={l.id}>
                      <Link
                        href={`/courses/${courseId}/learn/${l.id}`}
                        className="flex items-center gap-3 px-5 py-3.5 transition-all"
                        style={{
                          background: active ? "rgba(14,165,233,0.08)" : "transparent",
                          borderLeft: active ? "3px solid #0EA5E9" : "3px solid transparent",
                        }}
                      >
                        <span
                          className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0"
                          style={{
                            background: active ? "#0EA5E9" : "#F1F4F9",
                            color: active ? "#151B30" : "#3B4D7A",
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span
                          className="text-sm font-semibold truncate"
                          style={{ color: active ? "#151B30" : "#3B4D7A" }}
                        >
                          {l.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
