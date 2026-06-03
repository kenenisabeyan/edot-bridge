import { notFound } from "next/navigation";
import { mockJobs } from "@/lib/mock-data/jobs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = mockJobs.find(j => j.id === jobId);
  if (!job) return notFound();

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/jobs">← Back to Jobs</Link>
      </Button>
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-muted-foreground">{job.company} • {job.location} • {job.type}</p>
      <div className="mt-4 border-t pt-4">
        <h2 className="font-semibold">Description</h2>
        <p className="mt-2">{job.description}</p>
        <h2 className="font-semibold mt-4">Required Skills</h2>
        <div className="flex gap-2 mt-1">
          {job.requiredSkills.map(s => <span key={s} className="bg-muted px-2 py-1 rounded">{s}</span>)}
        </div>
        <Button className="mt-6 w-full">Apply Now (Mock)</Button>
      </div>
    </div>
  );
}