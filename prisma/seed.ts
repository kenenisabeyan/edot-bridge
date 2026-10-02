import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Starting PERN database seed...");

  // Clean existing data
  await prisma.jobApplication.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.assessmentResult.deleteMany();
  await prisma.question.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.lessonTranslation.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.enrolledCourse.deleteMany();
  await prisma.course.deleteMany();
  await prisma.job.deleteMany();
  await prisma.employerProfile.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create Demo Student User
  const student = await prisma.user.create({
    data: {
      email: "student@edotbridge.com",
      name: "Abebe Bikila",
      password: hashedPassword,
      role: "STUDENT",
      studentProfile: {
        create: {
          bio: "Passionate full-stack developer eager to learn cloud and web technologies.",
          location: "Addis Ababa, Ethiopia",
          skills: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
          github: "https://github.com/abebe-bikila",
          linkedin: "https://linkedin.com/in/abebe-bikila",
        },
      },
      portfolio: {
        create: {
          slug: "abebe-bikila",
          bio: "Full Stack Engineer specializing in PERN stack web applications.",
          projects: [
            {
              title: "Edot Bridge Platform",
              description: "Empowering students with online courses and job matching.",
              tags: ["React", "Express", "PostgreSQL"],
            },
          ],
        },
      },
    },
  });

  // 2. Create Demo Employer User
  const employerUser = await prisma.user.create({
    data: {
      email: "recruiter@techhub.et",
      name: "TechHub Recruiting",
      password: hashedPassword,
      role: "EMPLOYER",
      employerProfile: {
        create: {
          companyName: "TechHub Ethiopia",
          website: "https://techhub.et",
          location: "Addis Ababa",
          about: "Leading technology firm pioneering software solutions in East Africa.",
          verified: true,
        },
      },
    },
    include: { employerProfile: true },
  });

  // 3. Create Sample Job Postings
  if (employerUser.employerProfile) {
    await prisma.job.create({
      data: {
        employerId: employerUser.employerProfile.id,
        title: "Full-Stack PERN Developer",
        description: "We are seeking a skilled full-stack developer with experience in PostgreSQL, Express, React, and Node.js.",
        location: "Addis Ababa (Hybrid)",
        type: "FULL_TIME",
        requiredSkills: ["React", "Express", "PostgreSQL", "TypeScript"],
        experienceMin: 2,
        salaryMin: 35000,
        salaryMax: 55000,
        currency: "ETB",
        isActive: true,
      },
    });

    await prisma.job.create({
      data: {
        employerId: employerUser.employerProfile.id,
        title: "React Frontend Engineer",
        description: "Join our fast-paced product team building interactive web interfaces.",
        location: "Remote",
        type: "REMOTE",
        requiredSkills: ["React", "Tailwind CSS", "JavaScript"],
        experienceMin: 1,
        salaryMin: 25000,
        salaryMax: 40000,
        currency: "ETB",
        isActive: true,
      },
    });
  }

  // 4. Create Sample Course with Lessons
  const course = await prisma.course.create({
    data: {
      title: "Mastering the PERN Stack",
      description: "Comprehensive guide to building enterprise applications with PostgreSQL, Express, React, and Node.js.",
      language: "en",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      lessons: {
        create: [
          {
            title: "Module 1: PostgreSQL & Database Schema Design",
            content: "Learn relational modeling, table relations, indexes, and Prisma ORM integration.",
            order: 1,
            videoUrl: "https://www.youtube.com/watch?v=qw--VYLpxG4",
          },
          {
            title: "Module 2: Building Express.js RESTful APIs",
            content: "Set up middleware, authentication routes, and error handling in Node.js.",
            order: 2,
            videoUrl: "https://www.youtube.com/watch?v=7H_28e0Zg4k",
          },
        ],
      },
    },
  });

  // 5. Create Assessment with Questions
  await prisma.assessment.create({
    data: {
      courseId: course.id,
      title: "PERN Stack Fundamentals Certification",
      description: "Test your proficiency in Express routing, PostgreSQL queries, and React state management.",
      passingScore: 70,
      questions: {
        create: [
          {
            text: "What does PERN stack stand for?",
            type: "MULTIPLE_CHOICE",
            options: {
              optionsList: [
                "Python, Express, React, Node",
                "PostgreSQL, Express, React, Node",
                "PostgreSQL, Electron, Ruby, Next",
              ],
              correctAnswer: "PostgreSQL, Express, React, Node",
            },
            points: 50,
            order: 1,
          },
          {
            text: "Which command starts the Express backend server in this project?",
            type: "MULTIPLE_CHOICE",
            options: {
              optionsList: ["npm run dev", "npm run server:dev", "npm run start"],
              correctAnswer: "npm run server:dev",
            },
            points: 50,
            order: 2,
          },
        ],
      },
    },
  });

  console.log("✅ PERN Database successfully seeded!");
  console.log("👤 Demo Student: student@edotbridge.com / password123");
  console.log("🏢 Demo Employer: recruiter@techhub.et / password123");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });