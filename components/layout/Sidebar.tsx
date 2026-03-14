"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Rocket, 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  Kanban,
  Users,
  MessageSquare,
  Calendar,
  Sparkles,
  ArrowRightLeft,
  Banknote,
  GraduationCap,
  Database,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/startups", label: "Startups", icon: Building2 },
  { href: "/investors", label: "Investors", icon: Briefcase },
  { href: "/pipeline", label: "Pipeline", icon: Kanban },
];

const ecosystemNav = [
  { href: "/dual-flow", label: "Dual Flow", icon: ArrowRightLeft },
  { href: "/fundraising", label: "Fundraising", icon: Banknote },
  { href: "/accelerator", label: "Accelerator", icon: GraduationCap },
];

const connectNav = [
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/community", label: "Community", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
];

const architectureNav = [
  { href: "/architecture", label: "Architecture", icon: Network },
  { href: "/db-schema", label: "DB Schema", icon: Database },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-blue-900/20 bg-blue-900/80 dark:bg-blue-950/80 p-6 flex flex-col gap-8 backdrop-blur-2xl z-50 overflow-y-auto hidden md:flex shadow-2xl shadow-primary/5">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_0_15px_rgba(147,51,234,0.4)]">
          <Rocket className="h-6 w-6 text-white" />
        </div>
        <Link href="/dashboard" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-tight">
          LaunchAxis
        </Link>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        {/* Main Section */}
        <div className="flex flex-col gap-2">
          <div className="px-3 text-xs font-semibold uppercase tracking-wider text-blue-300 dark:text-purple-300 mb-1">
            Platform
          </div>
          {mainNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 border-l-2 border-primary text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                    : "text-purple-300 dark:text-blue-300 hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-blue-300 dark:text-purple-300 group-hover:text-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Ecosystem Section */}
        <div className="flex flex-col gap-2">
          <div className="px-3 text-xs font-semibold uppercase tracking-wider text-blue-300 dark:text-purple-300 mb-1">
            Ecosystem
          </div>
          {ecosystemNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 border-l-2 border-primary text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                    : "text-purple-300 dark:text-blue-300 hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-blue-300 dark:text-purple-300 group-hover:text-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Connect Section */}
        <div className="flex flex-col gap-2">
          <div className="px-3 text-xs font-semibold uppercase tracking-wider text-blue-300 dark:text-purple-300 mb-1">
            Connect
          </div>
          {connectNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 border-l-2 border-primary text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                    : "text-blue-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-purple-300 group-hover:text-blue-200")} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Architecture Section */}
        <div className="flex flex-col gap-2">
          <div className="px-3 text-xs font-semibold uppercase tracking-wider text-blue-300 dark:text-purple-300 mb-1">
            Architecture
          </div>
          {architectureNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 border-l-2 border-primary text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                    : "text-blue-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-purple-300 group-hover:text-blue-200")} />
                {item.label}
              </Link>
            );
          })}
        </div>

      </div>

      {/* User Profile Footer Mock */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-sm font-bold text-white shadow-inner">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Jane Doe</span>
            <span className="text-xs text-purple-300">Founder Account</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
