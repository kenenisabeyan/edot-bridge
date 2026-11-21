"use client";
import { useState } from "react";
import Link from "next/link";

const leaderboardData = [
  { rank: 1, name: "Almaz Teshager", title: "Full-Stack Dev", points: 2850, streak: 14, badges: 12, tier: "Diamond", color: "#0EA5E9" },
  { rank: 2, name: "Tewodros Alemu", title: "Data Analyst", points: 2720, streak: 11, badges: 10, tier: "Diamond", color: "#0EA5E9" },
  { rank: 3, name: "Hana Kebede", title: "UI/UX Designer", points: 2680, streak: 9, badges: 11, tier: "Platinum", color: "#F59E0B" },
  { rank: 4, name: "Kenenisa Beyena", title: "Backend Engineer", points: 2450, streak: 7, badges: 8, tier: "Platinum", color: "#F59E0B", isUser: true },
  { rank: 5, name: "Selam Assefa", title: "Frontend Engineer", points: 2310, streak: 6, badges: 9, tier: "Gold", color: "#F1F4F9" },
  { rank: 6, name: "Bereket Desta", title: "React Specialist", points: 2150, streak: 5, badges: 7, tier: "Gold", color: "#F1F4F9" },
  { rank: 7, name: "Marta Solomon", title: "Next.js Builder", points: 1980, streak: 4, badges: 6, tier: "Silver", color: "#94A3B8" },
];

const weeklyQuests = [
  { id: "q1", title: "Complete 2 Course Lessons", xp: 150, progress: 2, total: 2, done: true },
  { id: "q2", title: "Pass Any Skill Assessment (≥80%)", xp: 300, progress: 1, total: 1, done: true },
  { id: "q3", title: "Update Your Resume with 5 Skills", xp: 100, progress: 5, total: 5, done: true },
  { id: "q4", title: "Maintain a 7-Day Study Streak", xp: 250, progress: 7, total: 7, done: true },
];

const rankMedals: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "allTime">("monthly");

  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#192038] to-[#151B30] border-b border-[#3B4D7A]/40 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B30] border border-[#3B4D7A] text-[#F59E0B] text-xs font-black uppercase tracking-wider mb-4">
                <span>🏆 Community Leaderboard</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                Top Learners & Verified Builders.
              </h1>
              <p className="text-sm sm:text-base text-[#F1F4F9]/80 max-w-xl font-medium leading-relaxed">
                Earn XP by completing proctored lessons, assessments, and public milestones. Top 10 rankers receive direct introductions to hiring partners.
              </p>
            </div>

            {/* User Standing Card */}
            <div className="master-card p-5 rounded-2xl flex items-center gap-6 shadow-xl shrink-0 border-[#0EA5E9]/50">
              <div>
                <p className="text-[11px] font-bold text-[#F1F4F9]/60 uppercase mb-0.5">Your Rank</p>
                <p className="text-3xl font-black text-[#0EA5E9]">#4</p>
                <p className="text-xs font-bold text-[#F59E0B] mt-0.5">🔥 7-Day Streak</p>
              </div>
              <div className="border-l border-[#3B4D7A]/50 pl-5">
                <p className="text-[11px] font-bold text-[#F1F4F9]/60 uppercase mb-0.5">Total XP</p>
                <p className="text-2xl font-black text-white">2,450</p>
                <p className="text-xs font-bold text-[#10B981] mt-0.5">230 XP to 🥉 #3</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Weekly Quests Widget */}
        <div className="master-card rounded-2xl p-6 sm:p-7 mb-10 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-white mb-1">
                ⚡ Weekly Quests
              </h2>
              <p className="text-xs text-[#F1F4F9]/75 font-medium">
                Complete all weekly milestones to claim extra XP and maintain your league tier.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] whitespace-nowrap self-start sm:self-auto">
              800 / 800 XP Claimed 🎯
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {weeklyQuests.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-[#151B30] border border-[#3B4D7A] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#F59E0B]">+{q.xp} XP</span>
                  <span className="text-xs font-bold text-[#10B981]">✓ Done</span>
                </div>
                <p className="text-xs font-bold text-white leading-snug">
                  {q.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Table Container */}
        <div className="master-card rounded-2xl overflow-hidden shadow-2xl">
          {/* Table Header with Period Toggle */}
          <div className="p-5 sm:p-6 bg-[#151B30]/70 border-b border-[#3B4D7A]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white mb-0.5">
                Global League Standings
              </h3>
              <p className="text-xs text-[#F1F4F9]/70">
                Updated in real time from assessment completions and course submissions.
              </p>
            </div>

            {/* Period Switcher */}
            <div className="flex gap-1.5 p-1 rounded-xl bg-[#151B30] border border-[#3B4D7A]">
              {(["weekly", "monthly", "allTime"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    period === p
                      ? "bg-[#0EA5E9] text-[#151B30] font-black shadow-sm"
                      : "text-[#F1F4F9]/70 hover:text-white"
                  }`}
                >
                  {p === "allTime" ? "All-Time" : p}
                </button>
              ))}
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#3B4D7A]/30">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                  user.isUser
                    ? "bg-[#0EA5E9]/10 border-l-4 border-l-[#0EA5E9]"
                    : "hover:bg-[#192038]/60"
                }`}
              >
                {/* Left: Rank & Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center font-black text-sm text-[#F1F4F9]">
                    {rankMedals[user.rank] || `#${user.rank}`}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#151B30] border border-[#3B4D7A] flex items-center justify-center font-black text-sm text-white shadow-sm">
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">
                        {user.name}
                      </h4>
                      {user.isUser && (
                        <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-[#0EA5E9] text-[#151B30]">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#F1F4F9]/60 font-medium">
                      {user.title} • 🔥 {user.streak}d streak
                    </p>
                  </div>
                </div>

                {/* Right: Tier & XP */}
                <div className="flex items-center gap-4 sm:gap-6 text-right">
                  <span
                    className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider"
                    style={{
                      backgroundColor: `${user.color}15`,
                      color: user.color,
                      border: `1px solid ${user.color}40`,
                    }}
                  >
                    {user.tier}
                  </span>

                  <div>
                    <p className="text-base font-black text-[#F59E0B]">
                      {user.points.toLocaleString()} XP
                    </p>
                    <p className="text-[10px] text-[#F1F4F9]/60 font-medium">
                      {user.badges} Badges
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
