"use client";

import { useState } from "react";
import Link from "next/link";
import { LiveCommunityPulse } from "@/components/home/LiveCommunityPulse";
import { InteractiveTranslationDemo } from "@/components/home/InteractiveTranslationDemo";
import { QuickSkillChallenge } from "@/components/home/QuickSkillChallenge";
import { CareerRoadmapSimulator } from "@/components/home/CareerRoadmapSimulator";

type DemoLang = "om" | "am" | "sw" | "en";

interface DemoData {
  title: string;
  explanation: string;
  codeSnippet: string;
  codeComment: string;
}

const heroDemos: Record<DemoLang, DemoData> = {
  om: {
    title: "Haala (State) fi Hooks React",
    explanation: "State jijjiirama yeroo maraa kompoonantii keessatti to'ata. Hooks fayyadamuun koodii qulqullina qabu barreessuuf gargaara.",
    codeComment: "// Haala haaromsuu fi gabaasa argachuu",
    codeSnippet: `const [score, setScore] = useState(98);\nconst [verified, setVerified] = useState(true);\n\nfunction submitVerification() {\n  publishCredential("SB-2026-OM");\n}`,
  },
  am: {
    title: "የReact ስቴት እና ሁክስ ግንዛቤ",
    explanation: "ስቴት (State) በኮምፖነንት ውስጥ ያለውን ተለዋዋጭ መረጃ በቅጽበት ይቆጣጠራል። ሁክስ ፈጣንና ዘመናዊ መተግበሪያ ለመገንባት ያግዛሉ።",
    codeComment: "// ተለዋዋጭ ውሂብን መከታተያና ማረጋገጫ",
    codeSnippet: `const [score, setScore] = useState(98);\nconst [verified, setVerified] = useState(true);\n\nfunction submitVerification() {\n  publishCredential("SB-2026-AM");\n}`,
  },
  sw: {
    title: "Mfumo wa State na Hooks za React",
    explanation: "State inadhibiti data inayobadilika kwenye programu yako papo hapo. Hooks hurahisisha utendaji kazi wa kisasa.",
    codeComment: "// Rekodi hali na thibitisha cheti",
    codeSnippet: `const [score, setScore] = useState(98);\nconst [verified, setVerified] = useState(true);\n\nfunction submitVerification() {\n  publishCredential("SB-2026-SW");\n}`,
  },
  en: {
    title: "React State Architecture & Hooks",
    explanation: "State manages reactive component data in real time. Hooks empower developers to build robust, scalable applications.",
    codeComment: "// Track reactive state & publish verification",
    codeSnippet: `const [score, setScore] = useState(98);\nconst [verified, setVerified] = useState(true);\n\nfunction submitVerification() {\n  publishCredential("SB-2026-EN");\n}`,
  },
};

const bentoFeatures = [
  {
    span: "lg:col-span-2",
    badge: "Multilingual Intelligence",
    title: "AI Real-Time Translation in 50+ African Languages",
    desc: "Break English barriers forever. Learn full-stack engineering, cloud architecture, and data science in Afaan Oromoo, Amharic, Somali, Swahili, and Yoruba with synchronized native voiceovers.",
    accent: "#0EA5E9",
    metric: "50+ Languages Supported",
    icon: "🌍",
  },
  {
    span: "lg:col-span-1",
    badge: "Cryptographic Credentials",
    title: "Tamper-Proof Certificates",
    desc: "Every certificate has an immutable public verification ID and direct score breakdown trusted by 200+ global recruiters.",
    accent: "#F59E0B",
    metric: "100% Verifiable",
    icon: "🛡️",
  },
  {
    span: "lg:col-span-1",
    badge: "Zero-Install Sandbox",
    title: "In-Browser Code Playground",
    desc: "Run React 19, TypeScript, Python, and SQL directly inside your browser. No local terminal setup or high-end laptop needed.",
    accent: "#0EA5E9",
    metric: "< 150ms Execution",
    icon: "⚡",
  },
  {
    span: "lg:col-span-2",
    badge: "Direct Hiring Pipeline",
    title: "Skip the Resume Black Hole",
    desc: "Top assessment performers get directly shortlisted on recruiter dashboards at Safaricom, Ethio Telecom, and international remote startups.",
    accent: "#F59E0B",
    metric: "88% Interview Rate",
    icon: "💼",
  },
  {
    span: "lg:col-span-2",
    badge: "24/7 AI Career Copilot",
    title: "Autonomous Career & Mock Interview Coach",
    desc: "Get instant portfolio reviews, personalized curriculum suggestions, realistic FAANG-style technical interview simulations, and compensation negotiation coaching.",
    accent: "#0EA5E9",
    metric: "24/7 AI Guidance",
    icon: "🤖",
  },
  {
    span: "lg:col-span-1",
    badge: "Instant Showcase",
    title: "Live Developer Portfolio",
    desc: "One-click shareable public profile featuring your verified assessment scores, live project links, and code samples.",
    accent: "#F59E0B",
    metric: "1-Click Public URL",
    icon: "✨",
  },
];

const steps = [
  { step: "01", title: "Learn in Native Tongue", desc: "Interactive modules translated in real-time with AI audio explanations." },
  { step: "02", title: "Practice in Sandbox", desc: "Build hands-on code projects with instant automated test feedback." },
  { step: "03", title: "Pass Proctored Exams", desc: "Validate authentic skills on timed, rigorous technical assessments." },
  { step: "04", title: "Publish Digital Credentials", desc: "Generate a cryptographic portfolio that employers can verify in 1 click." },
  { step: "05", title: "Direct Recruiter Shortlist", desc: "Match directly with high-paying local and international remote jobs." },
];

const comparisonData = [
  { feature: "Language Accessibility", skillbridge: "Native African Languages + English", bootcamps: "Strictly English Only" },
  { feature: "Tuition Cost", skillbridge: "100% Free Core Curriculum", bootcamps: "$3,000 - $12,000 USD Upfront" },
  { feature: "Skill Verification", skillbridge: "Cryptographic Certificate ID + Score Breakdown", bootcamps: "Unverified PDF Certificate" },
  { feature: "Pacing & Support", skillbridge: "Self-Paced with 24/7 AI Career Coach", bootcamps: "Rigid Full-Time Cohorts" },
  { feature: "Job Placement", skillbridge: "Direct Talent Pipeline to 200+ Partners", bootcamps: "Cold Applications with Generic Resume" },
];

const faqs = [
  {
    q: "Is SkillBridge really free for learners?",
    a: "Yes! All core curriculum, interactive playgrounds, translation engines, and community tools are completely free. You can earn verified credentials and apply for jobs without paying anything."
  },
  {
    q: "How does the real-time AI Translation work?",
    a: "Our fine-tuned multilingual educational model translates technical terminology, code comments, and explanatory text in real time into Afaan Oromoo, Amharic, Somali, Swahili, and more, preserving exact conceptual meaning."
  },
  {
    q: "Are the certificates recognized by real employers?",
    a: "Yes. Each certificate includes an immutable credential ID (e.g., SB-2026-XXXX) that employers verify on our public registry to review exact assessment scores and question-level breakdown."
  },
  {
    q: "Can I use SkillBridge on a low-spec phone or laptop?",
    a: "Yes! The entire code playground runs on cloud worker nodes. All you need is a browser, with offline caching for low-bandwidth connections."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeLang, setActiveLang] = useState<DemoLang>("om");
  const [codeRan, setCodeRan] = useState(false);

  const currentDemo = heroDemos[activeLang];

  const runCodeDemo = () => {
    setCodeRan(true);
    setTimeout(() => setCodeRan(false), 4000);
  };

  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* ── 1. Hero Section ───────────────────────────────────── */}
      <section className="relative pt-20 pb-28 px-4 overflow-hidden bg-tech-grid">
        {/* Atmospheric ambient lighting */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.10),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          {/* Shimmer Announcement Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#192038]/80 backdrop-blur-md border border-[#3B4D7A]/60 hover:border-[#0EA5E9] shadow-[0_0_20px_rgba(14,165,233,0.15)] mb-8 transition-all cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            <span className="text-xs font-bold text-[#F1F4F9]">
              SkillBridge 2.0 Engine is Live
            </span>
            <span className="text-xs text-[#0EA5E9] font-black">
              • Afaan Oromoo & Amharic Native AI →
            </span>
          </div>

          {/* Master Typography Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white max-w-5xl mx-auto mb-6">
            Learn in Your Language. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-white">
              Certify Real Mastery.
            </span> <br />
            <span className="text-[#F59E0B]">
              Get Hired Directly.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#F1F4F9]/85 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            The world's first AI-powered multilingual EdTech ecosystem. Access industry curriculum translated in real time, build proven projects in your browser, earn cryptographic certificates, and match directly with top hiring companies.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="btn-amber-cta w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Start Learning Free</span>
              <span className="text-lg">→</span>
            </Link>

            <Link
              href="/courses"
              className="btn-cyan-outline w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2"
            >
              <span>Explore 500+ Courses</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] font-black">
                FREE
              </span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-[#F1F4F9]/75 mb-16">
            <div className="flex items-center gap-2">
              <span className="text-[#0EA5E9]">✓</span>
              <span>100% Free Core Curriculum</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0EA5E9]">✓</span>
              <span>Afaan Oromoo, Amharic & Swahili</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0EA5E9]">✓</span>
              <span>Cryptographic Public Credential</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0EA5E9]">✓</span>
              <span>Direct Employer Shortlist</span>
            </div>
          </div>

          {/* ── Centerpiece: Interactive Platform Sandbox Preview Box ── */}
          <div className="glass-window relative mx-auto max-w-5xl p-3 sm:p-5 text-left">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#3B4D7A]/40 bg-[#151B30]/90 rounded-t-2xl mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-mono text-[#F1F4F9]/70 ml-3 hidden sm:inline">
                  skillbridge-studio // interactive-sandbox-v2
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  East Africa Cloud Node: 14ms
                </span>
              </div>
            </div>

            {/* Split Screen Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Code Editor Box */}
              <div className="lg:col-span-7 nested-box p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3B4D7A]/40 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#0EA5E9] font-mono font-bold">App.tsx</span>
                      <span className="text-[#F1F4F9]/40">•</span>
                      <span className="text-[#F1F4F9]/60 font-mono">React 19 + TypeScript</span>
                    </div>
                    <button
                      onClick={runCodeDemo}
                      className="px-3 py-1 rounded-lg bg-[#0EA5E9] text-[#151B30] font-black text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>▶</span>
                      <span>Run Sandbox</span>
                    </button>
                  </div>

                  <pre className="font-mono-code text-xs sm:text-sm text-[#F1F4F9] leading-relaxed overflow-x-auto py-2">
                    <span className="text-[#0EA5E9]">{currentDemo.codeComment}</span>{"\n"}
                    <span className="text-[#F59E0B]">import</span> {"{ useState }"} <span className="text-[#F59E0B]">from</span> <span className="text-[#10B981]">"react"</span>;{"\n\n"}
                    {currentDemo.codeSnippet}
                  </pre>
                </div>

                {/* Output console box */}
                <div className="mt-4 pt-3 border-t border-[#3B4D7A]/40">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#F1F4F9]/60 mb-1.5">
                    <span>TERMINAL OUTPUT</span>
                    <span>Status: OK</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#151B30] border border-[#3B4D7A]/50 font-mono text-xs text-[#10B981] flex items-center justify-between shadow-inner">
                    <span>
                      {codeRan
                        ? "✓ Verified test suites passed: 4/4 assertions (12ms) • +50 XP"
                        : "✓ Ready. Click 'Run Sandbox' to execute verified tests."}
                    </span>
                    {codeRan && <span className="text-[#F59E0B] font-bold">🏆 SCORE: 100%</span>}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Multilingual Translation Inspector Box */}
              <div className="lg:col-span-5 nested-box p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3B4D7A]/40">
                    <span className="text-xs font-bold text-[#0EA5E9] uppercase tracking-wider">
                      AI Multilingual Layer
                    </span>
                    <span className="text-[11px] text-[#F1F4F9]/60 font-mono">Real-time sync</span>
                  </div>

                  {/* Language switch button boxes */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { id: "om", label: "🇪🇹 Afaan Oromoo" },
                      { id: "am", label: "🇪🇹 አማርኛ" },
                      { id: "sw", label: "🇰🇪 Kiswahili" },
                      { id: "en", label: "🇬🇧 English" },
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setActiveLang(lang.id as DemoLang)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                          activeLang === lang.id
                            ? "bg-[#0EA5E9] text-[#151B30] shadow-[0_0_15px_rgba(14,165,233,0.35)] font-black"
                            : "bg-[#151B30] border border-[#3B4D7A]/60 text-[#F1F4F9]/80 hover:text-white hover:border-[#0EA5E9]/50"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {activeLang === lang.id && <span className="text-xs">✓</span>}
                      </button>
                    ))}
                  </div>

                  {/* Active Translation Preview Box */}
                  <div className="p-4 rounded-xl bg-[#151B30] border border-[#3B4D7A]/60 shadow-inner mb-3">
                    <h4 className="text-sm font-extrabold text-white mb-1.5">
                      {currentDemo.title}
                    </h4>
                    <p className="text-xs text-[#F1F4F9]/85 leading-relaxed font-medium">
                      {currentDemo.explanation}
                    </p>
                  </div>
                </div>

                {/* Verified Credential Pill Box */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151B30] border border-[#3B4D7A]/60 text-xs shadow-inner">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🛡️</span>
                    <div>
                      <p className="font-bold text-white text-[11px]">Credential ID</p>
                      <p className="font-mono text-[10px] text-[#0EA5E9]">SB-PRO-2026-9821</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-[10px] font-black shadow-sm">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Hiring & Institution Partners ──────────────────── */}
      <section className="py-12 px-4 border-y border-[#3B4D7A]/40 bg-[#192038]/50 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-[#0EA5E9] mb-6">
            Trusted By Engineering Teams, Telcos & Startups Across Emerging Markets
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 text-sm sm:text-base font-extrabold text-white">
            <span className="hover:text-[#0EA5E9] transition-colors">⚡ Safaricom</span>
            <span className="hover:text-[#0EA5E9] transition-colors">🌐 Ethio Telecom</span>
            <span className="hover:text-[#0EA5E9] transition-colors">☁️ Google Cloud Partner</span>
            <span className="hover:text-[#0EA5E9] transition-colors">🚀 Gebeya</span>
            <span className="hover:text-[#0EA5E9] transition-colors">💳 Flutterwave</span>
            <span className="hover:text-[#0EA5E9] transition-colors">🌍 ALX Network</span>
          </div>
        </div>
      </section>

      {/* ── 3. Live Community Pulse Ticker ─────────────────────── */}
      <LiveCommunityPulse />

      {/* ── 4. Platform Impact Statistics Luxury Jewel Boxes ──── */}
      <section className="py-20 px-4 bg-[#151B30]">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { value: "10,000+", label: "Active Learners", sub: "in 30+ countries", color: "#0EA5E9" },
            { value: "500+", label: "Interactive Courses", sub: "industry-standard", color: "#F59E0B" },
            { value: "1,200+", label: "Verified Certificates", sub: "cryptographic ID", color: "#FFFFFF" },
            { value: "300+", label: "Graduates Hired", sub: "in 2026 alone", color: "#0EA5E9" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="luxury-box p-7 group"
            >
              {/* Corner ambient glow orb */}
              <div
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full pointer-events-none opacity-20 blur-xl group-hover:opacity-35 transition-opacity"
                style={{ backgroundColor: stat.color }}
              />
              <p className="text-4xl sm:text-5xl font-black mb-1.5 tracking-tight" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-sm font-extrabold text-white mb-0.5">{stat.label}</p>
              <p className="text-xs text-[#F1F4F9]/60">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Master Bento Grid: Platform Pillars ────────────── */}
      <section className="py-24 px-4 bg-[#151B30] border-t border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192038] border border-[#3B4D7A] text-[#0EA5E9] text-xs font-bold mb-4">
              <span>✦</span>
              <span>Next-Generation Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Everything Built for Your Employment
            </h2>
            <p className="text-base sm:text-lg text-[#F1F4F9]/80 font-medium">
              SkillBridge goes far beyond passive video tutorials. We provide the complete verification and hiring infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bentoFeatures.map((b) => (
              <div
                key={b.title}
                className={`${b.span} ${b.accent === "#F59E0B" ? "luxury-box-amber" : "luxury-box"} p-8 sm:p-9 flex flex-col justify-between group`}
              >
                {/* Corner ambient light halo */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-15 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500"
                  style={{ backgroundColor: b.accent }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-14 h-14 rounded-2xl bg-[#151B30] border border-[#3B4D7A]/60 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                      {b.icon}
                    </span>
                    <span
                      className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: `${b.accent}15`,
                        color: b.accent,
                        border: `1px solid ${b.accent}40`,
                      }}
                    >
                      {b.metric}
                    </span>
                  </div>

                  <p className="text-xs font-black uppercase tracking-widest text-[#0EA5E9] mb-2">
                    {b.badge}
                  </p>
                  <h3 className="text-2xl font-extrabold text-white mb-3 leading-snug group-hover:text-white">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#F1F4F9]/80 leading-relaxed font-medium">
                    {b.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-8 border-t border-[#3B4D7A]/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F1F4F9]/60">SkillBridge Verified Engine</span>
                  <span className="text-[#0EA5E9] font-black group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                    <span>Learn more</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Interactive Translation Demo Section ───────────── */}
      <section className="py-20 px-4 bg-[#151B30] border-t border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-6xl">
          <InteractiveTranslationDemo />
        </div>
      </section>

      {/* ── 7. Quick Skill Challenge ───────────────────────────── */}
      <section className="py-20 px-4 bg-[#151B30] border-t border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-6xl">
          <QuickSkillChallenge />
        </div>
      </section>

      {/* ── 8. Career Roadmap Simulator ────────────────────────── */}
      <section className="py-20 px-4 bg-[#151B30] border-t border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-6xl">
          <CareerRoadmapSimulator />
        </div>
      </section>

      {/* ── 9. How It Works (5 Steps) ─────────────────────────── */}
      <section className="py-24 px-4 bg-[#151B30] border-t border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              5 Steps from Zero to Hired
            </h2>
            <p className="text-base text-[#F1F4F9]/80 font-medium">
              The battle-tested pipeline to entering the high-paying tech economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="luxury-box p-6 text-center flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#151B30] border-2 border-[#0EA5E9] text-[#0EA5E9] font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(14,165,233,0.3)] group-hover:scale-105 transition-transform">
                    {s.step}
                  </div>
                  <h4 className="text-base font-extrabold text-white mb-2">{s.title}</h4>
                  <p className="text-xs text-[#F1F4F9]/75 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Comparison Table: SkillBridge vs Traditional ───── */}
      <section className="py-24 px-4 bg-[#151B30] border-t border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Why SkillBridge Beats Traditional Bootcamps
            </h2>
            <p className="text-base text-[#F1F4F9]/80 font-medium">
              Compare how SkillBridge delivers certified outcomes without financial debt.
            </p>
          </div>

          <div className="luxury-box overflow-hidden shadow-2xl">
            <div className="grid grid-cols-12 bg-[#192038]/90 p-4 sm:p-5 border-b border-[#3B4D7A]/50 text-xs sm:text-sm font-extrabold">
              <span className="col-span-4 text-[#F1F4F9]/70 uppercase tracking-wider">Dimension</span>
              <span className="col-span-4 text-[#0EA5E9] flex items-center gap-1.5 font-black">
                <span>⚡</span>
                <span>SkillBridge 2.0</span>
              </span>
              <span className="col-span-4 text-[#F1F4F9]/50 uppercase tracking-wider">Traditional Bootcamps</span>
            </div>

            <div className="divide-y divide-[#3B4D7A]/30">
              {comparisonData.map((row) => (
                <div key={row.feature} className="grid grid-cols-12 p-4 sm:p-5 items-center text-xs sm:text-sm">
                  <span className="col-span-4 font-bold text-white">{row.feature}</span>
                  <span className="col-span-4 font-extrabold text-[#F59E0B]">{row.skillbridge}</span>
                  <span className="col-span-4 text-[#F1F4F9]/60">{row.bootcamps}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ Accordion ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#151B30] border-t border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#F1F4F9]/80">
              Everything you need to know about learning, certifying, and hiring on SkillBridge.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="luxury-box overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-extrabold text-white text-base hover:text-[#0EA5E9] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#0EA5E9] font-black text-lg">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-6 pt-1 text-sm text-[#F1F4F9]/80 leading-relaxed border-t border-[#3B4D7A]/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Final Master CTA ──────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#192038] to-[#151B30] border-t border-[#3B4D7A]/50 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] mb-6 uppercase tracking-wider">
            Ready to accelerate your life?
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            Start Learning in Your Mother Tongue Today.
          </h2>
          <p className="text-base sm:text-lg text-[#F1F4F9]/80 mb-10 leading-relaxed">
            Join over 10,000 learners mastering modern software engineering, AI, and cloud technology. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="btn-amber-cta w-full sm:w-auto px-10 py-4 rounded-xl text-base font-extrabold shadow-xl"
            >
              Create Free Account →
            </Link>
            <Link
              href="/jobs"
              className="btn-cyan-outline w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold"
            >
              Browse Open Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
