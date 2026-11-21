"use client";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import { mockJobs, Job } from "@/lib/mock-data/jobs";

const availableFilterSkills = ["All", "React", "TypeScript", "Python", "SQL", "Node.js", "PostgreSQL", "Tailwind"];
const jobTypes = ["All", "Full-time", "Remote", "Part-time", "Contract"];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "salary">("newest");

  useEffect(() => {
    fetch("/api/jobs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
      })
      .catch(() => {
        setJobs(mockJobs);
      });
  }, []);

  // Filter & Sort logic
  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "All" || job.type.toLowerCase() === selectedType.toLowerCase();

      const matchesSkill =
        selectedSkill === "All" ||
        job.requiredSkills.some(s => s.toLowerCase() === selectedSkill.toLowerCase());

      return matchesSearch && matchesType && matchesSkill;
    })
    .sort((a, b) => {
      if (sortBy === "salary") {
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      }
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#192038] to-[#151B30] border-b border-[#3B4D7A]/40 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                <span>Direct Talent Pipeline</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                Verified Tech Opportunities.
              </h1>
              <p className="text-sm sm:text-base text-[#F1F4F9]/80 max-w-2xl font-medium leading-relaxed">
                Connect directly with engineering teams looking for verified talent. Candidates holding SkillBridge assessment credentials skip resume screening algorithms.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-[#151B30] border border-[#3B4D7A] text-center shadow-inner">
                <span className="block text-2xl font-black text-[#F59E0B]">{jobs.length}</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Active Roles</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#151B30] border border-[#3B4D7A] text-center shadow-inner">
                <span className="block text-2xl font-black text-[#0EA5E9]">100%</span>
                <span className="text-[11px] font-bold text-[#F1F4F9]/70 uppercase">Verified Companies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Search & Filter Toolbar */}
        <div className="master-card rounded-2xl p-6 mb-10 shadow-lg space-y-5">
          {/* Search bar + sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#F1F4F9]/50">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by job title, company name, or tech stack..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#151B30] border border-[#3B4D7A] text-white text-xs font-semibold placeholder:text-[#F1F4F9]/40 focus:outline-none focus:border-[#0EA5E9] transition-all"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <span className="text-xs font-bold text-[#F1F4F9]/70">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-3.5 py-2.5 rounded-xl bg-[#151B30] border border-[#3B4D7A] text-xs font-bold text-white focus:outline-none focus:border-[#0EA5E9] cursor-pointer"
              >
                <option value="newest">📅 Newest First</option>
                <option value="salary">💰 Highest Salary</option>
              </select>
            </div>
          </div>

          {/* Job Type Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#3B4D7A]/40">
            <span className="text-xs font-bold text-[#F1F4F9]/60 mr-1">Work Type:</span>
            {jobTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedType === type
                    ? "bg-[#0EA5E9] text-[#151B30] font-black shadow-sm"
                    : "bg-[#151B30] border border-[#3B4D7A] text-[#F1F4F9]/80 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Skill Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#F1F4F9]/60 mr-1">Skill Filter:</span>
            {availableFilterSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedSkill === skill
                    ? "bg-[#F59E0B] text-[#151B30] font-black shadow-sm"
                    : "bg-[#151B30] border border-[#3B4D7A] text-[#F1F4F9]/80 hover:text-white"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#F1F4F9]/70 font-semibold px-1">
          <span>Showing {filteredJobs.length} verified opportunities</span>
          {(search || selectedType !== "All" || selectedSkill !== "All") && (
            <button
              onClick={() => { setSearch(""); setSelectedType("All"); setSelectedSkill("All"); }}
              className="text-[#0EA5E9] hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="p-16 text-center master-card rounded-2xl">
            <p className="text-lg font-bold text-white mb-2">No jobs match your selected criteria.</p>
            <p className="text-sm text-[#F1F4F9]/70 mb-4">Try relaxing your search terms or selecting 'All' skills.</p>
            <button
              onClick={() => { setSearch(""); setSelectedType("All"); setSelectedSkill("All"); }}
              className="px-4 py-2 rounded-xl bg-[#0EA5E9] text-[#151B30] text-xs font-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
