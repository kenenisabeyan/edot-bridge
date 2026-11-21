"use client";
import { useState } from "react";
import Link from "next/link";
import { LiveCommunityPulse } from "@/components/home/LiveCommunityPulse";
import { InteractiveTranslationDemo } from "@/components/home/InteractiveTranslationDemo";
import { QuickSkillChallenge } from "@/components/home/QuickSkillChallenge";
import { CareerRoadmapSimulator } from "@/components/home/CareerRoadmapSimulator";

const features = [
  {
    icon: "🌍",
    title: "AI Multilingual Engine",
    desc: "Learn in your native tongue. Our AI translates lessons, code comments, and audio into Amharic, Afaan Oromo, Somali, and Swahili.",
  },
  {
    icon: "🏆",
    title: "Cryptographic Certificates",
    desc: "Earn tamper-proof credentials with unique verification IDs directly verified and trusted by 200+ partner companies.",
  },
  {
    icon: "💼",
    title: "Direct Hiring Pipeline",
    desc: "Verified assessment scores fast-track your applications directly into recruiter shortlists without resume filters.",
  },
  {
    icon: "📁",
    title: "Live Portfolio Builder",
    desc: "Showcase real projects, certificate scores, and code samples with an instantly shareable public portfolio URL.",
  },
  {
    icon: "🤖",
    title: "AI Career Coach",
    desc: "Personalized roadmaps, technical interview mock questions, and real-time compensation insights powered by AI.",
  },
  {
    icon: "🎯",
    title: "Proctored Assessments",
    desc: "Prove technical mastery with timed, rigorous assessments that evaluate real-world problem solving.",
  },
];

const steps = [
  { step: "01", title: "Learn in Your Language", desc: "Access interactive curriculum with real-time translation and voiceover." },
  { step: "02", title: "Practice in Sandbox", desc: "Write, test, and debug real React and JavaScript code in the browser." },
  { step: "03", title: "Verify with Assessments", desc: "Pass timed skill exams to prove authentic knowledge." },
  { step: "04", title: "Publish Portfolio", desc: "Generate a verified candidate profile with verified score report." },
  { step: "05", title: "Get Hired Faster", desc: "Match directly with top tech companies hiring verified talent." },
];

const comparisonData = [
  { feature: "Language Accessibility", skillbridge: "Native East African Languages + English", bootcamps: "English Only" },
  { feature: "Tuition Cost", skillbridge: "100% Free Core Curriculum", bootcamps: "$3,000 - $12,000 USD" },
  { feature: "Verification", skillbridge: "Cryptographic Certificate ID + Score Report", bootcamps: "Unverified PDF Diploma" },
  { feature: "Learning Pace", skillbridge: "Self-Paced with AI Coach 24/7", bootcamps: "Rigid Full-Time Schedules" },
  { feature: "Job Placement", skillbridge: "Direct Verified Matching Pipeline", bootcamps: "Cold Job Applications" },
];

const faqs = [
  {
    q: "Is SkillBridge really free for learners?",
    a: "Yes! All core courses, hands-on playgrounds, and community features are completely free to start. Verified assessments issue official digital credentials at zero cost."
  },
  {
    q: "How does the AI Translation work?",
    a: "Our AI translation layer translates lesson texts, technical terms, code comments, and audio explanations into Afaan Oromo, Amharic, Somali, and Swahili in real time."
  },
  {
    q: "Are the certificates recognized by employers?",
    a: "Absolutely. Each certificate includes a unique verification code that employers can check on our public portal to verify the candidate's exact assessment score."
  },
  {
    q: "Can I use the resume builder to apply for international remote jobs?",
    a: "Yes! The resume builder formats your profile according to modern international ATS standards, with one-click print and PDF export."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#151B30", minHeight: "100vh", color: "#F1F4F9" }}>
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section style={{ position: "relative", backgroundColor: "#151B30", padding: "80px 24px 96px", overflow: "hidden" }}>
        {/* Subtle radial accents */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          {/* Pill badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(59,77,122,0.6)",
              borderRadius: 999,
              padding: "6px 18px",
              marginBottom: 24
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#0EA5E9", display: "inline-block" }} />
            <span style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 700 }}>
              AI-Powered Multilingual EdTech Platform • Next-Gen Career Bridge
            </span>
          </div>

          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.1, margin: "0 auto 24px", maxWidth: 900, letterSpacing: "-0.02em" }}>
            Learn in Your Language. <br />
            <span style={{ color: "#0EA5E9" }}>Certify Your Skills.</span> <br />
            <span style={{ color: "#F59E0B" }}>Get Hired Directly.</span>
          </h1>

          <p style={{ color: "#F1F4F9", fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.6, maxWidth: 720, margin: "0 auto 36px", opacity: 0.85 }}>
            SkillBridge closes the opportunity gap. Access world-class courses translated in real time, build proven projects, earn verified credentials, and match with leading employers.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <Link
              href="/register"
              style={{
                backgroundColor: "#F59E0B",
                color: "#151B30",
                borderRadius: 14,
                padding: "16px 36px",
                fontSize: 16,
                fontWeight: 900,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(245,158,11,0.35)"
              }}
            >
              Start Learning Free →
            </Link>
            <Link
              href="/courses"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1.5px solid #3B4D7A",
                color: "#FFFFFF",
                borderRadius: 14,
                padding: "16px 32px",
                fontSize: 16,
                fontWeight: 800,
                textDecoration: "none"
              }}
            >
              Explore 500+ Courses
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", fontSize: 13, fontWeight: 700, color: "#F1F4F9", opacity: 0.8 }}>
            <span>✓ No credit card required</span>
            <span>✓ Amharic & Afaan Oromo AI Voice</span>
            <span>✓ Verified by 200+ Employers</span>
          </div>
        </div>
      </section>

      {/* ── Community Live Pulse Ticker ────────────────────────── */}
      <LiveCommunityPulse />

      {/* ── Platform Impact Stats ─────────────────────────────── */}
      <section style={{ backgroundColor: "#192038", borderTop: "1.5px solid #3B4D7A", borderBottom: "1.5px solid #3B4D7A", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, textAlign: "center" }}>
          {[
            { value: "10,000+", label: "Active Learners", sub: "across 30 countries" },
            { value: "500+", label: "Interactive Courses", sub: "industry-aligned" },
            { value: "1,200+", label: "Verified Certificates", sub: "cryptographically issued" },
            { value: "300+", label: "Hired Graduates", sub: "in 2026 alone" },
          ].map(stat => (
            <div key={stat.label}>
              <p style={{ color: "#FFFFFF", fontSize: 36, fontWeight: 900, margin: "0 0 4px" }}>
                {stat.value}
              </p>
              <p style={{ color: "#0EA5E9", fontSize: 15, fontWeight: 800, margin: "0 0 2px" }}>
                {stat.label}
              </p>
              <p style={{ color: "#F1F4F9", fontSize: 12, margin: 0, opacity: 0.7 }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interactive Translation Engine Showcase ───────────── */}
      <section style={{ backgroundColor: "#151B30", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <InteractiveTranslationDemo />
        </div>
      </section>

      {/* ── Quick Skill Challenge ─────────────────────────────── */}
      <section style={{ backgroundColor: "#151B30", borderTop: "1.5px solid rgba(59,77,122,0.4)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <QuickSkillChallenge />
        </div>
      </section>

      {/* ── Core Value Pillars ─────────────────────────────────── */}
      <section style={{ backgroundColor: "#151B30", borderTop: "1.5px solid rgba(59,77,122,0.4)", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ width: 44, height: 4, backgroundColor: "#0EA5E9", margin: "0 auto 16px", borderRadius: 999 }} />
            <h2 style={{ color: "#FFFFFF", fontSize: 34, fontWeight: 900, margin: "0 0 12px" }}>
              Everything Built for Your Employment
            </h2>
            <p style={{ color: "#F1F4F9", fontSize: 16, margin: 0, maxWidth: 600, marginInline: "auto", opacity: 0.8 }}>
              SkillBridge goes beyond video tutorials. We provide the complete verification and hiring infrastructure.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {features.map(f => (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#192038",
                  borderRadius: 18,
                  padding: "32px 28px",
                  border: "1.5px solid #3B4D7A",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>
                  {f.title}
                </h3>
                <p style={{ color: "#F1F4F9", fontSize: 14, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Roadmap Simulator ──────────────────────────── */}
      <section style={{ backgroundColor: "#151B30", borderTop: "1.5px solid rgba(59,77,122,0.4)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <CareerRoadmapSimulator />
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "#151B30", borderTop: "1.5px solid rgba(59,77,122,0.4)", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ width: 44, height: 4, backgroundColor: "#0EA5E9", margin: "0 auto 16px", borderRadius: 999 }} />
            <h2 style={{ color: "#FFFFFF", fontSize: 34, fontWeight: 900, margin: "0 0 12px" }}>
              5 Steps from Zero to Hired
            </h2>
            <p style={{ color: "#F1F4F9", fontSize: 16, margin: 0, opacity: 0.8 }}>
              The proven roadmap to entering the global tech economy.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {steps.map(s => (
              <div
                key={s.step}
                style={{
                  backgroundColor: "#192038",
                  borderRadius: 16,
                  padding: "24px 20px",
                  border: "1.5px solid #3B4D7A",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "#151B30",
                    color: "#0EA5E9",
                    border: "1.5px solid #0EA5E9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 900,
                    margin: "0 auto 16px"
                  }}
                >
                  {s.step}
                </div>
                <h4 style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>
                  {s.title}
                </h4>
                <p style={{ color: "#F1F4F9", fontSize: 12, lineHeight: 1.5, margin: 0, opacity: 0.8 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table: SkillBridge vs Traditional ─────── */}
      <section style={{ backgroundColor: "#151B30", borderTop: "1.5px solid rgba(59,77,122,0.4)", padding: "88px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, margin: "0 0 10px" }}>
              Why SkillBridge Beats Traditional Bootcamps
            </h2>
            <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.8 }}>
              Compare how SkillBridge delivers true career outcomes without financial burden.
            </p>
          </div>

          <div style={{ backgroundColor: "#192038", borderRadius: 20, border: "1.5px solid #3B4D7A", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1.2fr", backgroundColor: "#151B30", padding: "18px 24px", borderBottom: "1.5px solid #3B4D7A" }}>
              <span style={{ color: "#F1F4F9", fontSize: 14, fontWeight: 800 }}>Dimension</span>
              <span style={{ color: "#0EA5E9", fontSize: 14, fontWeight: 900 }}>⚡ SkillBridge Platform</span>
              <span style={{ color: "#F1F4F9", fontSize: 14, fontWeight: 700, opacity: 0.6 }}>Traditional Bootcamps</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {comparisonData.map((row, idx) => (
                <div
                  key={row.feature}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1.4fr 1.2fr",
                    padding: "16px 24px",
                    borderBottom: idx === comparisonData.length - 1 ? "none" : "1px solid rgba(59,77,122,0.25)",
                    backgroundColor: idx % 2 === 0 ? "#192038" : "#151B30"
                  }}
                >
                  <span style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>{row.feature}</span>
                  <span style={{ color: "#0EA5E9", fontSize: 13, fontWeight: 800 }}>✓ {row.skillbridge}</span>
                  <span style={{ color: "#F1F4F9", fontSize: 13, fontWeight: 500, opacity: 0.6 }}>{row.bootcamps}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#151B30", borderTop: "1.5px solid rgba(59,77,122,0.4)", padding: "88px 24px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, margin: "0 0 10px" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.8 }}>
              Got questions? We've got answers.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#192038",
                    borderRadius: 14,
                    border: "1.5px solid #3B4D7A",
                    overflow: "hidden"
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "18px 22px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 800 }}>
                      {faq.q}
                    </span>
                    <span style={{ color: "#0EA5E9", fontSize: 18, fontWeight: 900, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 22px 18px", color: "#F1F4F9", fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final Call to Action ──────────────────────────────── */}
      <section style={{ backgroundColor: "#151B30", borderTop: "1.5px solid #3B4D7A", padding: "88px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, margin: "0 0 16px" }}>
            Ready to Bridge Your Skills to Employment?
          </h2>
          <p style={{ color: "#F1F4F9", fontSize: 17, margin: "0 auto 36px", opacity: 0.85, maxWidth: 600 }}>
            Join 10,000+ ambitious learners mastering tech in their language and connecting with verified hiring managers.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/register"
              style={{
                backgroundColor: "#F59E0B",
                color: "#151B30",
                borderRadius: 14,
                padding: "16px 36px",
                fontSize: 16,
                fontWeight: 900,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(245,158,11,0.4)"
              }}
            >
              Create Free Account 🚀
            </Link>
            <Link
              href="/career-coach"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1.5px solid #3B4D7A",
                color: "#FFFFFF",
                borderRadius: 14,
                padding: "16px 28px",
                fontSize: 16,
                fontWeight: 800,
                textDecoration: "none"
              }}
            >
              Talk to AI Career Coach 🤖
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
