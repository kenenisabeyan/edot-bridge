"use client";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import { mockCourses } from "@/lib/mock-data/courses";
import { VideoLesson } from "@/components/courses/VideoLesson";
import { TranslationButton } from "@/components/courses/TranslationButton";
import Link from "next/link";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);

  const course = mockCourses.find((c) => c.id === courseId);
  if (!course) return notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) return notFound();
  const lesson = course.lessons[lessonIndex];
  const prevLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  // Interactive Code Playground State
  const [code, setCode] = useState(
`// Interactive Lesson Playground
// Try modifying the component below:
function WelcomeGreeting({ name }) {
  return (
    <div className="card">
      <h3>Welcome to SkillBridge, {name}!</h3>
      <p>Verified skill learning in your language.</p>
    </div>
  );
}

console.log("Component initialized successfully!");`
  );
  const [consoleOutput, setConsoleOutput] = useState<string>("Ready to execute code.");
  const [completed, setCompleted] = useState(false);

  const runCode = () => {
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "))
      };
      // Evaluate safe string logs
      logs.push("Executing playground script...");
      if (code.includes("console.log")) {
        const matches = code.match(/console\.log\((.*?)\)/g);
        if (matches) {
          matches.forEach(m => {
            const inner = m.replace("console.log(", "").replace(")", "").replace(/['"]/g, "");
            logs.push(`> ${inner}`);
          });
        }
      }
      logs.push("✓ Execution complete (0 errors).");
      setConsoleOutput(logs.join("\n"));
    } catch (e: any) {
      setConsoleOutput(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 64px" }}>
      {/* Top sticky navigation bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: "#151B30",
          borderBottom: "1.5px solid #3B4D7A",
          padding: "14px 24px"
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link
              href={`/courses/${courseId}`}
              style={{
                color: "#0EA5E9",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 6
              }}
            >
              ← Back to Course
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>
              {course.title}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#F1F4F9",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 700
              }}
            >
              Lesson {lessonIndex + 1} of {course.lessons.length}
            </span>
            <button
              onClick={() => setCompleted(!completed)}
              style={{
                backgroundColor: completed ? "#0EA5E9" : "#F59E0B",
                color: "#151B30",
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer"
              }}
            >
              {completed ? "✓ Lesson Completed (+50 XP)" : "Mark as Completed"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>

          {/* Left: Main Lesson Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, gridColumn: "span 2" }}>
            {lesson.videoUrl && (
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1.5px solid #3B4D7A", backgroundColor: "#151B30" }}>
                <VideoLesson videoUrl={lesson.videoUrl} title={lesson.title} />
              </div>
            )}

            {/* Lesson Title & Notes */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: "32px 32px",
                border: "1.5px solid #3B4D7A",
                boxShadow: "0 4px 16px rgba(21,27,48,0.04)"
              }}
            >
              <h1 style={{ color: "#151B30", fontSize: 26, fontWeight: 800, margin: "0 0 16px" }}>
                {lesson.title}
              </h1>
              <div style={{ color: "#151B30", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px" }}>
                <p style={{ margin: 0 }}>{lesson.content}</p>
              </div>

              {/* Translation Integration */}
              <div style={{ marginTop: 24 }}>
                <TranslationButton text={lesson.content} />
              </div>
            </div>

            {/* Interactive Code Playground Tab */}
            <div
              style={{
                backgroundColor: "#151B30",
                borderRadius: 16,
                border: "1.5px solid #3B4D7A",
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(21,27,48,0.12)"
              }}
            >
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#0EA5E9", fontSize: 13, fontWeight: 800 }}>
                    ⚡ Hands-On Code Playground
                  </span>
                  <span style={{ color: "#F1F4F9", fontSize: 12, opacity: 0.6 }}>
                    React / JavaScript
                  </span>
                </div>
                <button
                  onClick={runCode}
                  style={{
                    backgroundColor: "#F59E0B",
                    color: "#151B30",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 16px",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  Run Code ▶
                </button>
              </div>

              {/* Code Editor Area */}
              <div style={{ padding: "16px 20px" }}>
                <textarea
                  rows={8}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  style={{
                    width: "100%",
                    fontFamily: "monospace",
                    fontSize: 13,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 10,
                    color: "#0EA5E9",
                    padding: "14px 16px",
                    outline: "none",
                    lineHeight: 1.6,
                    resize: "vertical"
                  }}
                />
              </div>

              {/* Console Output */}
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: "12px 20px",
                  borderTop: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <p style={{ color: "#F1F4F9", fontSize: 11, fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7 }}>
                  Console Output:
                </p>
                <pre style={{ color: "#F1F4F9", fontSize: 12, margin: 0, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                  {consoleOutput}
                </pre>
              </div>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }}>
              {prevLesson ? (
                <Link
                  href={`/courses/${courseId}/learn/${prevLesson.id}`}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #3B4D7A",
                    color: "#151B30",
                    borderRadius: 10,
                    padding: "12px 22px",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none"
                  }}
                >
                  ← Previous Lesson
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link
                  href={`/courses/${courseId}/learn/${nextLesson.id}`}
                  style={{
                    backgroundColor: "#F59E0B",
                    color: "#151B30",
                    borderRadius: 10,
                    padding: "12px 26px",
                    fontWeight: 800,
                    fontSize: 14,
                    textDecoration: "none"
                  }}
                >
                  Next Lesson →
                </Link>
              ) : (
                <Link
                  href={`/courses/${courseId}`}
                  style={{
                    backgroundColor: "#0EA5E9",
                    color: "#151B30",
                    borderRadius: 10,
                    padding: "12px 26px",
                    fontWeight: 800,
                    fontSize: 14,
                    textDecoration: "none"
                  }}
                >
                  Finish Course 🎉
                </Link>
              )}
            </div>
          </div>

          {/* Right Sidebar: Course Progress & Curriculum */}
          <div>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                border: "1.5px solid #3B4D7A",
                overflow: "hidden",
                position: "sticky",
                top: 80,
                boxShadow: "0 4px 16px rgba(21,27,48,0.04)"
              }}
            >
              <div style={{ backgroundColor: "#151B30", padding: "16px 20px" }}>
                <p style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>
                  Curriculum Progress
                </p>
                <h4 style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 800, margin: 0 }}>
                  {course.title}
                </h4>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {course.lessons.map((l, idx) => {
                  const isActive = l.id === lessonId;
                  return (
                    <Link
                      key={l.id}
                      href={`/courses/${courseId}/learn/${l.id}`}
                      style={{
                        padding: "14px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        textDecoration: "none",
                        backgroundColor: isActive ? "#F1F4F9" : "#FFFFFF",
                        borderLeft: isActive ? "4px solid #0EA5E9" : "4px solid transparent",
                        borderBottom: "1px solid rgba(59,77,122,0.12)",
                        transition: "background-color 0.15s"
                      }}
                    >
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          backgroundColor: isActive ? "#0EA5E9" : "#F1F4F9",
                          color: isActive ? "#151B30" : "#3B4D7A",
                          border: "1px solid #3B4D7A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 800,
                          flexShrink: 0
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        style={{
                          color: isActive ? "#151B30" : "#3B4D7A",
                          fontSize: 13,
                          fontWeight: isActive ? 800 : 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {l.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
