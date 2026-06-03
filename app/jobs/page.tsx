import { JobCard } from "@/components/jobs/JobCard";
import { mockJobs } from "@/lib/mock-data/jobs";

export default function JobsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find Jobs</h1>
      <div className="space-y-4">
        {mockJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}