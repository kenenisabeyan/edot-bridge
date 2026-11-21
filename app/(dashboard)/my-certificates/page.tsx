"use client";
import { useState } from "react";
import { mockCertificates } from "@/lib/mock-data/certificates";
import Link from "next/link";

interface Certificate {
  id: string;
  userId: string;
  skillName: string;
  score: number;
  issueDate: string;
  verificationId: string;
}

export default function MyCertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (cert: Certificate) => {
    const url = `${window.location.origin}/api/certificates/${cert.verificationId}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(cert.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintModal = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Print Styles for Certificate */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #FFFFFF !important;
          }
          nav, header, footer, aside, .no-print {
            display: none !important;
          }
          .cert-modal {
            position: static !important;
            box-shadow: none !important;
            padding: 0 !important;
            border: 2px solid #151B30 !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(14,165,233,0.1)", border: "1px solid #0EA5E9", borderRadius: 999, padding: "4px 14px", marginBottom: 12 }}>
          <span style={{ color: "#151B30", fontSize: 13, fontWeight: 800 }}>⚡ Cryptographically Verifiable Credentials</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#151B30] mb-1">My Certificates & Badges</h1>
        <p className="text-[#3B4D7A] font-medium">Your verified skill certifications, recognized and accepted by hiring partners across East Africa.</p>
      </div>

      {mockCertificates.length === 0 ? (
        <div className="text-center py-24 bg-[#FFFFFF] rounded-3xl border border-[#3B4D7A]/20 shadow-sm">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-xl font-extrabold text-[#151B30] mb-2">No certificates yet</h2>
          <p className="text-[#3B4D7A] font-medium text-sm max-w-sm mx-auto">
            Complete an assessment with a passing score to earn your first verified certificate.
          </p>
          <Link
            href="/assessments"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm"
          >
            Take an Assessment →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/25 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 bg-[#F1F4F9] border-2 border-[#F59E0B]"
                >
                  🎓
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#151B30]">{cert.skillName} Certified</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-sm text-[#3B4D7A] font-bold">
                      Exam Score: <span className="text-[#0EA5E9] font-black">{cert.score}%</span>
                    </span>
                    <span className="text-xs text-[#3B4D7A]/40">•</span>
                    <span className="text-xs text-[#3B4D7A] font-semibold">
                      Issued: {cert.issueDate}
                    </span>
                  </div>
                  <p className="text-xs text-[#3B4D7A] font-semibold mt-1 font-mono">
                    Verification ID: <span className="text-[#151B30] font-bold">{cert.verificationId}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleShare(cert)}
                  style={{
                    backgroundColor: copiedId === cert.id ? "#0EA5E9" : "#F1F4F9",
                    border: "1.5px solid #3B4D7A",
                    color: "#151B30",
                    borderRadius: 12,
                    padding: "10px 18px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {copiedId === cert.id ? "✓ Link Copied!" : "🔗 Share"}
                </button>
                <button
                  onClick={() => setSelectedCert(cert)}
                  style={{
                    backgroundColor: "#151B30",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: 12,
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                >
                  📜 View & Print
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Certificate Modal */}
      {selectedCert && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(21,27,48,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
          }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="cert-modal"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              border: "3px solid #151B30",
              maxWidth: 720,
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header Actions */}
            <div
              className="no-print"
              style={{
                backgroundColor: "#151B30",
                padding: "14px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ color: "#0EA5E9", fontSize: 13, fontWeight: 800 }}>
                Official SkillBridge Verification Document
              </span>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  onClick={handlePrintModal}
                  style={{
                    backgroundColor: "#F59E0B",
                    color: "#151B30",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                >
                  🖨️ Print / Download PDF
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: 18,
                    cursor: "pointer",
                    fontWeight: 800
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Certificate Paper */}
            <div style={{ padding: "48px 44px", textAlign: "center", border: "12px solid #F1F4F9", margin: 16, borderRadius: 16 }}>
              {/* Emblem */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "#151B30",
                  color: "#F59E0B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  margin: "0 auto 20px",
                  border: "3px solid #F59E0B"
                }}
              >
                🏆
              </div>

              <h2 style={{ color: "#3B4D7A", fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 6px" }}>
                SkillBridge Global Education & Verification
              </h2>

              <h1 style={{ color: "#151B30", fontSize: 28, fontWeight: 900, margin: "0 0 16px" }}>
                Certificate of Technical Mastery
              </h1>

              <p style={{ color: "#3B4D7A", fontSize: 14, margin: "0 0 8px" }}>
                This is proudly presented to certify that
              </p>

              <h3 style={{ color: "#151B30", fontSize: 24, fontWeight: 900, textDecoration: "underline", textDecorationColor: "#0EA5E9", textUnderlineOffset: 6, margin: "0 0 16px" }}>
                Kenenisa Beyan
              </h3>

              <p style={{ color: "#151B30", fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 28px" }}>
                has successfully passed the verified assessment in <strong>{selectedCert.skillName}</strong> with an outstanding score of <strong>{selectedCert.score}%</strong>.
              </p>

              {/* Signature / Metadata Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, borderTop: "1.5px solid #3B4D7A", paddingTop: 24, maxWidth: 520, margin: "0 auto" }}>
                <div>
                  <p style={{ color: "#151B30", fontSize: 14, fontWeight: 800, margin: "0 0 2px" }}>
                    Dr. Dawit Haile
                  </p>
                  <p style={{ color: "#3B4D7A", fontSize: 12, margin: 0 }}>
                    Director of Technical Curriculum
                  </p>
                </div>
                <div>
                  <p style={{ color: "#0EA5E9", fontSize: 13, fontWeight: 800, fontFamily: "monospace", margin: "0 0 2px" }}>
                    {selectedCert.verificationId}
                  </p>
                  <p style={{ color: "#3B4D7A", fontSize: 12, margin: 0 }}>
                    Issued on {selectedCert.issueDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
