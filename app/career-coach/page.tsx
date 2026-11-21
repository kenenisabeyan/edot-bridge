"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  actions?: { label: string; href: string }[];
}

const quickPrompts = [
  {
    title: "🗺️ 6-Month Roadmap",
    desc: "Personalized path to Full-Stack Developer",
    prompt: "Can you create a detailed 6-month roadmap for me to become a job-ready Full-Stack Developer in East Africa?"
  },
  {
    title: "🎯 React Exam Prep",
    desc: "High-yield topics for SkillBridge certification",
    prompt: "What are the most tested concepts on the SkillBridge React Fundamentals assessment?"
  },
  {
    title: "💼 Interview Simulator",
    desc: "Common tech interview questions & answers",
    prompt: "Act as an interviewer for TechCorp Ethiopia. Ask me a frontend question and evaluate my answer."
  },
  {
    title: "💰 Salary Insights",
    desc: "Current local & remote tech compensation",
    prompt: "What are realistic salary expectations for junior to mid-level developers in Ethiopia and remote roles?"
  }
];

const mockResponses: Record<string, { reply: string; actions?: { label: string; href: string }[] }> = {
  roadmap: {
    reply: `Here is your high-impact 6-month roadmap to becoming a market-ready developer:

**Month 1–2: Modern Foundations**
• JavaScript Deep Dive: Closures, Event Loop, Promises & Async/Await.
• TypeScript Fundamentals: Interfaces, Generics, and strict type safety.
• Git & GitHub workflows: branches, pull requests, and code reviews.

**Month 3–4: Frontend Engineering**
• React 19 Core: Custom Hooks, Context API, state machines.
• Next.js App Router: Server Components, Streaming SSR, dynamic routing.
• Tailwind CSS & Design Systems: building accessible, high-contrast UIs.

**Month 5: Backend & Data**
• RESTful APIs & Server Actions in Next.js.
• Databases: PostgreSQL schemas, Prisma ORM, migrations, and indexing.
• Authentication & Security: JWT, OAuth, session management.

**Month 6: Portfolio & SkillBridge Verification**
• Deploy 2 capstone applications with live database backends.
• Pass the SkillBridge React & Full-Stack Assessments (≥80% score).
• Apply to partner companies via the SkillBridge verified talent pool.`,
    actions: [
      { label: "View Recommended Courses", href: "/courses" },
      { label: "Take React Assessment", href: "/assessments" }
    ]
  },
  react: {
    reply: `To score 90%+ on the **SkillBridge React Fundamentals Assessment**, ensure you master these 5 core areas:

1. **State & Re-renders**: Understanding that state updates trigger re-renders, and how to use \`useCallback\` and \`useMemo\` selectively to avoid expensive calculations.
2. **Component Lifecycle & Effects**: Proper cleanup functions inside \`useEffect\`, dependency array rules, and avoiding infinite render loops.
3. **Controlled Inputs**: Binding value and \`onChange\` handlers properly for form validation.
4. **Context & State Propagation**: Using \`createContext\` and \`useContext\` to prevent prop-drilling without adding unnecessary re-renders.
5. **Custom Hooks**: Extracting repetitive business logic into reusable hook functions.

💡 *Pro Tip*: Take the practice challenge on the SkillBridge homepage to test your reflexes before starting the verified assessment!`,
    actions: [
      { label: "Start React Assessment", href: "/assessments" },
      { label: "Browse Course Lessons", href: "/courses" }
    ]
  },
  interview: {
    reply: `Great! Let's start with a classic technical interview question asked by top tech employers:

**"Explain the difference between Server Components and Client Components in Next.js. When would you use each?"**

💡 **Key points an employer looks for:**
• **Server Components**: Run exclusively on the server, zero JavaScript sent to client bundle, direct database/backend access, ideal for data fetching and static content.
• **Client Components** (\`'use client'\`): Hydrate in the browser, enable interactivity, event listeners (\`onClick\`, \`onChange\`), and React hooks (\`useState\`, \`useEffect\`).
• **Architecture rule**: Push client boundaries to the leaves of the component tree to maximize performance and minimize bundle size.

How would you explain your experience using these in a real project?`,
    actions: [
      { label: "Explore Open Tech Jobs", href: "/jobs" },
      { label: "Review Your Portfolio", href: "/resume-builder" }
    ]
  },
  salary: {
    reply: `Here are current benchmarks for software developers in Ethiopia and remote international roles (2026):

**Local Ethiopia Market (Gross Monthly)**
• Junior Developer (0–2 yrs): **25,000 – 45,000 ETB**
• Mid-Level Developer (2–4 yrs): **50,000 – 90,000 ETB**
• Senior / Tech Lead (4+ yrs): **100,000 – 180,000+ ETB**

**Remote International Companies (USD)**
• Junior Contractor: **$800 – $1,800 / month**
• Mid-Level Remote Engineer: **$2,000 – $4,500 / month**
• Senior Remote Engineer: **$5,000 – $8,500+ / month**

🚀 **How to unlock the top 10% bracket:**
Having verified skill certificates and an active live portfolio increases your initial offer by an average of **28%** with SkillBridge employer partners.`,
    actions: [
      { label: "Explore Verified Job Matches", href: "/jobs" },
      { label: "Build Your Standout Resume", href: "/resume-builder" }
    ]
  }
};

export default function CareerCoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your SkillBridge AI Career Coach. I'm here to guide your learning journey, review your career goals, prepare you for assessments, and help you land top engineering roles. Select a topic below or type your question!",
      timestamp: "Just now",
      actions: [
        { label: "Explore All Courses", href: "/courses" },
        { label: "View Available Jobs", href: "/jobs" }
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<"general" | "interview" | "roadmap">("general");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let responseData = mockResponses.roadmap;

      if (q.includes("react") || q.includes("assessment") || q.includes("exam") || q.includes("score")) {
        responseData = mockResponses.react;
      } else if (q.includes("interview") || q.includes("question") || q.includes("techcorp")) {
        responseData = mockResponses.interview;
      } else if (q.includes("salary") || q.includes("money") || q.includes("rate") || q.includes("etb") || q.includes("compensation")) {
        responseData = mockResponses.salary;
      } else {
        responseData = {
          reply: `That is an excellent career goal. In modern engineering, building verifiable proof of work is what sets top candidates apart.

I recommend taking these three strategic steps:
1. Complete our targeted hands-on curriculum to solidify your foundations.
2. Complete the skill assessment to earn a verified credential for employers.
3. Add your certificate directly to your SkillBridge live portfolio so hiring managers can discover you directly.

What specific skill or role would you like to master first?`,
          actions: [
            { label: "Browse Courses", href: "/courses" },
            { label: "Take Skill Assessments", href: "/assessments" }
          ]
        };
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseData.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: responseData.actions
      };

      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#192038] to-[#151B30] border-b border-[#3B4D7A]/40 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-[#151B30] flex items-center justify-center text-3xl font-black shadow-[0_0_25px_rgba(14,165,233,0.4)] shrink-0">
                🤖
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] text-[10px] font-black uppercase tracking-wider mb-1">
                  <span>AI Copilot 24/7</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  SkillBridge Career Coach
                </h1>
                <p className="text-xs sm:text-sm text-[#F1F4F9]/75 font-medium">
                  Real-time career roadmaps, mock technical interviews, and salary intelligence
                </p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-1.5 p-1.5 rounded-2xl bg-[#151B30] border border-[#3B4D7A] shadow-inner self-start sm:self-auto">
              {[
                { id: "general", label: "Advisor" },
                { id: "interview", label: "Interview" },
                { id: "roadmap", label: "Roadmap" }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMode === mode.id
                      ? "bg-[#F59E0B] text-[#151B30] font-black shadow-sm"
                      : "text-[#F1F4F9]/75 hover:text-white"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Chat Interface */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Quick Prompts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.prompt)}
              className="luxury-box p-5 text-left transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <h4 className="text-xs font-extrabold text-white mb-1 group-hover:text-[#0EA5E9] transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#F1F4F9]/75 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Chat Window Container Box */}
        <div className="luxury-box overflow-hidden shadow-2xl flex flex-col h-[640px]">
          {/* Top Window Bar */}
          <div className="px-5 py-3 border-b border-[#3B4D7A]/40 bg-[#151B30]/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#F1F4F9]/60">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Session: active // fine-tuned-edu-model-v2</span>
            </div>
            <span className="text-[11px] font-bold text-[#0EA5E9]">
              Mode: {activeMode.toUpperCase()}
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-5 shadow-md ${
                    msg.role === "user"
                      ? "bg-[#0EA5E9] text-[#151B30] font-medium"
                      : "bg-[#151B30] border border-[#3B4D7A] text-[#F1F4F9]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-black ${
                        msg.role === "user" ? "text-[#151B30]" : "text-[#0EA5E9]"
                      }`}
                    >
                      {msg.role === "user" ? "You" : "🤖 SkillBridge Coach"}
                    </span>
                    <span
                      className={`text-[10px] ${
                        msg.role === "user" ? "text-[#151B30]/70" : "text-[#F1F4F9]/50"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#3B4D7A]/40">
                      {msg.actions.map((act, i) => (
                        <Link
                          key={i}
                          href={act.href}
                          className="px-3.5 py-1.5 rounded-lg bg-[#192038] border border-[#0EA5E9] text-[#0EA5E9] text-xs font-bold hover:bg-[#0EA5E9] hover:text-[#151B30] transition-colors flex items-center gap-1.5"
                        >
                          <span>{act.label}</span>
                          <span>→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="p-4 rounded-2xl bg-[#151B30] border border-[#3B4D7A] flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-ping" />
                  <span className="text-xs font-bold text-[#F1F4F9]/80">
                    AI Coach is formulating your strategic answer...
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#151B30] border-t border-[#3B4D7A]/50 flex items-center gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Ask anything about roadmaps, assessment prep, salary benchmarks, or interviews..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#192038] border border-[#3B4D7A] text-white text-xs font-semibold placeholder:text-[#F1F4F9]/40 focus:outline-none focus:border-[#0EA5E9] transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="btn-amber-cta px-6 py-3 rounded-xl text-xs font-black transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-md cursor-pointer"
            >
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
