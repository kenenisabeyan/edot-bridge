export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "employer" | "admin";
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
}

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Kenenisa Beyan",
    email: "kenenisa@skillbridge.com",
    role: "student",
    bio: "Aspiring full-stack developer passionate about edtech.",
    location: "Addis Ababa, Ethiopia",
    skills: ["React", "Next.js", "TypeScript", "Node.js"]
  },
  {
    id: "employer1",
    name: "Abebe Kebede",
    email: "abebe@techcorp.com",
    role: "employer",
    company: "TechCorp Ethiopia"
  }
];