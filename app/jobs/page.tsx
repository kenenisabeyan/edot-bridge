"use client";

import { useJobs } from "@/hooks/usePernApi";
import { JobCard } from "@/components/jobs/JobCard";

export default function JobsPage() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading job opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block max-w-md">
          <p className="font-semibold">Unable to load jobs</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career & Job Board</h1>
          <p className="text-gray-600 mt-1">Discover full-time, contract, and remote software engineering positions.</p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
          PostgreSQL Matcher Connected
        </span>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No job postings available right now.</p>
          <p className="text-sm text-gray-400 mt-1">Run `npm run db:seed` to add demo job listings.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}