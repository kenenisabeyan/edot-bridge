import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const employer = await prisma.employerProfile.findUnique({ where: { userId: session.user.id } });
  if (!employer) return NextResponse.json({ error: "Employer profile not found" }, { status: 400 });

  const job = await prisma.job.create({
    data: {
      employerId: employer.id,
      title: data.title,
      description: data.description,
      location: data.location,
      type: data.type,
      requiredSkills: data.requiredSkills,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      isActive: true
    }
  });
  return NextResponse.json(job, { status: 201 });
}