import Link from "next/link";
import { mockAssessments } from "@/lib/mock-data/assessments";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AssessmentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Skill Assessments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAssessments.map(assessment => (
          <Card key={assessment.id}>
            <CardHeader>
              <CardTitle>{assessment.title}</CardTitle>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{assessment.questions.length} questions</p>
              <p className="text-sm">Passing score: {assessment.passingScore}%</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/assessments/${assessment.id}`}>Start Assessment</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}