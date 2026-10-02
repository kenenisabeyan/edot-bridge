"use client";

import { useUserProfile, useCourses, useJobs } from "@/hooks/usePernApi";
import Link from "next/link";

export default function DashboardPage() {
  const { profile, loading: profileLoading } = useUserProfile();
  const { courses } = useCourses();
  const { jobs } = useJobs();

  const userName = profile?.name || "Student";
  const certificatesCount = profile?.certificates?.length || 0;
  const skillsList = profile?.studentProfile?.skills || [];

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 px-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">{userName}</span> 👋
          </h1>
          <p className="mt-1 text-gray-500">
            Track your PERN stack learning progress and career opportunities.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/career-coach"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-all"
          >
            🤖 AI Career Coach
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">📚</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
              Active Courses
            </span>
          </div>
          <div className="text-3xl font-extrabold text-indigo-600 mb-0.5">{courses.length}</div>
          <div className="text-xs text-gray-400 mb-3">PERN Stack Modules</div>
          <Link href="/courses" className="text-xs font-semibold text-indigo-600 hover:underline">
            Browse Courses →
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">🏆</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
              Certificates
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-500 mb-0.5">{certificatesCount}</div>
          <div className="text-xs text-gray-400 mb-3">Verified Credentials</div>
          <Link href="/assessments" className="text-xs font-semibold text-amber-600 hover:underline">
            Take Assessments →
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">💼</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              Job Listings
            </span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mb-0.5">{jobs.length}</div>
          <div className="text-xs text-gray-400 mb-3">Live Opportunities</div>
          <Link href="/jobs" className="text-xs font-semibold text-emerald-600 hover:underline">
            Explore Jobs →
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">🎯</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
              User Role
            </span>
          </div>
          <div className="text-xl font-extrabold text-purple-600 mb-0.5">{profile?.role || "STUDENT"}</div>
          <div className="text-xs text-gray-400 mb-3">PostgreSQL Identity</div>
          <Link href="/portfolio" className="text-xs font-semibold text-purple-600 hover:underline">
            Manage Portfolio →
          </Link>
        </div>
      </div>

      {/* Skills Showcase & Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">My Verified Skills</h2>
          {skillsList.length === 0 ? (
            <p className="text-sm text-gray-500">No skills added yet. Complete courses to earn skill badges.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold"
                >
                  ⚡ {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended PERN Courses</h2>
          <div className="space-y-3">
            {courses.slice(0, 3).map((c: any) => (
              <Link
                key={c.id}
                href="/courses"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
              >
                <div>
                  <div className="font-semibold text-sm text-gray-900">{c.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{c.lessons?.length || 0} Lessons</div>
                </div>
                <span className="text-indigo-600 font-semibold text-xs">Start →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}