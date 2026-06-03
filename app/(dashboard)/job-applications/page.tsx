"use client";
import { mockJobs } from "@/lib/mock-data/jobs";

export default function JobApplicationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      <div className="space-y-4">
        {mockJobs.slice(0, 2).map(job => (
          <div key={job.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{job.title} at {job.company}</h3>
            <p className="text-sm text-muted-foreground">Status: Pending Review</p>
          </div>
        ))}
        <p className="text-muted-foreground">Applications are mock for now – real matching coming soon.</p>
      </div>
    </div>
  );
}