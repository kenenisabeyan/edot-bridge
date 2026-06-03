"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillBridge
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/courses" className="hover:text-primary">Courses</Link>
          <Link href="/assessments" className="hover:text-primary">Assessments</Link>
          <Link href="/jobs" className="hover:text-primary">Jobs</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
        </nav>
        <div className="flex gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}