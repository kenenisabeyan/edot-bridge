"use client";
import { useAuth } from "@/lib/auth";
import { mockCourses } from "@/lib/mock-data/courses";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, {user?.name} 👋</h1>
      <p className="text-muted-foreground">Track your learning progress and career journey.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Enrolled Courses</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mockCourses.length}</p>
            <p className="text-sm text-muted-foreground">In progress</p>
            <Button asChild variant="link" className="p-0 mt-2"><Link href="/my-courses">Continue Learning →</Link></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Certificates Earned</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1</p>
            <p className="text-sm text-muted-foreground">React Fundamentals</p>
            <Button asChild variant="link" className="p-0 mt-2"><Link href="/my-certificates">View All →</Link></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Job Matches</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Based on your skills</p>
            <Button asChild variant="link" className="p-0 mt-2"><Link href="/jobs">Explore Jobs →</Link></Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="flex justify-between items-center border-b pb-2">
            <span>Completed lesson "Introduction to React"</span>
            <span className="text-sm text-muted-foreground">2 days ago</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <span>Passed React Fundamentals assessment (85%)</span>
            <span className="text-sm text-muted-foreground">5 days ago</span>
          </li>
        </ul>
      </div>

      {/* Recommended Courses */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Advanced React Patterns</CardTitle></CardHeader>
            <CardContent><Button asChild variant="outline"><Link href="/courses">Enroll</Link></Button></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Next.js & Fullstack</CardTitle></CardHeader>
            <CardContent><Button asChild variant="outline"><Link href="/courses">Enroll</Link></Button></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}