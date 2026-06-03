export interface Certificate {
  id: string;
  userId: string;
  assessmentId: string;
  skillName: string;
  score: number;
  issuedAt: string;
  verificationId: string;
}

export const mockCertificates: Certificate[] = [
  {
    id: "cert1",
    userId: "user1",
    assessmentId: "assess-1",
    skillName: "React",
    score: 85,
    issuedAt: "2026-05-15",
    verificationId: "ver_abc123"
  }
];