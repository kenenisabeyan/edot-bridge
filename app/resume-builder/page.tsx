"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ResumeBuilderPage() {
  const [form, setForm] = useState({
    name: "Kenenisa Beyan",
    email: "kenenisa@skillbridge.com",
    phone: "+251 912 345678",
    summary: "Full-stack developer passionate about building impactful web applications.",
    experience: "Software Developer Intern at XYZ Corp (2024-2025)\n- Built React components\n- Integrated REST APIs",
    education: "BSc in Computer Science, AAU (2025)",
    skills: "React, Next.js, TypeScript, Tailwind, Node.js"
  });

  const [preview, setPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    alert("PDF export will be available after backend integration. For now, you can copy the preview.");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input name="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm font-medium">Professional Summary</label>
            <Textarea name="summary" value={form.summary} onChange={handleChange} rows={3} />
          </div>
          <div>
            <label className="text-sm font-medium">Experience</label>
            <Textarea name="experience" value={form.experience} onChange={handleChange} rows={4} />
          </div>
          <div>
            <label className="text-sm font-medium">Education</label>
            <Textarea name="education" value={form.education} onChange={handleChange} rows={2} />
          </div>
          <div>
            <label className="text-sm font-medium">Skills</label>
            <Input name="skills" value={form.skills} onChange={handleChange} />
          </div>
          <Button onClick={handleExport}>Export as PDF (Mock)</Button>
        </div>

        {/* Preview */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Preview</h2>
            <Button variant="outline" onClick={() => setPreview(!preview)}>Toggle Preview</Button>
          </div>
          {preview && (
            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-bold">{form.name}</h3>
                <p>{form.email} | {form.phone}</p>
                <p><strong>Summary:</strong> {form.summary}</p>
                <p><strong>Experience:</strong><br />{form.experience}</p>
                <p><strong>Education:</strong> {form.education}</p>
                <p><strong>Skills:</strong> {form.skills}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}