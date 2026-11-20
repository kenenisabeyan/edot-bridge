"use client";
import { useAuth } from "@/lib/use-auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MyPortfolioPage() {
  const { user } = useAuth();
  const [bio, setBio] = useState(user?.bio || "I'm a passionate learner building my career.");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "React, Next.js, TypeScript");
  const [projects, setProjects] = useState("E-commerce App — Full-stack React + Node.js project\nAI Chatbot — LLM-powered customer support tool");

  const portfolioUrl = `/portfolio/${user?.name?.toLowerCase().replace(/\s/g, "") || "user"}`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#151B30] mb-1">My Portfolio</h1>
        <p className="text-[#3B4D7A] font-medium">Build your shareable public profile for employers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Edit Form */}
        <div className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm">
          <h2 className="text-lg font-extrabold text-[#151B30] mb-5">Edit Portfolio</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#151B30] mb-1.5">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-[#3B4D7A]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#151B30] mb-1.5">Skills (comma-separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-[#3B4D7A]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#151B30] mb-1.5">Projects</label>
              <textarea
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-[#3B4D7A]"
              />
            </div>
            <Button className="rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm w-full py-3">
              Save Changes (Mock)
            </Button>
            <p className="text-xs text-[#3B4D7A] font-medium">
              Your public portfolio:{" "}
              <a href={portfolioUrl} target="_blank" className="font-bold text-[#0EA5E9] hover:underline" rel="noreferrer">
                {portfolioUrl}
              </a>
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <h2 className="text-lg font-extrabold text-[#151B30] mb-5">Live Preview</h2>
          <div className="rounded-2xl bg-[#151B30] border border-[#3B4D7A]/40 shadow-md overflow-hidden">
            {/* Profile header */}
            <div className="p-6 border-b border-[#3B4D7A]/40">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#0EA5E9] flex items-center justify-center text-[#151B30] text-xl font-black">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{user?.name || "Your Name"}</h3>
                  <p className="text-xs text-[#F1F4F9] font-medium">{user?.email || "your@email.com"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#F1F4F9] font-medium leading-relaxed">{bio}</p>
            </div>

            {/* Skills */}
            <div className="p-6 border-b border-[#3B4D7A]/40">
              <p className="text-xs font-black text-[#0EA5E9] uppercase tracking-wider mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.split(",").map((s) => s.trim()).filter(Boolean).map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFFFFF]/10 border border-[#3B4D7A]/40 text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="p-6">
              <p className="text-xs font-black text-[#F59E0B] uppercase tracking-wider mb-3">Projects</p>
              {projects.split("\n").filter(Boolean).map((proj, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="text-[#0EA5E9] font-black mt-0.5">▸</span>
                  <span className="text-sm text-[#F1F4F9] font-medium">{proj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
