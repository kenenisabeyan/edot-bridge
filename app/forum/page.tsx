import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const topics = [
  { id: 1, title: "How to start with React?", replies: 5, lastActive: "2 hours ago" },
  { id: 2, title: "Best resources for learning Python", replies: 12, lastActive: "Yesterday" },
  { id: 3, title: "Portfolio review request", replies: 3, lastActive: "3 days ago" },
];

export default function ForumPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl bg-[#FFFFFF]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#151B30]">Community Forum</h1>
          <p className="text-[#3B4D7A] text-sm font-medium mt-1">Connect, discuss code, and learn together.</p>
        </div>
        <Button className="rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm">
          New Topic (Mock)
        </Button>
      </div>
      <div className="space-y-4">
        {topics.map(topic => (
          <div
            key={topic.id}
            className="rounded-2xl p-6 bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-[#151B30] hover:text-[#0EA5E9] transition-colors">
                <Link href={`/forum/topic/${topic.id}`}>
                  {topic.title}
                </Link>
              </h3>
            </div>
            <div className="flex justify-between text-xs font-semibold text-[#3B4D7A]">
              <span>{topic.replies} replies</span>
              <span>Last active {topic.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
