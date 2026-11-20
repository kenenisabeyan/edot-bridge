"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ResumeBuilderPage() {
  const [form, setForm] = useState({
    name: "Kenenisa Beyan",
    email: "kenenisa@skillbridge.com",
    phone: "+251 912 345678",
    summary: "Full-stack developer passionate about building impactful web applications for emerging markets.",
    experience: "Software Developer Intern at XYZ Corp (2024–2025)\n• Built scalable React components\n• Integrated REST APIs and authentication flows",
    education: "BSc in Computer Science, Addis Ababa University (2025)",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL",
  });

  const [preview, setPreview] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-[#3B4D7A]";

  return (
    <div className="container mx-auto py-10 px-4 bg-[#FFFFFF] min-h-screen max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#151B30] mb-1">Resume Builder</h1>
          <p className="text-[#3B4D7A] font-medium text-sm">Build a professional resume in minutes. Export as PDF.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 rounded-xl text-sm font-bold border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] hover:bg-[#3B4D7A]/10 cursor-pointer transition-colors"
          >
            {preview ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            onClick={() => alert("PDF export available after backend integration.")}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 cursor-pointer border-none shadow-sm transition-opacity"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${preview ? "lg:grid-cols-2" : ""} gap-8`}>
        {/* Form */}
        <div className="space-y-5 rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/20 p-6 shadow-sm">
          <h2 className="font-extrabold text-[#151B30] text-lg border-b border-[#3B4D7A]/20 pb-3">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#151B30] mb-1.5">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#151B30] mb-1.5">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#151B30] mb-1.5">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#151B30] mb-1.5">Professional Summary</label>
            <textarea name="summary" value={form.summary} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#151B30] mb-1.5">Work Experience</label>
            <textarea name="experience" value={form.experience} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#151B30] mb-1.5">Education</label>
            <textarea name="education" value={form.education} onChange={handleChange} rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#151B30] mb-1.5">Skills (comma-separated)</label>
            <input name="skills" value={form.skills} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div>
            <h2 className="font-extrabold text-[#151B30] text-lg mb-5">Live Preview</h2>
            <div className="rounded-2xl overflow-hidden border border-[#3B4D7A]/20 shadow-lg">
              {/* Resume header */}
              <div className="bg-[#151B30] px-8 py-8">
                <h3 className="text-2xl font-extrabold text-white">{form.name}</h3>
                <p className="text-[#F1F4F9] text-sm font-medium mt-1">
                  {form.email} {form.phone ? `· ${form.phone}` : ""}
                </p>
              </div>

              {/* Resume body */}
              <div className="bg-[#FFFFFF] p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-black text-[#0EA5E9] uppercase tracking-widest mb-2 border-b border-[#3B4D7A]/20 pb-1">
                    Summary
                  </h4>
                  <p className="text-sm text-[#151B30] font-medium leading-relaxed">{form.summary}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0EA5E9] uppercase tracking-widest mb-2 border-b border-[#3B4D7A]/20 pb-1">
                    Experience
                  </h4>
                  <pre className="text-sm text-[#151B30] font-medium leading-relaxed whitespace-pre-wrap font-sans">{form.experience}</pre>
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0EA5E9] uppercase tracking-widest mb-2 border-b border-[#3B4D7A]/20 pb-1">
                    Education
                  </h4>
                  <p className="text-sm text-[#151B30] font-medium">{form.education}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0EA5E9] uppercase tracking-widest mb-2 border-b border-[#3B4D7A]/20 pb-1">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {form.skills.split(",").map(s => s.trim()).filter(Boolean).map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F1F4F9] border border-[#3B4D7A]/25 text-[#151B30]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
