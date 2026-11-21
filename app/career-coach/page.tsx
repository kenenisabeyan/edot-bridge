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
5. **Custom Hooks**: Extracting repetitive business logic (e.g. data fetching, debounce, local storage synchronization) into reusable hook functions.

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
          reply: `That is an excellent career goal. In tech, building verifiable proof of work is what sets top candidates apart.

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
    }, 750);
  };

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 64px" }}>
      {/* Header Banner */}
      <div style={{ backgroundColor: "#151B30", padding: "44px 24px 36px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: "#0EA5E9",
                  color: "#151B30",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 800
                }}
              >
                🤖
              </div>
              <div>
                <h1 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>
                  AI Career Coach
                </h1>
                <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.8 }}>
                  Real-time career guidance, skill evaluation, and technical interview preparation
                </p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div
              style={{
                display: "flex",
                gap: 6,
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: 4,
                border: "1px solid rgba(255,255,255,0.15)"
              }}
            >
              {[
                { id: "general", label: "Advisor" },
                { id: "interview", label: "Interview" },
                { id: "roadmap", label: "Roadmap" }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id as any)}
                  style={{
                    backgroundColor: activeMode === mode.id ? "#F59E0B" : "transparent",
                    color: activeMode === mode.id ? "#151B30" : "#F1F4F9",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px 0" }}>
        {/* Quick Prompts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 24 }}>
          {quickPrompts.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSend(item.prompt)}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                padding: "16px 18px",
                border: "1px solid #3B4D7A",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(21,27,48,0.04)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#0EA5E9";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#3B4D7A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h4 style={{ color: "#151B30", fontSize: 14, fontWeight: 800, margin: "0 0 4px" }}>
                {item.title}
              </h4>
              <p style={{ color: "#3B4D7A", fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: "1.5px solid #3B4D7A",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(21,27,48,0.06)",
            display: "flex",
            flexDirection: "column",
            height: 600
          }}
        >
          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    backgroundColor: msg.role === "user" ? "#151B30" : "#F1F4F9",
                    color: msg.role === "user" ? "#FFFFFF" : "#151B30",
                    borderRadius: 16,
                    padding: "16px 20px",
                    border: msg.role === "user" ? "none" : "1px solid #3B4D7A",
                    boxShadow: "0 2px 8px rgba(21,27,48,0.04)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: msg.role === "user" ? "#0EA5E9" : "#3B4D7A"
                      }}
                    >
                      {msg.role === "user" ? "You" : "🤖 SkillBridge Coach"}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: msg.role === "user" ? "rgba(255,255,255,0.6)" : "#3B4D7A",
                        opacity: 0.8
                      }}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </div>

                  {msg.actions && msg.actions.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                      {msg.actions.map((act, i) => (
                        <Link
                          key={i}
                          href={act.href}
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1.5px solid #0EA5E9",
                            color: "#151B30",
                            borderRadius: 8,
                            padding: "6px 14px",
                            fontSize: 12,
                            fontWeight: 700,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6
                          }}
                        >
                          {act.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    backgroundColor: "#F1F4F9",
                    border: "1px solid #3B4D7A",
                    borderRadius: 16,
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  }}
                >
                  <span style={{ fontSize: 16 }}>⚡</span>
                  <span style={{ color: "#151B30", fontSize: 13, fontWeight: 700 }}>
                    AI Coach is formulating your tailored guidance...
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div
            style={{
              padding: "16px 20px",
              backgroundColor: "#FFFFFF",
              borderTop: "1.5px solid #3B4D7A",
              display: "flex",
              gap: 12,
              alignItems: "center"
            }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Ask anything about roadmaps, assessments, resume tips, or interviews..."
              style={{
                flex: 1,
                padding: "14px 18px",
                backgroundColor: "#F1F4F9",
                border: "1.5px solid #3B4D7A",
                borderRadius: 12,
                color: "#151B30",
                fontSize: 14,
                outline: "none"
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: "#F59E0B",
                color: "#151B30",
                border: "none",
                borderRadius: 12,
                padding: "14px 24px",
                fontWeight: 800,
                fontSize: 14,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.6 : 1,
                transition: "opacity 0.2s",
                whiteSpace: "nowrap"
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
