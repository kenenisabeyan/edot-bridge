import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
  { step: "01", title: "Learn", desc: "Access 500+ courses in your language", color: "from-violet-500 to-indigo-500" },
  { step: "02", title: "Practice", desc: "Build real-world projects", color: "from-indigo-500 to-blue-500" },
  { step: "03", title: "Assess", desc: "Pass skill assessments", color: "from-blue-500 to-cyan-500" },
  { step: "04", title: "Certify", desc: "Earn verified certificates", color: "from-cyan-500 to-teal-500" },
  { step: "05", title: "Get Hired", desc: "Match with top employers", color: "from-teal-500 to-green-500" },
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
    <div className="overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center animated-gradient">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(250 100% 65%) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-16 -left-24 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, hsl(174 100% 45%) 0%, transparent 70%)" }}
          />
        </div>

        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 fade-in"
            style={{
              background: "hsl(250 100% 65% / .1)",
              border: "1px solid hsl(250 100% 65% / .25)",
              color: "hsl(248 90% 55%)",
            }}>
            <span className="w-2 h-2 rounded-full bg-current pulse-dot" />
            AI-Powered Learning Platform · Now in Beta
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] fade-in-1">
            Learn.{" "}
            <span className="gradient-text">Certify.</span>
            <br />
            <span className="gradient-text">Get Hired.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed fade-in-2">
            SkillBridge bridges the gap between knowledge and employment.
            AI-powered translation, verified certificates, portfolio builder,
            and smart job matching — all in one platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 fade-in-3">
            <Button asChild size="lg"
              className="rounded-full px-8 text-base font-semibold shadow-lg"
              style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))", border: "none" }}>
              <Link href="/register">Start Learning Free →</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground fade-in-4">
            {["✓ No credit card required", "✓ 500+ free lessons", "✓ Certificates recognized by 200+ employers"].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-16 border-y" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={s.label} className={`fade-in-${i + 1}`}>
                <div className="text-4xl font-extrabold gradient-text">{s.value}</div>
                <div className="mt-1 text-base font-semibold">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="text-4xl font-bold">Everything You Need to Succeed</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              From learning to employment, SkillBridge has every tool to accelerate your career.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-glow rounded-2xl p-6"
                style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "hsl(var(--surface))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="text-4xl font-bold">How SkillBridge Works</h2>
            <p className="mt-3 text-muted-foreground">Five steps from learning to landing your dream job.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((item) => (
              <div key={item.step} className="card-glow rounded-2xl p-5 text-center"
                style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xl font-black mx-auto mb-4`}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ─────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="section-divider" style={{ margin: "0 0 1rem" }} />
              <h2 className="text-4xl font-bold">Featured Courses</h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/courses">View All →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Frontend Development", tech: "React · TypeScript · Tailwind", lessons: 24, level: "Beginner", id: "1" },
              { title: "Python for Data Science", tech: "Pandas · NumPy · Matplotlib", lessons: 18, level: "Intermediate", id: "2" },
              { title: "JavaScript Mastery", tech: "ES6+ · Async · REST APIs", lessons: 30, level: "All Levels", id: "3" },
            ].map((c) => (
              <div key={c.id} className="card-glow rounded-2xl overflow-hidden"
                style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                {/* Thumbnail placeholder */}
                <div className="h-40 animated-gradient flex items-center justify-center text-4xl">
                  {c.id === "1" ? "⚛️" : c.id === "2" ? "🐍" : "🔥"}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-primary">{c.level}</span>
                    <span className="text-xs text-muted-foreground">{c.lessons} lessons</span>
                  </div>
                  <h3 className="font-bold text-lg">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.tech}</p>
                  <Button asChild className="w-full mt-4 rounded-full" size="sm">
                    <Link href={`/courses/${c.id}`}>Enroll Free →</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "hsl(var(--surface))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="text-4xl font-bold">Success Stories</h2>
            <p className="mt-3 text-muted-foreground">Real people. Real results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-glow rounded-2xl p-6"
                style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic text-muted-foreground">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(248 90% 50%) 50%, hsl(174 100% 40%))" }}
        />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to bridge your skills<br />to employment?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto">
            Join 10,000+ learners already on SkillBridge. Free forever to get started.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg"
              className="rounded-full px-10 text-base font-semibold bg-white text-indigo-700 hover:bg-white/90 shadow-xl">
              <Link href="/register">Join SkillBridge — Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline"
              className="rounded-full px-8 text-base font-semibold text-white border-white/40 hover:bg-white/10">
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}