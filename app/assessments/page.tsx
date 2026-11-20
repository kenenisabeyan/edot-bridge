import Link from "next/link";
import { mockAssessments } from "@/lib/mock-data/assessments";
import { Button } from "@/components/ui/button";

export default function AssessmentsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl bg-[#FFFFFF]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#151B30] mb-2">Skill Assessments</h1>
        <p className="text-lg text-[#3B4D7A] font-medium">Validate your expertise with proctored, verifiable skill assessments accepted by employers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAssessments.map(assessment => (
          <div
            key={assessment.id}
            className="rounded-2xl p-7 flex flex-col justify-between shadow-md"
            style={{ background: "#151B30", border: "1px solid rgba(59, 77, 122, 0.4)" }}
          >
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-2">{assessment.title}</h3>
              <p className="text-sm text-[#F1F4F9] mb-6 leading-relaxed font-medium">{assessment.description}</p>
              <div className="flex items-center gap-3 text-xs font-bold text-white mb-6">
                <span className="bg-[#3B4D7A]/40 border border-[#3B4D7A] px-3.5 py-1.5 rounded-full">{assessment.questions.length} questions</span>
                <span className="bg-[#3B4D7A]/40 border border-[#3B4D7A] px-3.5 py-1.5 rounded-full">Pass score: {assessment.passingScore}%</span>
              </div>
            </div>
            <div>
              <Button asChild className="rounded-lg px-6 py-2.5 font-bold bg-[#FFFFFF] text-[#151B30] hover:bg-[#F1F4F9] transition-colors shadow-sm">
                <Link href={`/assessments/${assessment.id}`}>Start Assessment →</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
