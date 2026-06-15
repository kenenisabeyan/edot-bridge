import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const postsContent: Record<string, { title: string; content: string; date: string; author: string }> = {
  "top-skills-2026": {
    title: "Top 10 Skills Employers Want in 2026",
    content: "Full content here... (mock) Employers are looking for AI, data analysis, soft skills, and more.",
    date: "June 10, 2026",
    author: "SkillBridge Team"
  },
  "ai-translation": {
    title: "How AI Translation Opens Doors to Global Learning",
    content: "AI is breaking language barriers... (mock) Now you can learn in Amharic, Afaan Oromo, and more.",
    date: "June 5, 2026",
    author: "Kenenisa B."
  },
  "portfolio-tips": {
    title: "5 Tips to Build a Standout Portfolio",
    content: "Include projects, certificates, and a clear bio... (mock) Use our portfolio builder!",
    date: "May 28, 2026",
    author: "Career Coach"
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsContent[slug];
  if (!post) return notFound();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/blog">← Back to Blog</Link>
      </Button>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-muted-foreground mb-6">{post.date} • by {post.author}</p>
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </div>
  );
}