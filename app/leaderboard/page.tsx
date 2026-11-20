import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const leaderboardData = [
  { rank: 1, name: "Almaz Teshager", title: "Full-Stack Dev", points: 2850, badges: 12, bg: "#151B30", text: "#FFFFFF" },
  { rank: 2, name: "Tewodros Alemu", title: "Data Analyst", points: 2720, badges: 10, bg: "#3B4D7A", text: "#FFFFFF" },
  { rank: 3, name: "Hana Kebede", title: "UI/UX Designer", points: 2680, badges: 11, bg: "#F59E0B", text: "#151B30" },
  { rank: 4, name: "Kenenisa Beyena", title: "Backend Engineer", points: 2450, badges: 8, bg: "#0EA5E9", text: "#151B30" },
  { rank: 5, name: "Selam Assefa", title: "Frontend Engineer", points: 2310, badges: 9, bg: "#3B4D7A", text: "#FFFFFF" },
];

const rankBadges: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl bg-[#FFFFFF]">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-3 bg-[#F1F4F9] text-[#151B30] border border-[#3B4D7A]/30">
          <span>🏆 Community Rankings</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-[#151B30]">
          Top Learners & Builders
        </h1>
        <p className="text-[#3B4D7A] text-base max-w-lg mx-auto font-medium">
          Earn XP and badges by completing courses, passing verified assessments, and building real-world projects.
        </p>
      </div>

      <Card className="border border-[#3B4D7A]/25 shadow-lg overflow-hidden bg-[#FFFFFF]">
        <CardHeader className="border-b border-[#3B4D7A]/20 bg-[#F1F4F9] px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-extrabold text-[#151B30]">Monthly Leaderboard</CardTitle>
            <span className="text-xs font-bold text-[#3B4D7A]">Updated daily</span>
          </div>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-[#3B4D7A]/15">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className="flex items-center justify-between p-5 transition-colors hover:bg-[#F1F4F9]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 text-center font-black text-lg flex items-center justify-center">
                  {rankBadges[user.rank] ? (
                    <span className="text-2xl">{rankBadges[user.rank]}</span>
                  ) : (
                    <span className="text-[#3B4D7A] font-bold">{user.rank}</span>
                  )}
                </div>
                <Avatar className="h-11 w-11 border-2 border-[#3B4D7A]/20 shadow-sm">
                  <AvatarFallback className="font-extrabold text-sm" style={{ background: user.bg, color: user.text }}>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-base text-[#151B30]">{user.name}</p>
                    {user.rank <= 3 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F59E0B] text-[#151B30]">
                        Top {user.rank}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#3B4D7A] font-medium">{user.title} • {user.badges} badges earned</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-lg text-[#0EA5E9]">{user.points.toLocaleString()} XP</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-[#3B4D7A] font-medium p-4 rounded-xl border border-dashed border-[#3B4D7A]/40 bg-[#F1F4F9]">
        💡 Want to climb the leaderboard? <span className="font-bold text-[#151B30]">Complete assessments</span> and earn verified certificates to boost your XP!
      </div>
    </div>
  );
}
