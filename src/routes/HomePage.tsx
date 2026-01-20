import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ClipboardCheck,
  Trophy,
  Users,
  Timer,
  BarChart3,
  QrCode,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Dreams</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              功能
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              方案
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              聯絡我們
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost">登入</Button>
            <Button>免費試用</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          游泳比賽電子化管理系統
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          從報名、報到、檢錄到成績統計，一站式解決方案。
          <br />
          讓您的游泳賽事管理更簡單、更專業。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            開始使用
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            預約展示
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          完整的賽事管理功能
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<ClipboardCheck className="h-10 w-10 text-blue-600" />}
            title="線上報名"
            description="選手線上報名、項目選擇、費用計算與線上付款，一氣呵成。"
          />
          <FeatureCard
            icon={<QrCode className="h-10 w-10 text-blue-600" />}
            title="QR Code 報到"
            description="選手掃描 QR Code 快速報到，即時掌握出席狀況。"
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-blue-600" />}
            title="智慧檢錄"
            description="照片比對、水道確認、退賽處理、接力組隊一次搞定。"
          />
          <FeatureCard
            icon={<Timer className="h-10 w-10 text-blue-600" />}
            title="成績管理"
            description="支援計時系統整合，成績即時記錄與公告。"
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-blue-600" />}
            title="統計報表"
            description="團體總錦標、精神總錦標自動計算，報表一鍵產出。"
          />
          <FeatureCard
            icon={<Trophy className="h-10 w-10 text-blue-600" />}
            title="多租戶架構"
            description="獨立品牌設定，讓您的賽事擁有專屬識別。"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            準備好讓您的游泳賽事升級了嗎？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            立即開始使用 Dreams，體驗全電子化的賽事管理。
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            免費試用 30 天
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Trophy className="h-6 w-6 text-blue-500" />
              <span className="text-white font-bold">Dreams</span>
            </div>
            <p className="text-sm">
              © 2026 Dreams Swimming Competition System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
