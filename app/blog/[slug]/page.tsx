import { notFound } from "next/navigation";
import Link from "next/link";

const postsContent: Record<string, { title: string; content: string; date: string; author: string; tag: string; readTime: string }> = {
  "top-skills-2026": {
    title: "Top 10 Skills Employers Want in 2026",
    content: `Employers are rapidly shifting their hiring priorities as AI, automation, and global connectivity reshape every industry. In 2026, the most sought-after candidates combine technical fluency with strong communication and adaptability.

The top skills include: AI and Machine Learning literacy, Data Analysis and Visualization, Cloud Computing (AWS, GCP, Azure), Cybersecurity awareness, Full-Stack Web Development, Prompt Engineering, Digital Marketing & SEO, Project Management (Agile/Scrum), Emotional Intelligence, and Cross-Cultural Communication.

Candidates who invest in verifiable credentials — like those offered by SkillBridge — consistently stand out in applicant pools. Our AI-powered assessments ensure that your certificates reflect real, applied knowledge, not just course completion.

Start your skill journey today and get certified in the skills that matter most to global employers.`,
    date: "June 10, 2026",
    author: "SkillBridge Team",
    tag: "Career",
    readTime: "5 min read"
  },
  "ai-translation": {
    title: "How AI Translation Opens Doors to Global Learning",
    content: `Language has long been the greatest barrier to equal access to education. SkillBridge is proud to be breaking that barrier with our AI-powered real-time translation engine, supporting Amharic, Afaan Oromo, Somali, Swahili, and more.

Learners across East Africa can now access world-class tech courses in their native language. Our translation layer is embedded directly into the course player — every lesson, quiz, and certificate is fully localized.

The technology behind this is a fine-tuned multilingual transformer model trained on domain-specific educational content, ensuring accuracy goes beyond word-for-word translation to true conceptual understanding.

SkillBridge believes that talent is universal, but opportunity is not — yet. We're changing that, one language at a time.`,
    date: "June 5, 2026",
    author: "Kenenisa B.",
    tag: "Technology",
    readTime: "4 min read"
  },
  "portfolio-tips": {
    title: "5 Tips to Build a Standout Portfolio",
    content: `Your portfolio is your professional story. For tech candidates in 2026, a great portfolio is more powerful than a traditional resume. Here are five expert tips to make yours stand out.

1. Lead with Impact — Start each project with the outcome, not the process. Employers want to know what you built and why it matters.

2. Show Real Projects — Even personal or academic projects count. Build a full-stack app, contribute to open source, or solve a local problem with code.

3. Include Verified Certificates — Use SkillBridge's verified certificates to add credibility. Each one links to a live score report that employers can check.

4. Write a Clear Bio — Keep your bio under 60 words. Focus on who you help, what you do, and what makes you different.

5. Keep It Updated — A stale portfolio suggests stale skills. Add new projects and certificates at least every quarter.

Use SkillBridge's built-in Portfolio Builder to create a shareable, professionally designed profile in minutes.`,
    date: "May 28, 2026",
    author: "Career Coach",
    tag: "Tips",
    readTime: "6 min read"
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsContent[slug];
  if (!post) return notFound();

  const tagColor = post.tag === "Career" ? "#F59E0B" : post.tag === "Technology" ? "#0EA5E9" : "#3B4D7A";

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh" }}>
      {/* Hero Header */}
      <div style={{ backgroundColor: "#151B30", padding: "52px 24px 44px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              color: "#0EA5E9", textDecoration: "none", fontSize: 14,
              fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6,
              marginBottom: 24
            }}
          >
            ← Back to Blog
          </Link>

          {/* Tag + read time */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span
              style={{
                backgroundColor: tagColor, color: "#151B30",
                borderRadius: 999, padding: "4px 14px",
                fontSize: 12, fontWeight: 700
              }}
            >
              {post.tag}
            </span>
            <span style={{ color: "#F1F4F9", fontSize: 13, opacity: 0.75 }}>
              {post.readTime}
            </span>
          </div>

          <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, lineHeight: 1.3, margin: "0 0 16px" }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Author avatar */}
            <div
              style={{
                width: 40, height: 40, borderRadius: "50%",
                backgroundColor: "#3B4D7A", color: "#F1F4F9",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 15, flexShrink: 0
              }}
            >
              {post.author[0].toUpperCase()}
            </div>
            <div>
              <p style={{ color: "#FFFFFF", fontWeight: 600, fontSize: 14, margin: 0 }}>{post.author}</p>
              <p style={{ color: "#F1F4F9", fontSize: 13, margin: 0, opacity: 0.7 }}>{post.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 64px" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF", borderRadius: 16,
            padding: "36px 40px", border: "1px solid #3B4D7A"
          }}
        >
          {post.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              style={{
                color: "#151B30", fontSize: 16, lineHeight: 1.85,
                margin: i === 0 ? 0 : "20px 0 0"
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share + CTA */}
        <div
          style={{
            marginTop: 28, backgroundColor: "#151B30", borderRadius: 16,
            padding: "28px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16
          }}
        >
          <div>
            <p style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 17, margin: "0 0 4px" }}>
              Found this helpful?
            </p>
            <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.75 }}>
              Start learning on SkillBridge for free today.
            </p>
          </div>
          <Link
            href="/register"
            style={{
              backgroundColor: "#F59E0B", color: "#151B30",
              borderRadius: 10, padding: "12px 28px",
              fontWeight: 700, fontSize: 15, textDecoration: "none",
              display: "inline-block"
            }}
          >
            Get Started Free →
          </Link>
        </div>

        {/* Back link bottom */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link
            href="/blog"
            style={{
              color: "#3B4D7A", fontSize: 14, fontWeight: 600,
              textDecoration: "none", borderBottom: "1px solid #3B4D7A",
              paddingBottom: 2
            }}
          >
            ← More Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
