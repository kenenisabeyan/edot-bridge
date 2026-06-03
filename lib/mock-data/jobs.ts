export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  requiredSkills: string[];
  description: string;
  salaryMin?: number;
  salaryMax?: number;
  postedAt: string;
}

export const mockJobs: Job[] = [
  {
    id: "job1",
    title: "Frontend Developer",
    company: "TechCorp Ethiopia",
    location: "Addis Ababa",
    type: "full-time",
    requiredSkills: ["React", "TypeScript", "Tailwind"],
    description: "Build responsive web applications using React and Next.js.",
    salaryMin: 30000,
    salaryMax: 50000,
    postedAt: "2026-06-01"
  },
  {
    id: "job2",
    title: "Data Analyst",
    company: "DataSolve",
    location: "Remote",
    type: "remote",
    requiredSkills: ["Python", "Pandas", "SQL"],
    description: "Analyze data and create dashboards.",
    salaryMin: 40000,
    salaryMax: 60000,
    postedAt: "2026-06-02"
  },
  {
    id: "job3",
    title: "Full Stack Developer",
    company: "Innovate Hub",
    location: "Addis Ababa",
    type: "full-time",
    requiredSkills: ["React", "Node.js", "PostgreSQL"],
    description: "Develop full-stack applications for local and international clients.",
    salaryMin: 45000,
    salaryMax: 70000,
    postedAt: "2026-06-03"
  }
];