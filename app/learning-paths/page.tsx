import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const paths = [
  { id: "frontend", title: "Frontend Developer Path", description: "Become a professional frontend developer", courses: 4, duration: "8 weeks" },
  { id: "data", title: "Data Analyst Path", description: "Master data analysis with Python", courses: 5, duration: "10 weeks" },
  { id: "fullstack", title: "Full Stack Path", description: "Build complete web applications", courses: 6, duration: "12 weeks" },
];

export default function LearningPathsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
      <p className="text-muted-foreground mb-8">Structured curriculums to take you from beginner to job‑ready.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map(path => (
          <Card key={path.id}>
            <CardHeader>
              <CardTitle>{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{path.courses} courses • {path.duration}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/learning-paths/${path.id}`}>View Path</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}