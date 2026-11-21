"use client";
import { notFound, useRouter } from "next/navigation";
import { mockAssessments } from "@/lib/mock-data/assessments";
import { Quiz } from "@/components/assessments/Quiz";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ReviewItem {
  question: string;
  chosen: string;
  correct: string;
  isCorrect: boolean;
}

export default function AssessmentPage({ params }: { params: Promise<{ assessmentId: string }> }) {
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [result, setResult] = useState<{ score: number; passed: boolean; review: ReviewItem[] } | null>(null);
  const [showReview, setShowReview] = useState(false);
  const router = useRouter();

  params.then(p => setAssessmentId(p.assessmentId));
  const assessment = assessmentId ? mockAssessments.find(a => a.id === assessmentId) : null;

  if (assessmentId && !assessment) return notFound();
  if (!assessment) return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#3B4D7A", fontSize: 16, fontWeight: 700 }}>Loading assessment environment...</p>
      </div>
    </div>
  );

  if (result) {
    const certCode = `SB-${assessment.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
      <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Result Card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              border: "1.5px solid #3B4D7A",
              boxShadow: "0 10px 40px rgba(21,27,48,0.08)",
              padding: "44px 36px",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 16 }}>{result.passed ? "🏆" : "📚"}</div>

            <h1 style={{ color: "#151B30", fontSize: 30, fontWeight: 800, margin: "0 0 8px" }}>
              {result.passed ? "Assessment Passed!" : "Assessment Completed"}
            </h1>

            <p style={{ color: "#3B4D7A", fontSize: 15, margin: "0 0 28px" }}>
              {result.passed
                ? `Congratulations! You scored above the ${assessment.passingScore}% passing threshold.`
                : `You scored ${result.score}%. The passing threshold is ${assessment.passingScore}%.`}
            </p>

            {/* Score Ring */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  border: `8px solid ${result.passed ? "#F59E0B" : "#3B4D7A"}`,
                  backgroundColor: "#F1F4F9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(21,27,48,0.06)"
                }}
              >
                <span style={{ color: result.passed ? "#F59E0B" : "#151B30", fontSize: 36, fontWeight: 900 }}>
                  {result.score}%
                </span>
                <span style={{ color: "#3B4D7A", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>
                  Score
                </span>
              </div>
            </div>

            {/* Certificate Credential Badge */}
            {result.passed && (
              <div
                style={{
                  backgroundColor: "#151B30",
                  borderRadius: 16,
                  padding: "20px 24px",
                  marginBottom: 32,
                  textAlign: "left"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ color: "#F59E0B", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    ✓ Verified Digital Credential
                  </span>
                  <span style={{ color: "#0EA5E9", fontWeight: 700, fontSize: 12 }}>
                    ID: {certCode}
                  </span>
                </div>
                <p style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>
                  {assessment.title}
                </p>
                <p style={{ color: "#F1F4F9", fontSize: 13, margin: 0, opacity: 0.8 }}>
                  Issued by SkillBridge Certification Authority • Verified on portfolio
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              {result.passed ? (
                <Button asChild className="rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm px-6 py-3">
                  <Link href="/my-certificates">View in My Certificates 🎓</Link>
                </Button>
              ) : (
                <button
                  onClick={() => setResult(null)}
                  style={{
                    backgroundColor: "#F59E0B",
                    color: "#151B30",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px 24px",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer"
                  }}
                >
                  🔄 Retake Assessment
                </button>
              )}

              <button
                onClick={() => setShowReview(!showReview)}
                style={{
                  backgroundColor: "#F1F4F9",
                  border: "1.5px solid #3B4D7A",
                  color: "#151B30",
                  borderRadius: 12,
                  padding: "12px 20px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer"
                }}
              >
                {showReview ? "Hide Answer Breakdown" : "Review Answers 🔍"}
              </button>
            </div>

            {/* Detailed Answer Review */}
            {showReview && (
              <div style={{ marginTop: 28, textAlign: "left", display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ color: "#151B30", fontSize: 17, fontWeight: 800, margin: "0 0 8px" }}>
                  Question-by-Question Breakdown
                </h3>
                {result.review.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#F1F4F9",
                      borderRadius: 12,
                      border: `1.5px solid ${item.isCorrect ? "#0EA5E9" : "#3B4D7A"}`,
                      padding: "16px 18px"
                    }}
                  >
                    <p style={{ color: "#151B30", fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>
                      {idx + 1}. {item.question}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
                      <p style={{ margin: 0, color: item.isCorrect ? "#151B30" : "#3B4D7A" }}>
                        <strong>Your answer:</strong> {item.chosen} {item.isCorrect ? "✅" : "❌"}
                      </p>
                      {!item.isCorrect && (
                        <p style={{ margin: 0, color: "#0EA5E9", fontWeight: 700 }}>
                          <strong>Correct answer:</strong> {item.correct}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 64px" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#151B30", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link
            href="/assessments"
            style={{
              color: "#0EA5E9",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16
            }}
          >
            ← Back to Assessments
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
            <span
              style={{
                backgroundColor: "#F59E0B",
                color: "#151B30",
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 800
              }}
            >
              Passing Score: {assessment.passingScore}%
            </span>
            <span style={{ color: "#F1F4F9", fontSize: 13, opacity: 0.8 }}>
              {assessment.questions.length} Questions • Verified Credential
            </span>
          </div>
          <h1 style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>
            {assessment.title}
          </h1>
          <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.85 }}>
            {assessment.description}
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px 0" }}>
        <Quiz
          assessment={assessment}
          onComplete={(score, passed, review) => setResult({ score, passed, review })}
        />
      </div>
    </div>
  );
}
