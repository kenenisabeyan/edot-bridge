import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { lessons: { orderBy: { order: "asc" } } }
  });
  return NextResponse.json(courses);
}