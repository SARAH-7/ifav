"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  Users,
  GitBranch,
  Wallet,
  Award,
  Calendar,
  FileText,
  MessageSquare,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/startups", label: "Startups", icon: Rocket },
  { href: "/investors", label: "Investors", icon: Users },
  { href: "/dual-flow", label: "Dual flow", icon: GitBranch },
  { href: "/fundraising", label: "Fundraising", icon: Wallet },
  { href: "/accelerator", label: "Accelerator", icon: Award },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-56 flex-col border-r border-blue-100 bg-white/80 dark:border-blue-800 dark:bg-blue-900/50">
      <div className="flex h-14 items-center border-b border-blue-100 px-4 dark:border-blue-800">
        <Link href="/dashboard" className="font-semibold text-blue-900 dark:text-white">
          iFav
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-white"
                : "text-blue-600 hover:bg-blue-50 hover:text-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 dark:hover:text-white"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
