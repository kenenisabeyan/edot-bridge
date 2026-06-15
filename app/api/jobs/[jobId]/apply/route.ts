import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobId } = await params;
  const { coverLetter } = await req.json();

  const existing = await prisma.jobApplication.findFirst({
    where: { jobId, userId: session.user.id }
  });
  if (existing) return NextResponse.json({ error: "Already applied" }, { status: 400 });

  const application = await prisma.jobApplication.create({
    data: {
      jobId,
      userId: session.user.id,
      coverLetter,
      status: "PENDING"
    }
  });
  return NextResponse.json(application, { status: 201 });
}