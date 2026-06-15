"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              🌉 SkillBridge
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/courses" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Courses
            </Link>
            <Link href="/jobs" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Jobs
            </Link>
            <Link href="/assessments" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Assessments
            </Link>
            <Link href="/leaderboard" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Leaderboard
            </Link>
            <Link href="/learning-paths" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Learning Paths
            </Link>
            <Link href="/blog" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Blog
            </Link>
            <Link href="/forum" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Forum
            </Link>
            <Link href="/career-coach" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Career Coach
            </Link>
            <Link href="/resume-builder" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              Resume Builder
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}