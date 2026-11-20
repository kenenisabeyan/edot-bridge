import Link from "next/link";
import { Button } from "@/components/ui/button";

const paths = [
  { id: "frontend", title: "Frontend Developer Path", description: "Become a professional frontend developer", courses: 4, duration: "8 weeks" },
  { id: "fullstack", title: "Full Stack Engineer Path", description: "Build complete web applications with modern tech", courses: 6, duration: "12 weeks" },
  { id: "data", title: "Data Analyst & AI Path", description: "Master data analysis with Python and ML models", courses: 5, duration: "10 weeks" },
];

export default function LearningPathsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl bg-[#FFFFFF]">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-[#151B30] mb-2">Learning Paths</h1>
        <p className="text-lg text-[#3B4D7A] font-medium">Structured curriculums to take you from beginner to job‑ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map(path => (
          <div
            key={path.id}
            className="rounded-2xl p-7 flex flex-col justify-between shadow-md"
            style={{ background: "#151B30", border: "1px solid rgba(59, 77, 122, 0.4)" }}
          >
            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                {path.title}
              </h3>
              <p className="mt-2 text-base text-[#F1F4F9]">
                {path.description}
              </p>
              <div className="mt-6 text-sm font-semibold text-white">
                {path.courses} courses • {path.duration}
              </div>
            </div>
            <div className="mt-8">
              <Button asChild className="rounded-lg px-6 py-2.5 font-bold bg-[#FFFFFF] text-[#151B30] hover:bg-[#F1F4F9] transition-colors shadow-sm">
                <Link href={`/learning-paths/${path.id}`}>View Path</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
