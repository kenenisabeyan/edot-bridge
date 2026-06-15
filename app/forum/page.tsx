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
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <Button>New Topic (Mock)</Button>
      </div>
      <div className="space-y-4">
        {topics.map(topic => (
          <Card key={topic.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/forum/topic/${topic.id}`} className="hover:underline">
                  {topic.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between text-sm text-muted-foreground">
              <span>{topic.replies} replies</span>
              <span>Last active {topic.lastActive}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}