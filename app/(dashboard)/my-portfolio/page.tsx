"use client";
import { useAuth } from "@/lib/auth";

export default function MyPortfolioPage() {
  const { user } = useAuth();
  const portfolioUrl = `http://localhost:3000/portfolio/${user?.name?.toLowerCase().replace(/\s/g, "") || "user"}`;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>
      <p className="mb-2">Your public portfolio is available at:</p>
      <a href={portfolioUrl} target="_blank" className="text-primary underline">{portfolioUrl}</a>
      <div className="mt-6 border rounded-lg p-4 bg-muted/20">
        <h2 className="font-semibold">Portfolio Preview</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Skills: React, Next.js, TypeScript (demo)</p>
      </div>
    </div>
  );
}