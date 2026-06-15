"use client";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function MyPortfolioPage() {
  const { user } = useAuth();
  const [bio, setBio] = useState(user?.bio || "I'm a passionate learner building my career.");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "React, Next.js, TypeScript");
  const [projects, setProjects] = useState("[ { title: 'E-commerce App', description: 'Fullstack project' } ]");

  const portfolioUrl = `/portfolio/${user?.name?.toLowerCase().replace(/\s/g, "") || "user"}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Edit Form */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Portfolio</h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="text-sm font-medium">Skills (comma-separated)</label>
            <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Projects (JSON format)</label>
            <Textarea value={projects} onChange={(e) => setProjects(e.target.value)} rows={4} />
          </div>
          <Button>Save Changes (Mock)</Button>
          <p className="text-xs text-muted-foreground mt-2">Your public portfolio: <a href={portfolioUrl} target="_blank" className="text-primary underline">{portfolioUrl}</a></p>
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{bio}</p>
            <div className="mt-4">
              <strong>Skills:</strong> <span>{skills}</span>
            </div>
            <div className="mt-4">
              <strong>Projects:</strong>
              <pre className="text-xs bg-muted p-2 rounded mt-1">{projects}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}