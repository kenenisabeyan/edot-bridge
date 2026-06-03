"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return <div className="p-8 text-center">Redirecting...</div>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4 hidden md:block">
        <nav className="space-y-2">
          <Link href="/dashboard" className="block p-2 hover:bg-muted rounded">Dashboard</Link>
          <Link href="/my-courses" className="block p-2 hover:bg-muted rounded">My Courses</Link>
          <Link href="/my-certificates" className="block p-2 hover:bg-muted rounded">Certificates</Link>
          <Link href="/my-portfolio" className="block p-2 hover:bg-muted rounded">Portfolio</Link>
          <Link href="/job-applications" className="block p-2 hover:bg-muted rounded">Applications</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}