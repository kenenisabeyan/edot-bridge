"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CareerCoachPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I'm your AI Career Coach. Ask me anything about career paths, skill recommendations, or resume tips." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Mock AI response
    setTimeout(() => {
      let reply = "";
      if (input.toLowerCase().includes("react")) {
        reply = "React is a great skill! Focus on hooks, context, and Next.js. Practice building projects.";
      } else if (input.toLowerCase().includes("resume")) {
        reply = "Make sure your resume includes a skills section, projects, and quantifiable achievements.";
      } else {
        reply = "Based on your profile, consider learning JavaScript or Python. Both are in high demand. Would you like more specific guidance?";
      }
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl bg-[#FFFFFF]">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#151B30] mb-2">AI Career Coach</h1>
        <p className="text-[#3B4D7A] text-lg font-medium">Personalized AI guidance for tech career paths, resume reviews, and interview prep.</p>
      </div>

      <div
        className="rounded-3xl border border-[#3B4D7A]/25 bg-[#F1F4F9] h-[600px] flex flex-col shadow-lg overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#151B30] text-[#FFFFFF] font-medium shadow-sm"
                    : "bg-[#FFFFFF] border border-[#3B4D7A]/25 text-[#151B30] font-medium shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-center text-sm text-[#3B4D7A] animate-pulse font-semibold">AI Career Coach is thinking...</div>}
        </div>

        <div className="p-4 border-t border-[#3B4D7A]/20 bg-[#FFFFFF] flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about careers, courses, interview tips..."
            className="flex-1 bg-[#F1F4F9] border-[#3B4D7A]/30 text-[#151B30] placeholder:text-[#3B4D7A]"
          />
          <Button
            onClick={handleSend}
            disabled={loading}
            className="rounded-xl px-6 font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity border-none shadow-sm"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
