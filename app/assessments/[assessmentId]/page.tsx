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

  // Unwrap params (Next.js 15 async)
  params.then(p => setAssessmentId(p.assessmentId));
  const assessment = assessmentId ? mockAssessments.find(a => a.id === assessmentId) : null;

  if (assessmentId && !assessment) return notFound();
  if (!assessment) return <div className="p-8">Loading...</div>;

  const handleComplete = (score: number, passed: boolean) => {
    setResult({ score, passed });
  };

  if (result) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl text-center">
        <h1 className="text-2xl font-bold">Assessment Complete</h1>
        <p className="mt-4 text-xl">Your score: {result.score}%</p>
        <p className={result.passed ? "text-green-600" : "text-red-600"}>
          {result.passed ? "🎉 Passed! You've earned a certificate." : "❌ Not passed. Try again."}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button asChild>
            <Link href="/certificates">View Certificates</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/assessments">Try Another</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">{assessment.title}</h1>
      <p className="text-muted-foreground mb-6">{assessment.description}</p>
      <Quiz assessment={assessment} onComplete={handleComplete} />
    </div>
  );
}