import Link from "next/link";
import { getStartups } from "@/app/actions/startups";
import { getInvestors } from "@/app/actions/investors";
import { getEvents } from "@/app/actions/events";
import { Rocket, Users, Calendar } from "lucide-react";

export default async function DashboardPage() {
  const [startups, investors, events] = await Promise.all([
    getStartups(),
    getInvestors(),
    getEvents(),
  ]);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-purple-300 dark:text-blue-300 font-medium">
        Ecosystem overview: startups, investors, and events.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/startups"
          className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 dark:border-white/10 dark:bg-blue-900/50 dark:backdrop-blur-md"
        >
          <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Rocket className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
          <h2 className="mt-4 font-semibold text-foreground">
            Startups
          </h2>
          <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
            {startups.length}
          </p>
          <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">View and manage profiles</p>
        </Link>
        <Link
          href="/investors"
          className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 dark:border-white/10 dark:bg-blue-900/50 dark:backdrop-blur-md"
        >
          <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Users className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-300" />
          <h2 className="mt-4 font-semibold text-foreground">
            Investors
          </h2>
          <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
            {investors.length}
          </p>
          <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">Discover and connect</p>
        </Link>
        <Link
          href="/events"
          className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-blue-900/50 dark:backdrop-blur-md"
        >
          <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Calendar className="h-8 w-8 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
          <h2 className="mt-4 font-semibold text-foreground">
            Events
          </h2>
          <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
            {events.length}
          </p>
          <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">Upcoming and past</p>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-foreground">
          Quick actions
        </h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/startups/new"
            className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
          >
            Add startup
          </Link>
          <Link
            href="/investors/new"
            className="rounded-xl border border-blue-200 bg-white/50 px-5 py-2.5 text-sm font-medium text-blue-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all backdrop-blur-md hover:-translate-y-0.5"
          >
            Add investor
          </Link>
          <Link
            href="/ai-assistant"
            className="rounded-xl border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent hover:bg-accent/20 transition-all backdrop-blur-md hover:-translate-y-0.5 shadow-inner"
          >
            AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
