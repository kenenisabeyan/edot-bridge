import Link from "next/link";
import { mockAssessments } from "@/lib/mock-data/assessments";
import { Button } from "@/components/ui/button";

export default function AssessmentsPage() {
  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#192038] to-[#151B30] border-b border-[#3B4D7A]/40 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                <span>Proctored Testing Ground</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                Skill Assessments & Certification.
              </h1>
              <p className="text-sm sm:text-base text-[#F1F4F9]/80 max-w-2xl font-medium leading-relaxed">
                Validate real-world technical competency. Passing an assessment issues an immutable cryptographic certificate recognized by 200+ partner companies.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-[#151B30] border border-[#3B4D7A] text-center shadow-inner">
                <span className="block text-2xl font-black text-[#F59E0B]">1,200+</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Certs Issued</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#151B30] border border-[#3B4D7A] text-center shadow-inner">
                <span className="block text-2xl font-black text-[#0EA5E9]">80%</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Pass Threshold</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssessments.map((assessment) => (
            <div
              key={assessment.id}
              className="master-card rounded-2xl p-7 flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#0EA5E9]/15 border border-[#0EA5E9]/40 text-[#0EA5E9]">
                    PROCTORED
                  </span>
                  <span className="text-xs text-[#F59E0B] font-bold">
                    Min Score: {assessment.passingScore}%
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-extrabold text-white mb-2 leading-snug group-hover:text-[#0EA5E9] transition-colors">
                  {assessment.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#F1F4F9]/80 mb-6 leading-relaxed">
                  {assessment.description}
                </p>

                {/* Meta details */}
                <div className="flex flex-wrap gap-2 mb-6 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-white font-bold">
                    📝 {assessment.questions.length} Questions
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-white font-bold">
                    ⏱️ 30 Minutes
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#151B30] border border-[#3B4D7A] text-[#10B981] font-bold">
                    🛡️ Public Credential
                  </span>
                </div>
              </div>

              <div>
                <Button asChild className="btn-amber-cta w-full py-3.5 rounded-xl text-xs font-black shadow-md border-none">
                  <Link href={`/assessments/${assessment.id}`} className="flex items-center justify-center gap-2">
                    <span>Begin Assessment</span>
                    <span>→</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
