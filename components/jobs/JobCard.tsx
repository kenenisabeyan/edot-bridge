"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/mock-data/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{job.company} • {job.location} • {job.type}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{job.description.slice(0, 120)}...</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.requiredSkills.map(skill => (
            <span key={skill} className="bg-muted px-2 py-0.5 rounded text-xs">{skill}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}