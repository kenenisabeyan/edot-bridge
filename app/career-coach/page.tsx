"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">AI Career Coach</h1>
      <p className="text-muted-foreground mb-6">Ask me about career paths, skill recommendations, resume writing, and job search strategies.</p>

      <Card className="h-[500px] flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-center text-muted-foreground">Thinking...</div>}
        </CardContent>
        <div className="p-4 border-t flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask me anything..." />
          <Button onClick={handleSend} disabled={loading}>Send</Button>
        </div>
      </Card>
    </div>
  );
}