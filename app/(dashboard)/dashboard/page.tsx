"use client";
import { useAuth } from "@/lib/auth";
import { mockCourses } from "@/lib/mock-data/courses";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, {user?.name} 👋</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold">In Progress</h2>
          <p className="text-2xl font-bold">{mockCourses.length} courses</p>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold">Certificates</h2>
          <p className="text-2xl font-bold">1 earned</p>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold">Job Matches</h2>
          <p className="text-2xl font-bold">3 available</p>
        </div>
      </div>
    </div>
  );
}