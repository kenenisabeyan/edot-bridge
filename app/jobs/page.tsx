"use client";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/jobs/JobCard";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("/api/jobs").then(res => res.json()).then(setJobs);
  }, []);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Find Jobs</h1>
      <div className="space-y-4">{jobs.map(job => <JobCard key={job.id} job={job} />)}</div>
    </div>
  );
}