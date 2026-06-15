import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: "Almaz T.", points: 2850, badges: 12 },
  { rank: 2, name: "Tewodros M.", points: 2720, badges: 10 },
  { rank: 3, name: "Hana K.", points: 2680, badges: 11 },
  { rank: 4, name: "Kenenisa B.", points: 2450, badges: 8 },
  { rank: 5, name: "Selam A.", points: 2310, badges: 9 },
];

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">🏆 Leaderboard</h1>
      <p className="text-center text-muted-foreground mb-8">Top learners this month</p>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Learners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div key={user.rank} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold w-8">{user.rank}</span>
                  <Avatar>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.badges} badges</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{user.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Earn points by completing courses, assessments, and building your portfolio!
      </div>
    </div>
  );
}