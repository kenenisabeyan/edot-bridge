"use client";

import { useState, useEffect } from "react";

const activities = [
  { icon: "🟢", text: "1,420 learners active and coding right now" },
  { icon: "🎓", text: "Almaz T. just earned the verified React Specialist Certificate" },
  { icon: "💼", text: "TechEthiopia posted 3 new Remote Frontend Engineer roles" },
  { icon: "⚡", text: "Tewodros B. reached a 14-day daily learning streak (+350 XP)" },
  { icon: "🌍", text: "New Afaan Oromo & Amharic audio tracks published for Next.js 16" },
  { icon: "🏆", text: "Selamawit H. achieved 96% score on the Python Data Assessment" },
];

export function LiveCommunityPulse() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % activities.length);
        setFade(true);
      }, 250);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-y border-[#3B4D7A]/40 bg-[#192038] py-3 px-4">
      <div className="container mx-auto flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EA5E9] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0EA5E9]" />
          </span>
          <span className="font-bold text-[#0EA5E9] tracking-wide uppercase text-[11px] px-2.5 py-0.5 rounded-full bg-[#151B30] border border-[#0EA5E9]/50">
            Live Pulse
          </span>
          <div
            className={`transition-opacity duration-300 font-semibold text-[#F1F4F9] truncate ${
              fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
          >
            <span className="mr-1.5">{activities[currentIdx].icon}</span>
            {activities[currentIdx].text}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[#F1F4F9] opacity-80 shrink-0 font-medium text-xs">
          <span>⚡ 98.4% Completion Rate</span>
          <span>•</span>
          <span>🌍 50+ Languages Supported</span>
        </div>
      </div>
    </div>
  );
}
