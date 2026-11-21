import Link from "next/link";
import { Button } from "@/components/ui/button";

const paths = [
  {
    id: "frontend",
    title: "Frontend Engineering Architect",
    role: "Frontend Engineer",
    description: "Master responsive UI systems, React 19 architecture, Next.js Server Components, state management, and modern CSS frameworks.",
    courses: 4,
    duration: "8 weeks",
    xp: "+1,200 XP",
    salary: "$40k - $75k",
    milestones: ["Semantic HTML & Modern CSS", "TypeScript & Strict Safety", "React 19 & Custom Hooks", "Next.js App Router Mastery"],
    accent: "#0EA5E9",
  },
  {
    id: "fullstack",
    title: "Full-Stack Enterprise Systems",
    role: "Full-Stack Engineer",
    description: "Build complete end-to-end web applications with relational databases, secure authentication, GraphQL/REST APIs, and cloud deployments.",
    courses: 6,
    duration: "12 weeks",
    xp: "+1,800 XP",
    salary: "$55k - $95k",
    milestones: ["Next.js Full-Stack Architecture", "Node.js & Express REST APIs", "PostgreSQL Schemas & Prisma ORM", "Auth, JWT & Session Security", "Cloud CI/CD & Deployments"],
    accent: "#F59E0B",
  },
  {
    id: "data-ai",
    title: "AI Systems & Data Engineering",
    role: "AI / Data Engineer",
    description: "Master modern data pipelines with Python, vectorized databases, Pandas, SQL data analysis, and language model API integrations.",
    courses: 5,
    duration: "10 weeks",
    xp: "+1,500 XP",
    salary: "$60k - $110k",
    milestones: ["Python for Scientific Computing", "SQL & Relational Analytics", "Pandas, NumPy & Visualization", "Vector Embeddings & RAG", "Fine-Tuning & LLM Deployment"],
    accent: "#0EA5E9",
  },
];

export default function LearningPathsPage() {
  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#192038] to-[#151B30] border-b border-[#3B4D7A]/40 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                <span>Structured Career Milestones</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                Career Learning Roadmaps.
              </h1>
              <p className="text-sm sm:text-base text-[#F1F4F9]/80 max-w-2xl font-medium leading-relaxed">
                Step-by-step curriculums specifically sequenced to take you from foundational syntax to enterprise readiness with verified milestones and recruiter shortlisting.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="luxury-box p-5 text-center min-w-[110px]">
                <span className="block text-3xl font-black text-[#F59E0B]">3</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Master Tracks</span>
              </div>
              <div className="luxury-box p-5 text-center min-w-[110px]">
                <span className="block text-3xl font-black text-[#0EA5E9]">100%</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Free Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {paths.map((path) => (
            <div
              key={path.id}
              className={`${path.accent === "#F59E0B" ? "luxury-box-amber" : "luxury-box"} p-8 flex flex-col justify-between group`}
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm"
                    style={{
                      backgroundColor: `${path.accent}15`,
                      color: path.accent,
                      border: `1px solid ${path.accent}40`,
                    }}
                  >
                    {path.role}
                  </span>
                  <div className="nested-box px-3 py-1 text-xs text-[#F59E0B] font-extrabold">
                    {path.xp}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-2.5 leading-snug group-hover:text-[#0EA5E9] transition-colors">
                  {path.title}
                </h3>

                <p className="text-sm text-[#F1F4F9]/80 mb-6 leading-relaxed font-medium">
                  {path.description}
                </p>

                {/* Duration & Salary metric box */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  <div className="nested-box p-3.5 text-center">
                    <span className="block text-[10px] font-bold text-[#F1F4F9]/60 uppercase">Timeline</span>
                    <span className="text-xs font-black text-white">{path.duration}</span>
                  </div>
                  <div className="nested-box p-3.5 text-center">
                    <span className="block text-[10px] font-bold text-[#F1F4F9]/60 uppercase">Avg Salary</span>
                    <span className="text-xs font-black text-[#F59E0B]">{path.salary}</span>
                  </div>
                </div>

                {/* Sequenced Milestones */}
                <div className="pt-4 border-t border-[#3B4D7A]/35 mb-6">
                  <p className="text-[11px] font-black uppercase tracking-wider text-[#0EA5E9] mb-3">
                    Curriculum Milestones ({path.courses} Courses):
                  </p>
                  <div className="space-y-2">
                    {path.milestones.map((m, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#F1F4F9]/90 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-[#151B30] border border-[#3B4D7A]/60 flex items-center justify-center text-[10px] text-[#0EA5E9] font-black shrink-0 shadow-inner">
                          {i + 1}
                        </span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Button asChild className="btn-amber-cta w-full py-4 rounded-xl text-xs font-black shadow-lg border-none">
                  <Link href="/courses" className="flex items-center justify-center gap-2">
                    <span>Enroll In Track</span>
                    <span className="text-sm">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
