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

const categories = ["All", "Frontend", "Full-Stack", "Backend & APIs", "Data & AI", "Mobile"];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Frontend" && (c.title.includes("React") || c.title.includes("Frontend") || c.title.includes("JavaScript"))) ||
      (selectedCategory === "Full-Stack" && (c.title.includes("Full") || c.title.includes("Next"))) ||
      (selectedCategory === "Backend & APIs" && (c.title.includes("Node") || c.title.includes("API") || c.title.includes("Postgres"))) ||
      (selectedCategory === "Data & AI" && (c.title.includes("Python") || c.title.includes("Data") || c.title.includes("AI"))) ||
      (selectedCategory === "Mobile" && c.title.includes("Mobile"));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#192038] to-[#151B30] border-b border-[#3B4D7A]/40 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                <span>Multilingual Tech Curriculum</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                Master Modern Engineering.
              </h1>
              <p className="text-sm sm:text-base text-[#F1F4F9]/80 max-w-2xl font-medium leading-relaxed">
                Industry-standard courses translated in real-time into Afaan Oromoo, Amharic, and Swahili. Complete hands-on code playgrounds and earn tamper-proof credentials.
              </p>
            </div>

            {/* Quick stats pill boxes */}
            <div className="flex items-center gap-3">
              <div className="luxury-box p-5 text-center min-w-[110px]">
                <span className="block text-3xl font-black text-[#F59E0B]">{courses.length || 6}</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Courses</span>
              </div>
              <div className="luxury-box p-5 text-center min-w-[110px]">
                <span className="block text-3xl font-black text-[#0EA5E9]">50+</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Languages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Search & Category Filter Box */}
        <div className="luxury-box p-6 mb-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#F1F4F9]/50">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses, skills, frameworks..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#151B30] border border-[#3B4D7A]/60 text-white text-xs font-semibold placeholder:text-[#F1F4F9]/40 focus:outline-none focus:border-[#0EA5E9] shadow-inner transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="nested-box p-1.5 flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0EA5E9] text-[#151B30] shadow-[0_0_15px_rgba(14,165,233,0.35)]"
                    : "text-[#F1F4F9]/80 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="p-16 text-center">
            <span className="inline-block w-8 h-8 rounded-full border-2 border-[#0EA5E9] border-t-transparent animate-spin mb-4" />
            <p className="text-sm font-bold text-[#0EA5E9]">Loading verified curriculum...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="p-16 text-center luxury-box">
            <p className="text-lg font-bold text-white mb-2">No courses match your search.</p>
            <p className="text-sm text-[#F1F4F9]/70 mb-4">Try clearing filters or search for another technology.</p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory("All"); }}
              className="btn-amber-cta px-5 py-2.5 rounded-xl text-xs font-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
