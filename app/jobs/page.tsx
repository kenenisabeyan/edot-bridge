"use client";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/jobs/JobCard";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("/api/jobs").then(res => res.json()).then(setJobs);
  }, []);
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">Find Jobs</h1>
        <p className="text-lg text-[#8C95A6]">AI-matched career opportunities with verified employers across Africa and beyond.</p>
      </div>
      <div className="space-y-4">{jobs.map(job => <JobCard key={job.id} job={job} />)}</div>
    </div>
  );
}