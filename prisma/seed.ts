import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data (optional)
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.job.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.user.deleteMany();

  // Demo student user
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      email: "student@skillbridge.com",
      name: "Demo Student",
      password: hashedPassword,
      role: "STUDENT",
      studentProfile: {
        create: {
          bio: "Learning full-stack development",
          location: "Addis Ababa",
          skills: ["React", "JavaScript", "Tailwind"]
        }
      }
    }
  });

  // Course with lessons
  await prisma.course.create({
    data: {
      title: "Frontend Development with React",
      description: "Learn React, Tailwind, TypeScript.",
      language: "en",
      lessons: {
        create: [
          { title: "Introduction to React", content: "React is a library for building UIs.", order: 1, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
          { title: "Components & Props", content: "Components are reusable pieces.", order: 2, videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0" }
        ]
      }
    }
  });

  // A job (requires employer profile - simplified with placeholder employerId)
  await prisma.job.create({
    data: {
      employerId: "placeholder", // you must replace with actual employer ID after creating employer user
      title: "Frontend Developer",
      description: "Join our team to build amazing web apps.",
      location: "Addis Ababa",
      type: "FULL_TIME",
      requiredSkills: ["React", "TypeScript", "Tailwind"],
      isActive: true
    }
  });

  // Assessment
  await prisma.assessment.create({
    data: {
      title: "React Fundamentals",
      description: "Test your React knowledge",
      passingScore: 70,
      questions: {
        create: [
          {
            text: "What is React?",
            type: "MULTIPLE_CHOICE",
            options: [
              { text: "A backend framework", isCorrect: false },
              { text: "A JavaScript library for UIs", isCorrect: true },
              { text: "A database", isCorrect: false }
            ],
            points: 10,
            order: 1
          }
        ]
      }
    }
  });

  console.log("✅ Database seeded");
}

main().catch(console.error).finally(() => prisma.$disconnect());