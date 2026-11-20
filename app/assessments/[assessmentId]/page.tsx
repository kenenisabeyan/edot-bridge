"use client";
import { notFound, useRouter } from "next/navigation";
import { mockAssessments } from "@/lib/mock-data/assessments";
import { Quiz } from "@/components/assessments/Quiz";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AssessmentPage({ params }: { params: Promise<{ assessmentId: string }> }) {
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const router = useRouter();

  params.then(p => setAssessmentId(p.assessmentId));
  const assessment = assessmentId ? mockAssessments.find(a => a.id === assessmentId) : null;

  if (assessmentId && !assessment) return notFound();
  if (!assessment) return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-[#F1F4F9] rounded-xl w-2/3" />
        <div className="h-4 bg-[#F1F4F9] rounded-xl w-full" />
        <div className="h-64 bg-[#F1F4F9] rounded-2xl" />
      </div>
    </div>
  );

  if (result) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-xl text-center bg-[#FFFFFF] min-h-screen">
        {/* Result card */}
        <div className="rounded-3xl bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-lg p-10">
          <div className="text-6xl mb-4">{result.passed ? "🎉" : "💪"}</div>
          <h1 className="text-3xl font-extrabold text-[#151B30] mb-2">Assessment Complete</h1>

          {/* Score ring */}
          <div className="my-8 flex justify-center">
            <div
              className="w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center shadow-md"
              style={{
                borderColor: result.passed ? "#F59E0B" : "#3B4D7A",
                background: result.passed ? "rgba(245,158,11,0.08)" : "#FFFFFF",
              }}
            >
              <span className="text-3xl font-black" style={{ color: result.passed ? "#F59E0B" : "#151B30" }}>
                {result.score}%
              </span>
              <span className="text-xs font-bold text-[#3B4D7A]">Score</span>
            </div>
          </div>

          <p className="text-lg font-extrabold mb-1" style={{ color: result.passed ? "#0EA5E9" : "#151B30" }}>
            {result.passed ? "🏆 Passed! Certificate earned." : "Not quite there yet."}
          </p>
          <p className="text-sm text-[#3B4D7A] font-medium mb-8">
            {result.passed
              ? "Your verified certificate has been issued and added to your portfolio."
              : `You needed ${assessment.passingScore}% to pass. Keep practicing!`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm px-6 py-3">
              <Link href="/my-certificates">View Certificate</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl font-bold border-[#3B4D7A] bg-[#FFFFFF] text-[#151B30] hover:bg-[#3B4D7A] hover:text-[#FFFFFF] px-6 py-3">
              <Link href="/assessments">Try Another</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl bg-[#FFFFFF] min-h-screen">
      {/* Back + header */}
      <Link href="/assessments" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B4D7A] hover:text-[#151B30] mb-6 transition-colors">
        ← Back to Assessments
      </Link>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#F1F4F9] border border-[#3B4D7A]/30 text-[#151B30] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          {assessment.questions.length} Questions · Pass: {assessment.passingScore}%
        </div>
        <h1 className="text-3xl font-extrabold text-[#151B30] mb-2">{assessment.title}</h1>
        <p className="text-[#3B4D7A] font-medium">{assessment.description}</p>
      </div>
      <Quiz assessment={assessment} onComplete={(score, passed) => setResult({ score, passed })} />
    </div>
  );
}
