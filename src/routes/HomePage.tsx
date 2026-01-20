import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy,
  LogOut,
  Loader2,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Clock,
  Waves,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

// Mock data for competitions
const competitions = [
  {
    id: "1",
    name: "2026 夢想盃游泳錦標賽",
    date: "2026-03-15",
    endDate: "2026-03-16",
    location: "台北市立大學天母校區游泳池",
    poolType: "50m",
    status: "registration" as const,
    registrationDeadline: "2026-03-01",
    participantCount: 328,
    eventCount: 42,
    imageUrl: "/images/dreams-cup.jpg",
  },
  {
    id: "2",
    name: "2026 春季分齡游泳賽",
    date: "2026-04-20",
    endDate: "2026-04-21",
    location: "新北市立三重國民運動中心",
    poolType: "25m",
    status: "upcoming" as const,
    registrationDeadline: "2026-04-05",
    participantCount: 0,
    eventCount: 36,
    imageUrl: "/images/spring-meet.jpg",
  },
  {
    id: "3",
    name: "2025 冬季游泳挑戰賽",
    date: "2025-12-10",
    endDate: "2025-12-10",
    location: "高雄市立國際游泳池",
    poolType: "50m",
    status: "completed" as const,
    registrationDeadline: "2025-11-25",
    participantCount: 256,
    eventCount: 28,
    imageUrl: "/images/winter-challenge.jpg",
  },
];

const statusConfig = {
  registration: {
    label: "報名中",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  upcoming: {
    label: "即將開始",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  in_progress: {
    label: "進行中",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  completed: {
    label: "已結束",
    color: "bg-gray-100 text-gray-600 border-gray-200",
  },
};

export default function HomePage() {
  const { user, loading, signInWithGoogle, signOut } = useAuthStore();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateRange = (start: string, end: string) => {
    if (start === end) {
      return formatDate(start);
    }
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dreams</h1>
              <p className="text-xs text-gray-500">游泳賽事管理系統</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  <span className="ml-2 hidden sm:inline">登出</span>
                </Button>
              </>
            ) : (
              <Button onClick={handleLogin} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                登入 / 註冊
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                探索游泳賽事
              </h2>
              <p className="text-blue-100">
                查看即將舉行的比賽、報名參加、追蹤成績
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                賽事日曆
              </Button>
              {user && (
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  我的報名
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="default" size="sm">
            全部賽事
          </Button>
          <Button variant="outline" size="sm">
            報名中
          </Button>
          <Button variant="outline" size="sm">
            進行中
          </Button>
          <Button variant="outline" size="sm">
            已結束
          </Button>
        </div>

        {/* Competition List */}
        <div className="grid gap-4">
          {competitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              formatDateRange={formatDateRange}
            />
          ))}
        </div>

        {/* Empty State */}
        {competitions.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              目前沒有賽事
            </h3>
            <p className="text-gray-500">請稍後再回來查看新的比賽資訊</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Dreams</span>
              <span className="text-gray-500 text-sm">游泳賽事管理系統</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 Dreams Swimming Competition System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CompetitionCard({
  competition,
  formatDateRange,
}: {
  competition: (typeof competitions)[0];
  formatDateRange: (start: string, end: string) => string;
}) {
  const status = statusConfig[competition.status];
  const isRegistrationOpen = competition.status === "registration";
  const isCompleted = competition.status === "completed";

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left: Color Bar */}
          <div
            className={`w-full md:w-2 h-2 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-tr-none ${
              isRegistrationOpen
                ? "bg-green-500"
                : isCompleted
                  ? "bg-gray-400"
                  : "bg-blue-500"
            }`}
          />

          {/* Content */}
          <div className="flex-1 p-5">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                    <Trophy className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {competition.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDateRange(competition.date, competition.endDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {competition.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Waves className="h-4 w-4" />
                        {competition.poolType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{competition.participantCount} 人報名</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Trophy className="h-4 w-4" />
                    <span>{competition.eventCount} 個項目</span>
                  </div>
                  {isRegistrationOpen && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        報名截止：
                        {new Date(
                          competition.registrationDeadline
                        ).toLocaleDateString("zh-TW")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {isRegistrationOpen && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    立即報名
                  </Button>
                )}
                {isCompleted && <Button variant="outline">查看成績</Button>}
                {!isRegistrationOpen && !isCompleted && (
                  <Button variant="outline">查看詳情</Button>
                )}
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
