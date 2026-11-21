"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const leaderboardData = [
  { rank: 1, name: "Almaz Teshager", title: "Full-Stack Dev", points: 2850, streak: 14, badges: 12, tier: "Diamond", bg: "#151B30", text: "#FFFFFF" },
  { rank: 2, name: "Tewodros Alemu", title: "Data Analyst", points: 2720, streak: 11, badges: 10, tier: "Diamond", bg: "#3B4D7A", text: "#FFFFFF" },
  { rank: 3, name: "Hana Kebede", title: "UI/UX Designer", points: 2680, streak: 9, badges: 11, tier: "Platinum", bg: "#F59E0B", text: "#151B30" },
  { rank: 4, name: "Kenenisa Beyena", title: "Backend Engineer", points: 2450, streak: 7, badges: 8, tier: "Platinum", bg: "#0EA5E9", text: "#151B30" },
  { rank: 5, name: "Selam Assefa", title: "Frontend Engineer", points: 2310, streak: 6, badges: 9, tier: "Gold", bg: "#3B4D7A", text: "#FFFFFF" },
  { rank: 6, name: "Bereket Desta", title: "React Specialist", points: 2150, streak: 5, badges: 7, tier: "Gold", bg: "#151B30", text: "#FFFFFF" },
  { rank: 7, name: "Marta Solomon", title: "Next.js Builder", points: 1980, streak: 4, badges: 6, tier: "Silver", bg: "#0EA5E9", text: "#151B30" },
];

const weeklyQuests = [
  { id: "q1", title: "Complete 2 Course Lessons", xp: 150, progress: 2, total: 2, done: true },
  { id: "q2", title: "Pass Any Skill Assessment (≥80%)", xp: 300, progress: 1, total: 1, done: true },
  { id: "q3", title: "Update Your Resume with 5 Skills", xp: 100, progress: 5, total: 5, done: true },
  { id: "q4", title: "Maintain a 7-Day Study Streak", xp: 250, progress: 7, total: 7, done: true },
];

const rankBadges: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "allTime">("monthly");

  return (
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 72px" }}>
      {/* Hero Header */}
      <div style={{ backgroundColor: "#151B30", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "4px 14px", marginBottom: 12 }}>
                <span style={{ color: "#F59E0B", fontSize: 13, fontWeight: 800 }}>🏆 Community Rankings</span>
              </div>
              <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
                Top Learners & Verified Builders
              </h1>
              <p style={{ color: "#F1F4F9", fontSize: 15, margin: 0, opacity: 0.85, maxWidth: 600 }}>
                Earn verified XP through hands-on lessons, assessments, and portfolio milestones. Top rankers receive priority recruiter introductions.
              </p>
            </div>

            {/* User Personal Ranking Status Card */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "16px 24px",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                gap: 16
              }}
            >
              <div>
                <p style={{ color: "#F1F4F9", fontSize: 12, margin: "0 0 2px", opacity: 0.8 }}>Your Standing</p>
                <p style={{ color: "#0EA5E9", fontSize: 24, fontWeight: 900, margin: 0 }}>Rank #4</p>
                <p style={{ color: "#F59E0B", fontSize: 11, fontWeight: 700, margin: "2px 0 0" }}>🔥 7-Day Streak</p>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 16, textAlign: "right" }}>
                <p style={{ color: "#F1F4F9", fontSize: 12, margin: "0 0 2px", opacity: 0.8 }}>Total Score</p>
                <p style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800, margin: 0 }}>2,450 XP</p>
                <p style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700, margin: "2px 0 0" }}>230 XP to 🥉 #3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px 0" }}>
        {/* Weekly Quests Widget */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: "24px 28px",
            border: "1.5px solid #3B4D7A",
            boxShadow: "0 4px 16px rgba(21,27,48,0.04)",
            marginBottom: 28
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <h2 style={{ color: "#151B30", fontSize: 18, fontWeight: 800, margin: 0 }}>
                ⚡ Weekly XP Quests
              </h2>
              <p style={{ color: "#3B4D7A", fontSize: 13, margin: "2px 0 0" }}>
                Complete weekly challenges to level up your rank and claim bonus badges.
              </p>
            </div>
            <span
              style={{
                backgroundColor: "#F1F4F9",
                border: "1px solid #3B4D7A",
                color: "#151B30",
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 700
              }}
            >
              800 / 800 XP Earned This Week 🎯
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {weeklyQuests.map(q => (
              <div
                key={q.id}
                style={{
                  backgroundColor: "#F1F4F9",
                  borderRadius: 12,
                  padding: "14px 16px",
                  border: "1px solid #3B4D7A"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>+{q.xp} XP</span>
                  <span style={{ color: "#151B30", fontSize: 12, fontWeight: 800 }}>✅ Completed</span>
                </div>
                <p style={{ color: "#151B30", fontSize: 13, fontWeight: 700, margin: 0 }}>
                  {q.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Table Container */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: "1.5px solid #3B4D7A",
            boxShadow: "0 8px 30px rgba(21,27,48,0.06)",
            overflow: "hidden"
          }}
        >
          {/* Table Toolbar */}
          <div
            style={{
              backgroundColor: "#151B30",
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12
            }}
          >
            <h3 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 800, margin: 0 }}>
              Learner Rankings
            </h3>

            {/* Period switcher */}
            <div style={{ display: "flex", gap: 6, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 4 }}>
              {[
                { id: "weekly", label: "Weekly" },
                { id: "monthly", label: "Monthly" },
                { id: "allTime", label: "All-Time" }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id as any)}
                  style={{
                    backgroundColor: period === p.id ? "#F59E0B" : "transparent",
                    color: period === p.id ? "#151B30" : "#F1F4F9",
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Roster List */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {leaderboardData.map((user, idx) => (
              <div
                key={user.rank}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: idx === leaderboardData.length - 1 ? "none" : "1px solid rgba(59,77,122,0.15)",
                  backgroundColor: user.rank === 4 ? "rgba(14,165,233,0.06)" : "#FFFFFF",
                  transition: "background-color 0.15s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {/* Rank badge / number */}
                  <div style={{ width: 36, textAlign: "center", fontSize: 20, fontWeight: 900 }}>
                    {rankBadges[user.rank] ? rankBadges[user.rank] : <span style={{ color: "#3B4D7A", fontSize: 16 }}>#{user.rank}</span>}
                  </div>

                  {/* Avatar */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: user.bg,
                      color: user.text,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 16,
                      flexShrink: 0,
                      border: "1.5px solid #3B4D7A"
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>

                  {/* Identity */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <p style={{ color: "#151B30", fontWeight: 800, fontSize: 15, margin: 0 }}>
                        {user.name}
                      </p>
                      {user.rank <= 3 && (
                        <span
                          style={{
                            backgroundColor: "#F59E0B",
                            color: "#151B30",
                            borderRadius: 999,
                            padding: "2px 8px",
                            fontSize: 10,
                            fontWeight: 800,
                            textTransform: "uppercase"
                          }}
                        >
                          Top {user.rank}
                        </span>
                      )}
                      {user.rank === 4 && (
                        <span
                          style={{
                            backgroundColor: "#0EA5E9",
                            color: "#151B30",
                            borderRadius: 999,
                            padding: "2px 8px",
                            fontSize: 10,
                            fontWeight: 800,
                            textTransform: "uppercase"
                          }}
                        >
                          You
                        </span>
                      )}
                    </div>
                    <p style={{ color: "#3B4D7A", fontSize: 12, margin: "2px 0 0", fontWeight: 600 }}>
                      {user.title} • {user.badges} Badges • <span style={{ color: "#151B30", fontWeight: 700 }}>🔥 {user.streak}d streak</span>
                    </p>
                  </div>
                </div>

                {/* Score & Tier */}
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#0EA5E9", fontSize: 18, fontWeight: 900, margin: 0 }}>
                    {user.points.toLocaleString()} XP
                  </p>
                  <span
                    style={{
                      backgroundColor: "#F1F4F9",
                      border: "1px solid #3B4D7A",
                      color: "#151B30",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginTop: 2
                    }}
                  >
                    {user.tier} League
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip */}
        <div
          style={{
            marginTop: 24,
            padding: "16px 20px",
            backgroundColor: "#FFFFFF",
            borderRadius: 14,
            border: "1px dashed #3B4D7A",
            textAlign: "center"
          }}
        >
          <p style={{ color: "#3B4D7A", fontSize: 13, margin: 0 }}>
            💡 <strong style={{ color: "#151B30" }}>Want to climb the ranks?</strong> Complete courses, pass verified assessments, and maintain daily activity streaks to rise in your league!
          </p>
        </div>
      </div>
    </div>
  );
}
