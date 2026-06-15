"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock posted jobs
const initialJobs = [
  { id: "j1", title: "Frontend Developer", posted: "2026-06-01", applicants: 12 },
  { id: "j2", title: "Data Analyst", posted: "2026-06-05", applicants: 8 },
];

export default function EmployerDashboardPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [newJob, setNewJob] = useState({ title: "", description: "", location: "", type: "full-time" });

  const postJob = () => {
    if (!newJob.title) return;
    setJobs([...jobs, { id: Date.now().toString(), title: newJob.title, posted: new Date().toISOString().slice(0,10), applicants: 0 }]);
    setNewJob({ title: "", description: "", location: "", type: "full-time" });
    alert("Job posted (mock)");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your job posts and find talent.</p>

      <Tabs defaultValue="jobs">
        <TabsList>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="post">Post a Job</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Search (Mock)</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-6">
          <div className="space-y-4">
            {jobs.map(job => (
              <Card key={job.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">Posted: {job.posted} • {job.applicants} applicants</p>
                  </div>
                  <Button variant="outline" size="sm">View Applicants</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="post" className="mt-6 space-y-4 max-w-xl">
          <Input placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} />
          <Textarea placeholder="Job Description" rows={4} value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} />
          <Input placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} />
          <select className="border rounded p-2" value={newJob.type} onChange={(e) => setNewJob({...newJob, type: e.target.value})}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
          </select>
          <Button onClick={postJob}>Post Job (Mock)</Button>
        </TabsContent>

        <TabsContent value="candidates" className="mt-6">
          <p className="text-muted-foreground">Search for candidates with verified skills. (Backend coming soon)</p>
          <div className="mt-4 border rounded p-4">
            <p className="font-medium">Mock Candidate</p>
            <p>Skills: React, TypeScript, Node.js • Certificate: React Fundamentals (92%)</p>
            <Button size="sm" className="mt-2">Contact</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}