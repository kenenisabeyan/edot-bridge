import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ verificationId: string }> }) {
  const { verificationId } = await params;
  const cert = await prisma.certificate.findUnique({
    where: { verificationId },
    include: { user: true, assessment: true }
  });
  if (!cert) return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  return NextResponse.json({
    name: cert.user.name,
    skill: cert.assessment.title,
    score: cert.assessmentResult?.score || 0,
    issuedAt: cert.issuedAt
  });
}