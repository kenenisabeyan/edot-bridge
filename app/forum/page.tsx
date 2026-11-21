"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Topic {
  id: number;
  title: string;
  category: string;
  author: string;
  upvotes: number;
  replies: number;
  lastActive: string;
}

const initialTopics: Topic[] = [
  { id: 1, title: "How to master React Server Components and App Router in 2026?", category: "React & Frontend", author: "Kenenisa B.", upvotes: 24, replies: 8, lastActive: "15 mins ago" },
  { id: 2, title: "Best roadmap for transitioning from Python scripts to full-stack ML apps", category: "Python & AI", author: "Almaz T.", upvotes: 19, replies: 12, lastActive: "1 hour ago" },
  { id: 3, title: "TechCorp Ethiopia interview experience & salary negotiation tips", category: "Career & Jobs", author: "Tewodros A.", upvotes: 42, replies: 17, lastActive: "3 hours ago" },
  { id: 4, title: "Showcase: Built an Afaan Oromo speech-to-text educational bot", category: "Showcase", author: "Bereket D.", upvotes: 35, replies: 9, lastActive: "Yesterday" },
  { id: 5, title: "How to effectively structure PostgreSQL migrations with Prisma in Next.js", category: "React & Frontend", author: "Marta S.", upvotes: 14, replies: 5, lastActive: "2 days ago" },
];

const categories = ["All", "React & Frontend", "Python & AI", "Career & Jobs", "Showcase"];

export default function ForumPage() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("React & Frontend");

  const handleUpvote = (id: number) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTopic: Topic = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      author: "You",
      upvotes: 1,
      replies: 0,
      lastActive: "Just now"
    };

    setTopics([newTopic, ...topics]);
    setNewTitle("");
    setIsModalOpen(false);
  };

  const filteredTopics = topics.filter(t => {
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.author.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 72px" }}>
      {/* Hero Header */}
      <div style={{ backgroundColor: "#151B30", padding: "48px 24px 38px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "4px 14px", marginBottom: 12 }}>
                <span style={{ color: "#0EA5E9", fontSize: 13, fontWeight: 800 }}>💬 Developer Community</span>
              </div>
              <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
                SkillBridge Peer Discussions
              </h1>
              <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.85, maxWidth: 600 }}>
                Ask code questions, share capstone projects, discuss tech interviews, and learn together with fellow developers across East Africa.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: "#F59E0B",
                color: "#151B30",
                border: "none",
                borderRadius: 12,
                padding: "14px 24px",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(245,158,11,0.3)"
              }}
            >
              ➕ Start Discussion
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px 0" }}>
        {/* Search & Category Filter */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: "20px 24px",
            border: "1.5px solid #3B4D7A",
            boxShadow: "0 4px 16px rgba(21,27,48,0.04)",
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search discussions by topic title or author..."
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#F1F4F9",
              border: "1.5px solid #3B4D7A",
              borderRadius: 10,
              color: "#151B30",
              fontSize: 14,
              outline: "none"
            }}
          />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: selectedCategory === cat ? "#151B30" : "#F1F4F9",
                  color: selectedCategory === cat ? "#FFFFFF" : "#151B30",
                  border: "1px solid #3B4D7A",
                  borderRadius: 999,
                  padding: "6px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filteredTopics.map(topic => (
            <div
              key={topic.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: "20px 24px",
                border: "1.5px solid #3B4D7A",
                boxShadow: "0 2px 8px rgba(21,27,48,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 280 }}>
                {/* Upvote Button */}
                <button
                  onClick={() => handleUpvote(topic.id)}
                  style={{
                    backgroundColor: "#F1F4F9",
                    border: "1.5px solid #3B4D7A",
                    borderRadius: 10,
                    padding: "8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    minWidth: 46
                  }}
                >
                  <span style={{ color: "#0EA5E9", fontSize: 14, fontWeight: 900 }}>▲</span>
                  <span style={{ color: "#151B30", fontSize: 13, fontWeight: 800 }}>{topic.upvotes}</span>
                </button>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        backgroundColor: "#F1F4F9",
                        border: "1px solid #3B4D7A",
                        color: "#3B4D7A",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 11,
                        fontWeight: 700
                      }}
                    >
                      {topic.category}
                    </span>
                    <span style={{ color: "#3B4D7A", fontSize: 12 }}>
                      by <strong style={{ color: "#151B30" }}>{topic.author}</strong>
                    </span>
                  </div>

                  <h3 style={{ color: "#151B30", fontSize: 16, fontWeight: 800, margin: "0 0 4px" }}>
                    <Link
                      href={`/forum/topic/${topic.id}`}
                      style={{ color: "#151B30", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#0EA5E9")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#151B30")}
                    >
                      {topic.title}
                    </Link>
                  </h3>
                  <p style={{ color: "#3B4D7A", fontSize: 12, margin: 0, fontWeight: 600 }}>
                    Active {topic.lastActive}
                  </p>
                </div>
              </div>

              {/* Replies Badge */}
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    backgroundColor: "#F1F4F9",
                    border: "1px solid #3B4D7A",
                    color: "#151B30",
                    borderRadius: 10,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  💬 {topic.replies} replies
                </span>
              </div>
            </div>
          ))}

          {filteredTopics.length === 0 && (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: "48px 24px",
                textAlign: "center",
                border: "1.5px solid #3B4D7A"
              }}
            >
              <p style={{ color: "#151B30", fontSize: 16, fontWeight: 700 }}>No discussions match your filter.</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearch(""); }}
                style={{
                  backgroundColor: "#F59E0B",
                  color: "#151B30",
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  marginTop: 10
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Topic Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(21,27,48,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              border: "2px solid #151B30",
              maxWidth: 540,
              width: "100%",
              padding: 32,
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#151B30", fontSize: 20, fontWeight: 800, margin: 0 }}>
                Start a New Discussion
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: 18, color: "#3B4D7A", cursor: "pointer", fontWeight: 800 }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTopic} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ color: "#151B30", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>
                  Discussion Title
                </label>
                <input
                  required
                  placeholder="e.g. How do you handle authentication in Next.js Server Components?"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#F1F4F9",
                    border: "1.5px solid #3B4D7A",
                    borderRadius: 10,
                    color: "#151B30",
                    fontSize: 14,
                    outline: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ color: "#151B30", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#F1F4F9",
                    border: "1.5px solid #3B4D7A",
                    borderRadius: 10,
                    color: "#151B30",
                    fontSize: 14,
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  {categories.filter(c => c !== "All").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: "#F59E0B",
                  color: "#151B30",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 0",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  marginTop: 8
                }}
              >
                Post Discussion 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
