import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogPosts = [
  { slug: "top-skills-2026", title: "Top 10 Skills Employers Want in 2026", excerpt: "Discover which skills can boost your career...", date: "June 10, 2026", author: "SkillBridge Team" },
  { slug: "ai-translation", title: "How AI Translation Opens Doors to Global Learning", excerpt: "Breaking language barriers in education...", date: "June 5, 2026", author: "Kenenisa B." },
  { slug: "portfolio-tips", title: "5 Tips to Build a Standout Portfolio", excerpt: "Get hired faster with these portfolio strategies...", date: "May 28, 2026", author: "Career Coach" },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">SkillBridge Blog</h1>
      <p className="text-muted-foreground mb-8">News, tips, and stories from the learning community.</p>
      <div className="grid gap-6">
        {blogPosts.map(post => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date} • by {post.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="p-0">
                <Link href={`/blog/${post.slug}`}>Read more →</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}