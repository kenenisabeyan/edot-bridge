import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LiveCommunityPulse } from "@/components/home/LiveCommunityPulse";
import { InteractiveTranslationDemo } from "@/components/home/InteractiveTranslationDemo";
import { QuickSkillChallenge } from "@/components/home/QuickSkillChallenge";
import { CareerRoadmapSimulator } from "@/components/home/CareerRoadmapSimulator";

const features = [
  {
    icon: "🌍",
    title: "AI Translation",
    desc: "Learn in your native language. Our AI translates every lesson instantly into 50+ languages.",
  },
  {
    icon: "🏆",
    title: "Verified Certificates",
    desc: "Earn tamper-proof digital certificates with unique verification IDs accepted by top employers.",
  },
  {
    icon: "💼",
    title: "Smart Job Matching",
    desc: "AI matches your certified skills to live job listings with a compatibility score.",
  },
  {
    icon: "📁",
    title: "Portfolio Builder",
    desc: "Showcase your projects, certificates, and skills on a shareable public profile.",
  },
  {
    icon: "🤖",
    title: "AI Career Coach",
    desc: "Get personalized career guidance, resume tips, and interview prep powered by AI.",
  },
  {
    icon: "🎯",
    title: "Skill Assessments",
    desc: "Prove your knowledge with rigorous, proctored assessments that employers trust.",
  },
];

const steps = [
  { step: "01", title: "Learn", desc: "Access 500+ courses in your language" },
  { step: "02", title: "Practice", desc: "Build real-world projects" },
  { step: "03", title: "Assess", desc: "Pass skill assessments" },
  { step: "04", title: "Certify", desc: "Earn verified certificates" },
  { step: "05", title: "Get Hired", desc: "Match with top employers" },
];

const testimonials = [
  {
    quote: "SkillBridge helped me learn React in Afaan Oromo. I got a job within 3 months!",
    name: "Almaz Tadesse",
    role: "Frontend Developer",
    company: "TechEthiopia",
    avatar: "AT",
  },
  {
    quote: "The certificate and portfolio builder made me stand out to employers. Incredible platform!",
    name: "Tewodros Bekele",
    role: "Full-Stack Engineer",
    company: "Remote First",
    avatar: "TB",
  },
  {
    quote: "AI job matching connected me with a role that's a perfect fit. This platform changed my life.",
    name: "Selamawit Haile",
    role: "Data Analyst",
    company: "FinTech Africa",
    avatar: "SH",
  },
];

const stats = [
  { value: "10K+", label: "Learners", sub: "across 30 countries" },
  { value: "500+", label: "Courses", sub: "always up to date" },
  { value: "1,200+", label: "Certificates", sub: "issued & verified" },
  { value: "300+", label: "Hired", sub: "graduates this year" },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#FFFFFF]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-[#FFFFFF]">
        {/* Soft radial background accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-16 -left-24 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #3B4D7A 0%, transparent 70%)" }}
          />
        </div>

        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 fade-in shadow-sm bg-[#F1F4F9] border border-[#3B4D7A]/30 text-[#151B30]"
          >
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9] pulse-dot" />
            AI-Powered Learning Platform · Now in Beta
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#151B30] fade-in-1">
            Learn.{" "}
            <span className="text-[#0EA5E9]">Certify.</span>
            <br />
            <span className="text-[#0EA5E9]">Get Hired.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#3B4D7A] max-w-2xl mx-auto leading-relaxed font-medium fade-in-2">
            SkillBridge bridges the gap between knowledge and employment.
            AI-powered translation, verified certificates, portfolio builder,
            and smart job matching — all in one platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 fade-in-3">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-bold shadow-md bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none"
            >
              <Link href="/register">Start Learning Free →</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base font-bold border-[#3B4D7A] bg-[#F1F4F9] text-[#151B30] hover:bg-[#3B4D7A] hover:text-[#FFFFFF]"
            >
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm font-medium text-[#3B4D7A] fade-in-4">
            {["✓ No credit card required", "✓ 500+ free lessons", "✓ Certificates recognized by 200+ employers"].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Pulse Banner ─────────────────────────────────── */}
      <LiveCommunityPulse />

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-16 border-y border-[#3B4D7A]/20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={s.label} className={`fade-in-${i + 1}`}>
                <div className="text-4xl font-extrabold text-[#151B30]">{s.value}</div>
                <div className="mt-1 text-base font-bold text-[#151B30]">{s.label}</div>
                <div className="text-xs text-[#3B4D7A] font-medium mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-12 h-1 rounded-full bg-[#0EA5E9] mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-[#151B30]">Everything You Need to Succeed</h2>
            <p className="mt-3 text-[#3B4D7A] font-medium max-w-xl mx-auto">
              From learning to employment, SkillBridge has every tool to accelerate your career.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-[#151B30] mb-2">{f.title}</h3>
                <p className="text-sm text-[#3B4D7A] font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Translation Demo ──────────────────────── */}
      <section className="py-20 border-t border-[#3B4D7A]/20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4 max-w-7xl">
          <InteractiveTranslationDemo />
        </div>
      </section>

      {/* ── 60-Second Skill Challenge ─────────────────────────── */}
      <section className="py-20 border-t border-[#3B4D7A]/20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4 max-w-7xl">
          <QuickSkillChallenge />
        </div>
      </section>

      {/* ── Career Learning Paths (Design from User Image) ─────── */}
      <section className="py-24 border-t border-[#3B4D7A]/20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="w-12 h-1 rounded-full bg-[#0EA5E9] mb-4" />
              <h2 className="text-4xl font-extrabold text-[#151B30]">Career Paths</h2>
              <p className="mt-3 text-[#3B4D7A] font-medium">Master complete job tracks with verified milestone certificates.</p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full mt-4 md:mt-0 border-[#3B4D7A] bg-[#F1F4F9] text-[#151B30] hover:bg-[#3B4D7A] hover:text-[#FFFFFF] font-bold"
            >
              <Link href="/learning-paths">All Career Paths →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend Developer Path - Exactly from User's Image */}
            <div
              className="rounded-2xl p-7 flex flex-col justify-between shadow-md"
              style={{ background: "#151B30", border: "1px solid rgba(59, 77, 122, 0.4)" }}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                  Frontend Developer Path
                </h3>
                <p className="mt-2 text-base text-[#F1F4F9]">
                  Become a professional frontend developer
                </p>
                <div className="mt-6 text-sm font-semibold text-white">
                  4 courses • 8 weeks
                </div>
              </div>
              <div className="mt-8">
                <Button
                  asChild
                  className="rounded-lg px-6 py-2.5 font-bold bg-[#FFFFFF] text-[#151B30] hover:bg-[#F1F4F9] transition-colors shadow-sm"
                >
                  <Link href="/learning-paths">View Path</Link>
                </Button>
              </div>
            </div>

            {/* Full-Stack Engineer Path */}
            <div
              className="rounded-2xl p-7 flex flex-col justify-between shadow-md"
              style={{ background: "#151B30", border: "1px solid rgba(59, 77, 122, 0.4)" }}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                  Full-Stack Engineer Path
                </h3>
                <p className="mt-2 text-base text-[#F1F4F9]">
                  Master React, Next.js, Node.js, and databases
                </p>
                <div className="mt-6 text-sm font-semibold text-white">
                  6 courses • 12 weeks
                </div>
              </div>
              <div className="mt-8">
                <Button
                  asChild
                  className="rounded-lg px-6 py-2.5 font-bold bg-[#FFFFFF] text-[#151B30] hover:bg-[#F1F4F9] transition-colors shadow-sm"
                >
                  <Link href="/learning-paths">View Path</Link>
                </Button>
              </div>
            </div>

            {/* AI & Data Science Path */}
            <div
              className="rounded-2xl p-7 flex flex-col justify-between shadow-md"
              style={{ background: "#151B30", border: "1px solid rgba(59, 77, 122, 0.4)" }}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                  AI & Data Science Path
                </h3>
                <p className="mt-2 text-base text-[#F1F4F9]">
                  Build intelligent AI models and ML systems
                </p>
                <div className="mt-6 text-sm font-semibold text-white">
                  5 courses • 10 weeks
                </div>
              </div>
              <div className="mt-8">
                <Button
                  asChild
                  className="rounded-lg px-6 py-2.5 font-bold bg-[#FFFFFF] text-[#151B30] hover:bg-[#F1F4F9] transition-colors shadow-sm"
                >
                  <Link href="/learning-paths">View Path</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Career Roadmap Simulator ──────────────────────────── */}
      <section className="py-20 border-t border-[#3B4D7A]/20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4 max-w-7xl">
          <CareerRoadmapSimulator />
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-24 bg-[#F1F4F9] border-t border-[#3B4D7A]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-12 h-1 rounded-full bg-[#0EA5E9] mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-[#151B30]">How SkillBridge Works</h2>
            <p className="mt-3 text-[#3B4D7A] font-medium">Five steps from learning to landing your dream job.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-5 text-center bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm"
              >
                <div
                  className="w-14 h-14 rounded-2xl bg-[#151B30] text-[#0EA5E9] flex items-center justify-center text-xl font-black mx-auto mb-4 shadow-sm"
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-[#151B30]">{item.title}</h3>
                <p className="text-xs text-[#3B4D7A] font-medium mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ─────────────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="w-12 h-1 rounded-full bg-[#0EA5E9] mb-4" />
              <h2 className="text-4xl font-extrabold text-[#151B30]">Featured Courses</h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#3B4D7A] bg-[#F1F4F9] text-[#151B30] hover:bg-[#3B4D7A] hover:text-[#FFFFFF] font-bold"
            >
              <Link href="/courses">View All →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Frontend Development", tech: "React · TypeScript · Tailwind", lessons: 24, level: "Beginner", id: "1" },
              { title: "Python for Data Science", tech: "Pandas · NumPy · Matplotlib", lessons: 18, level: "Intermediate", id: "2" },
              { title: "JavaScript Mastery", tech: "ES6+ · Async · REST APIs", lessons: 30, level: "All Levels", id: "3" },
            ].map((c) => (
              <div
                key={c.id}
                className="rounded-2xl overflow-hidden flex flex-col justify-between bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-sm"
              >
                {/* Thumbnail header */}
                <div className="h-40 bg-[#151B30] flex items-center justify-center text-4xl">
                  {c.id === "1" ? "⚛️" : c.id === "2" ? "🐍" : "🔥"}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#3B4D7A]/30 text-[#151B30]">{c.level}</span>
                      <span className="text-xs font-semibold text-[#3B4D7A]">{c.lessons} lessons</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-[#151B30]">{c.title}</h3>
                    <p className="text-sm text-[#3B4D7A] font-medium mt-1">{c.tech}</p>
                  </div>
                  <Button
                    asChild
                    className="w-full mt-6 rounded-lg font-bold bg-[#151B30] text-[#FFFFFF] hover:bg-[#3B4D7A] transition-colors shadow-sm"
                    size="sm"
                  >
                    <Link href={`/courses/${c.id}`}>Enroll Free →</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-24 bg-[#F1F4F9] border-t border-[#3B4D7A]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-12 h-1 rounded-full bg-[#0EA5E9] mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-[#151B30]">Success Stories</h2>
            <p className="mt-3 text-[#3B4D7A] font-medium">Real people. Real results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-[#F59E0B]">★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic text-[#151B30] font-medium">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#151B30] bg-[#0EA5E9] text-sm font-black shadow-sm"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#151B30]">{t.name}</div>
                    <div className="text-xs text-[#3B4D7A] font-medium">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#151B30] border-t border-[#3B4D7A]/40 text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to bridge your skills<br />to employment?
          </h2>
          <p className="mt-4 text-lg text-[#F1F4F9] max-w-lg mx-auto font-medium">
            Join 10,000+ learners already on SkillBridge. Free forever to get started.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-xl px-10 text-base font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 shadow-xl border-none"
            >
              <Link href="/register">Join SkillBridge — Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl px-8 text-base font-bold border-[#3B4D7A] bg-[#151B30] text-white hover:bg-[#3B4D7A]"
            >
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
