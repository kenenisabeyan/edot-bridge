import { notFound } from "next/navigation";
import { mockCourses } from "@/lib/mock-data/courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return notFound();

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Hero header */}
      <div className="bg-[#151B30] py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F1F4F9] hover:text-[#0EA5E9] transition-colors mb-6"
          >
            ← Back to Courses
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0EA5E9] text-[#151B30]">
              {course.lessons?.length || 0} Lessons
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F59E0B] text-[#151B30]">
              Beginner Friendly
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">{course.title}</h1>
          <p className="text-[#F1F4F9] font-medium text-lg max-w-2xl">{course.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons list */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#151B30] mb-6">Course Lessons</h2>
            <ul className="space-y-3">
              {course.lessons.map((lesson, idx) => (
                <li
                  key={lesson.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#3B4D7A]/20 bg-[#F1F4F9] hover:bg-[#FFFFFF] hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm bg-[#151B30] text-[#0EA5E9] shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <span className="font-semibold text-[#151B30] group-hover:text-[#0EA5E9] transition-colors">
                      {lesson.title}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-xl font-bold border-[#3B4D7A]/30 bg-[#FFFFFF] text-[#151B30] hover:bg-[#151B30] hover:text-[#FFFFFF] transition-colors text-xs px-4"
                    size="sm"
                  >
                    <Link href={`/courses/${courseId}/learn/${lesson.id}`}>Start →</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl p-6 bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-sm sticky top-24">
              <h3 className="font-extrabold text-[#151B30] mb-4 text-lg">Course Overview</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#3B4D7A] font-semibold">Total Lessons</span>
                  <span className="font-extrabold text-[#151B30]">{course.lessons?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#3B4D7A] font-semibold">Level</span>
                  <span className="font-extrabold text-[#151B30]">Beginner</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#3B4D7A] font-semibold">Certificate</span>
                  <span className="font-extrabold text-[#F59E0B]">Included ✓</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#3B4D7A] font-semibold">Language</span>
                  <span className="font-extrabold text-[#151B30]">50+ Languages</span>
                </div>
              </div>
              <Button
                asChild
                className="w-full rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm py-3"
              >
                <Link href={`/courses/${courseId}/learn/${course.lessons[0]?.id}`}>
                  Start Course Free →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
