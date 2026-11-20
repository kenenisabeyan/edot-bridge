"use client";
import { mockCertificates } from "@/lib/mock-data/certificates";

export default function MyCertificatesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#151B30] mb-1">My Certificates</h1>
        <p className="text-[#3B4D7A] font-medium">Your verified skill certifications, accepted by top employers.</p>
      </div>

      {mockCertificates.length === 0 ? (
        <div className="text-center py-24 bg-[#FFFFFF] rounded-3xl border border-[#3B4D7A]/20 shadow-sm">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-xl font-extrabold text-[#151B30] mb-2">No certificates yet</h2>
          <p className="text-[#3B4D7A] font-medium text-sm max-w-sm mx-auto">
            Complete an assessment with a passing score to earn your first verified certificate.
          </p>
          <a
            href="/assessments"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm"
          >
            Take an Assessment →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#F59E0B]/15 border border-[#F59E0B]/30"
                >
                  🏆
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#151B30]">{cert.skillName} Certification</h3>
                  <p className="text-sm text-[#3B4D7A] font-semibold mt-0.5">
                    Score:{" "}
                    <span className="text-[#0EA5E9] font-black">{cert.score}%</span>
                  </p>
                  <p className="text-xs text-[#3B4D7A] font-medium mt-1 font-mono">
                    Verification ID: <span className="text-[#151B30] font-bold">{cert.verificationId}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-4 py-2 rounded-xl text-sm font-bold bg-[#F1F4F9] border border-[#3B4D7A]/25 text-[#151B30] hover:bg-[#3B4D7A]/10 transition-colors cursor-pointer">
                  Share
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-bold bg-[#151B30] text-[#FFFFFF] hover:bg-[#3B4D7A] transition-colors cursor-pointer">
                  View PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
