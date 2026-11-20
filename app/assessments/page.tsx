import Link from "next/link";
import { mockAssessments } from "@/lib/mock-data/assessments";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AssessmentsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">Skill Assessments</h1>
        <p className="text-lg text-[#8C95A6]">Validate your expertise with proctored, verifiable skill assessments accepted by employers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAssessments.map(assessment => (
          <div
            key={assessment.id}
            className="card-glow rounded-2xl p-7 flex flex-col justify-between"
            style={{ background: "#161B26", border: "1px solid #1C202C" }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{assessment.title}</h3>
              <p className="text-sm text-[#8C95A6] mb-6 leading-relaxed">{assessment.description}</p>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-300 mb-6">
                <span className="bg-[#0D1016] border border-[#2C344A] px-3.5 py-1.5 rounded-full">{assessment.questions.length} questions</span>
                <span className="bg-[#0D1016] border border-[#2C344A] px-3.5 py-1.5 rounded-full">Pass score: {assessment.passingScore}%</span>
              </div>
            </div>
            <div>
              <Button asChild className="rounded-lg px-6 py-2.5 font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-sm">
                <Link href={`/assessments/${assessment.id}`}>Start Assessment →</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}