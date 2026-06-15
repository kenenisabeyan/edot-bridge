import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ assessmentId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { assessmentId } = await params;
  const { answers } = await req.json(); // answers: { questionId: selectedOptionText }

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { questions: true }
  });
  if (!assessment) return NextResponse.json({ error: "Assessment not found" }, { status: 404 });

  let totalPoints = 0;
  let earnedPoints = 0;
  for (const q of assessment.questions) {
    totalPoints += q.points;
    const userAnswer = answers[q.id];
    const correctOption = (q.options as any[]).find((opt: any) => opt.isCorrect);
    if (correctOption && userAnswer === correctOption.text) {
      earnedPoints += q.points;
    }
  }
  const score = Math.round((earnedPoints / totalPoints) * 100);
  const passed = score >= assessment.passingScore;

  const result = await prisma.assessmentResult.create({
    data: {
      userId: session.user.id,
      assessmentId,
      score,
      passed,
      skillsTagged: [] // optional: extract from assessment
    }
  });

  if (passed) {
    await prisma.certificate.create({
      data: {
        userId: session.user.id,
        assessmentId,
        certificateUrl: "",
        verificationId: `ver_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`
      }
    });
  }

  return NextResponse.json({ score, passed, resultId: result.id });
}