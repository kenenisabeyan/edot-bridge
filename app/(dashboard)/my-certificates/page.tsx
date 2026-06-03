"use client";
import { mockCertificates } from "@/lib/mock-data/certificates";

export default function MyCertificatesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Certificates</h1>
      {mockCertificates.length === 0 ? (
        <p>No certificates yet. Complete an assessment to earn one.</p>
      ) : (
        <div className="space-y-4">
          {mockCertificates.map(cert => (
            <div key={cert.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{cert.skillName} Certification</p>
                <p className="text-sm text-muted-foreground">Score: {cert.score}%</p>
                <p className="text-xs">Verification ID: {cert.verificationId}</p>
              </div>
              <button className="text-primary text-sm">View PDF</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}