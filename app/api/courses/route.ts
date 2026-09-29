import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { mockCourses } from "@/lib/mock-data/courses";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: { lessons: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json(courses);
  } catch (err) {
    console.warn("[/api/courses] DB unavailable, falling back to mock data:", err);
    return NextResponse.json(mockCourses);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        language: data.language ?? "en",
      },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (err) {
    console.error("[/api/courses POST]", err);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}