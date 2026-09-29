import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const leaderboardData = [
  { rank: 1, name: "Almaz Teshager", title: "Full-Stack Dev", points: 2850, badges: 12, avatarColor: "from-amber-400 to-yellow-600" },
  { rank: 2, name: "Tewodros Alemu", title: "Data Analyst", points: 2720, badges: 10, avatarColor: "from-slate-300 to-slate-500" },
  { rank: 3, name: "Hana Kebede", title: "UI/UX Designer", points: 2680, badges: 11, avatarColor: "from-amber-600 to-amber-800" },
  { rank: 4, name: "Kenenisa Beyena", title: "Backend Engineer", points: 2450, badges: 8, avatarColor: "from-indigo-500 to-purple-600" },
  { rank: 5, name: "Selam Assefa", title: "Frontend Engineer", points: 2310, badges: 9, avatarColor: "from-teal-500 to-emerald-600" },
];

const rankBadges: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-3"
             style={{ background: "hsl(var(--primary) / .1)", color: "hsl(var(--primary))" }}>
          <span>🏆 Community Rankings</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 gradient-text">
          Top Learners & Builders
        </h1>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          Earn XP and badges by completing courses, passing verified assessments, and building real-world projects.
        </p>
      </div>

      <Card className="border shadow-lg overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
        <CardHeader className="border-b bg-card/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Monthly Leaderboard</CardTitle>
            <span className="text-xs font-semibold text-muted-foreground">Updated daily</span>
          </div>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className="flex items-center justify-between p-5 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 text-center font-black text-lg flex items-center justify-center">
                  {rankBadges[user.rank] ? (
                    <span className="text-2xl">{rankBadges[user.rank]}</span>
                  ) : (
                    <span className="text-muted-foreground">{user.rank}</span>
                  )}
                </div>
                <Avatar className="h-11 w-11 border-2 border-background shadow-sm">
                  <AvatarFallback className={`bg-gradient-to-br ${user.avatarColor} text-white font-bold text-sm`}>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-base">{user.name}</p>
                    {user.rank <= 3 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600">
                        Top {user.rank}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.title} • {user.badges} badges earned</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-lg gradient-text">{user.points.toLocaleString()} XP</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground p-4 rounded-xl border border-dashed"
           style={{ borderColor: "hsl(var(--border))" }}>
        💡 Want to climb the leaderboard? <span className="font-semibold text-foreground">Complete assessments</span> and earn verified certificates to boost your XP!
      </div>
    </div>
  );
}