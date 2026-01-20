import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Trophy,
  Home,
  Calendar,
  Users,
  ClipboardList,
  Timer,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

// ----------------------------------------------------------------------------
// AppShell - Main application layout with responsive navigation
// Mobile: Bottom nav + hamburger menu
// Desktop: Sidebar navigation
// ----------------------------------------------------------------------------

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  // Only show in sidebar (not bottom nav)
  sidebarOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: "首頁", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
  { label: "賽事", href: "/competitions", icon: <Calendar className="h-5 w-5" /> },
  { label: "報名", href: "/entries", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "成績", href: "/results", icon: <Timer className="h-5 w-5" /> },
  { label: "統計", href: "/stats", icon: <BarChart3 className="h-5 w-5" />, sidebarOnly: true },
  { label: "團隊", href: "/teams", icon: <Users className="h-5 w-5" />, sidebarOnly: true },
  { label: "設定", href: "/settings", icon: <Settings className="h-5 w-5" />, sidebarOnly: true },
];

// Items shown in bottom nav (mobile)
const bottomNavItems = navItems.filter((item) => !item.sidebarOnly).slice(0, 4);

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold">Dreams</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">選單</span>
          </Button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 bg-background border-l transform transition-transform duration-200 ease-in-out md:hidden",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b">
          <span className="font-semibold">選單</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            登出
          </Button>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background md:block">
        <div className="flex h-16 items-center gap-2 px-6 border-b">
          <Trophy className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">Dreams</span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            登出
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Desktop header */}
        <header className="sticky top-0 z-30 hidden h-16 items-center border-b bg-background/95 backdrop-blur px-6 md:flex">
          {/* Can add breadcrumb or search here */}
        </header>

        {/* Page content */}
        <div className="pb-20 md:pb-0">{children}</div>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background md:hidden">
        <div className="flex h-16 items-center justify-around">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px]",
                "text-xs font-medium transition-colors",
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
