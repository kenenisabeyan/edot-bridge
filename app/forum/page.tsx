"use client";
import { useState } from "react";
import Link from "next/link";

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
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#192038] to-[#151B30] border-b border-[#3B4D7A]/40 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                <span>Developer Community</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                Peer Discussions & Code Reviews.
              </h1>
              <p className="text-sm sm:text-base text-[#F1F4F9]/80 max-w-xl font-medium leading-relaxed">
                Ask technical questions, share open-source projects, discuss interview strategies, and connect with engineers across Africa.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-amber-cta px-6 py-3.5 rounded-xl text-xs font-black shadow-lg self-start sm:self-auto cursor-pointer"
            >
              ➕ Start Discussion
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Search & Category Filter Box */}
        <div className="luxury-box p-6 mb-8 shadow-2xl space-y-4">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#F1F4F9]/50">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search discussions by topic title or author..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#151B30] border border-[#3B4D7A]/60 text-white text-xs font-semibold placeholder:text-[#F1F4F9]/40 focus:outline-none focus:border-[#0EA5E9] shadow-inner transition-all"
            />
          </div>

          <div className="nested-box p-1.5 flex flex-wrap gap-1.5 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0EA5E9] text-[#151B30] font-black shadow-[0_0_12px_rgba(14,165,233,0.35)]"
                    : "text-[#F1F4F9]/80 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="luxury-box p-6 flex items-center justify-between gap-4 transition-all group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-[260px]">
                {/* Upvote Button Box */}
                <button
                  onClick={() => handleUpvote(topic.id)}
                  className="w-12 h-14 rounded-xl bg-[#151B30] border border-[#3B4D7A]/60 hover:border-[#0EA5E9] flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 shadow-inner group-hover:scale-105"
                >
                  <span className="text-[#0EA5E9] text-xs font-black">▲</span>
                  <span className="text-white text-xs font-black">{topic.upvotes}</span>
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#151B30] border border-[#3B4D7A]/60 text-[#0EA5E9] text-[10px] font-black uppercase shadow-inner">
                      {topic.category}
                    </span>
                    <span className="text-xs text-[#F1F4F9]/60">
                      by <strong className="text-white font-bold">{topic.author}</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-[#0EA5E9] transition-colors leading-snug">
                    <Link href={`/forum/topic/${topic.id}`}>
                      {topic.title}
                    </Link>
                  </h3>
                  <p className="text-[11px] text-[#F1F4F9]/50 mt-1 font-medium">
                    Active {topic.lastActive}
                  </p>
                </div>
              </div>

              {/* Replies Badge Box */}
              <div className="text-right shrink-0">
                <span className="nested-box px-3.5 py-1.5 text-xs font-bold text-white whitespace-nowrap">
                  💬 {topic.replies} replies
                </span>
              </div>
            </div>
          ))}

          {filteredTopics.length === 0 && (
            <div className="p-16 text-center luxury-box">
              <p className="text-base font-bold text-white mb-2">No discussions match your filter.</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearch(""); }}
                className="btn-amber-cta px-4 py-2 rounded-xl text-xs font-black"
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
          className="fixed inset-0 bg-[#151B30]/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="luxury-box p-8 max-w-lg w-full shadow-2xl border-[#0EA5E9]/50"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white">
                Start a New Discussion
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-lg text-[#F1F4F9]/60 hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#F1F4F9] mb-1.5">
                  Discussion Title
                </label>
                <input
                  required
                  placeholder="e.g. How do you handle authentication in Next.js Server Components?"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#151B30] border border-[#3B4D7A] text-white text-xs font-semibold placeholder:text-[#F1F4F9]/40 focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F1F4F9] mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#151B30] border border-[#3B4D7A] text-white text-xs font-semibold focus:outline-none focus:border-[#0EA5E9] cursor-pointer"
                >
                  {categories.filter(c => c !== "All").map(cat => (
                    <option key={cat} value={cat} className="bg-[#151B30]">{cat}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn-amber-cta w-full py-3.5 rounded-xl text-xs font-black shadow-md mt-4 cursor-pointer"
              >
                Publish Discussion 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
