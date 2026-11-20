import Link from "next/link";

const blogPosts = [
  {
    slug: "top-skills-2026",
    title: "Top 10 Skills Employers Want in 2026",
    excerpt: "Discover which skills are driving hiring decisions across tech, finance, and healthcare — and how to certify them on SkillBridge.",
    date: "June 10, 2026",
    author: "SkillBridge Team",
    readTime: "5 min read",
    tag: "Career",
  },
  {
    slug: "ai-translation",
    title: "How AI Translation Opens Doors to Global Learning",
    excerpt: "Breaking language barriers in education means learners in Afaan Oromo, Amharic, Swahili and 47 more languages can now access world-class tech courses.",
    date: "June 5, 2026",
    author: "Kenenisa B.",
    readTime: "7 min read",
    tag: "AI",
  },
  {
    slug: "portfolio-tips",
    title: "5 Tips to Build a Standout Developer Portfolio",
    excerpt: "Get hired faster with these portfolio strategies from hiring managers at top African and global tech companies.",
    date: "May 28, 2026",
    author: "Career Coach",
    readTime: "4 min read",
    tag: "Tips",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Career: { bg: "rgba(245,158,11,0.12)", text: "#F59E0B" },
  AI: { bg: "rgba(14,165,233,0.12)", text: "#0EA5E9" },
  Tips: { bg: "rgba(59,77,122,0.12)", text: "#3B4D7A" },
};

export default function BlogPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Header */}
      <section className="bg-[#151B30] py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#FFFFFF]/10 border border-[#3B4D7A]/40 text-[#F1F4F9] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            SkillBridge Blog
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">News, Tips & Stories</h1>
          <p className="text-[#F1F4F9] font-medium text-lg">From the SkillBridge learning community and beyond.</p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl grid gap-6">
          {blogPosts.map((post) => {
            const tag = tagColors[post.tag] || tagColors["Tips"];
            return (
              <article
                key={post.slug}
                className="rounded-2xl p-7 bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className="text-xs font-black px-2.5 py-0.5 rounded-full"
                    style={{ background: tag.bg, color: tag.text }}
                  >
                    {post.tag}
                  </span>
                  <span className="text-xs text-[#3B4D7A] font-semibold">{post.date}</span>
                  <span className="text-xs text-[#3B4D7A]/60">·</span>
                  <span className="text-xs text-[#3B4D7A] font-semibold">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-extrabold text-[#151B30] group-hover:text-[#0EA5E9] transition-colors mb-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-[#3B4D7A] font-medium leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#3B4D7A] flex items-center justify-center text-white text-xs font-black">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-[#151B30]">{post.author}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-[#0EA5E9] hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
