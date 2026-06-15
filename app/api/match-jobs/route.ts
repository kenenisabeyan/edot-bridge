import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { studentProfile: true, certificates: true }
  });
  if (!user?.studentProfile) return NextResponse.json([]);

  const userSkills = user.studentProfile.skills;
  const jobs = await prisma.job.findMany({ where: { isActive: true } });

  const matched = jobs.map(job => {
    const required = job.requiredSkills;
    const matchedSkills = userSkills.filter(skill => required.includes(skill));
    const score = required.length ? Math.round((matchedSkills.length / required.length) * 100) : 0;
    return { ...job, matchScore: score };
  }).sort((a,b) => b.matchScore - a.matchScore);

  return NextResponse.json(matched);
}