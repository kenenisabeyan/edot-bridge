import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { mockJobs } from "@/lib/mock-data/jobs";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
    if (jobs && jobs.length > 0) return NextResponse.json(jobs);
    return NextResponse.json(mockJobs);
  } catch (error) {
    console.error("Jobs API fallback to mock data:", error);
    return NextResponse.json(mockJobs);
  }
}

export async function POST(req: Request) {
  try {
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
  } catch (error) {
    console.error("Job POST error:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}