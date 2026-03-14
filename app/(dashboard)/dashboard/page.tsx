import Link from "next/link";
import { getStartups } from "@/app/actions/startups";
import { getInvestors } from "@/app/actions/investors";
import { getEvents } from "@/app/actions/events";
import { 
  Rocket, 
  Users, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  MoreHorizontal,
  CircleDollarSign,
  Activity
} from "lucide-react";

export default async function DashboardPage() {
  const [startups, investors, events] = await Promise.all([
    getStartups(),
    getInvestors(),
    getEvents(),
  ]);

  // Mock AI Ranked Startups
  const topStartups = startups.slice(0, 3).map((s, i) => ({
    ...s,
    aiScore: 92 - i * 4,
    trend: i === 0 ? "up" : "flat"
  }));

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Ecosystem Overview
          </h1>
          <p className="mt-2 text-sm text-purple-300 dark:text-blue-300 font-medium">
            Real-time insights across founders, capital, and pipeline.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/startups/new"
            className="rounded-xl border border-blue-500/30 bg-blue-900/50 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-800/50 transition-all backdrop-blur-md"
          >
            New Startup
          </Link>
          <Link
            href="/ai-assistant"
            className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Ask AI
          </Link>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-950/40 p-5 backdrop-blur-md shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" /> +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-white tabular-nums">{startups.length || 42}</p>
          <p className="text-sm text-blue-300 mt-1 font-medium">Active Startups</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-accent/20 bg-blue-950/40 p-5 backdrop-blur-md shadow-lg relative overflow-hidden group hover:border-accent/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -mr-8 -mt-8" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-accent/20 text-accent">
              <Users className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" /> +5%
            </span>
          </div>
          <p className="text-3xl font-bold text-white tabular-nums">{investors.length || 18}</p>
          <p className="text-sm text-blue-300 mt-1 font-medium">Verified Investors</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-emerald-500/20 bg-blue-950/40 p-5 backdrop-blur-md shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CircleDollarSign className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" /> +$2.4M
            </span>
          </div>
          <p className="text-3xl font-bold text-white tabular-nums">$14.2M</p>
          <p className="text-sm text-blue-300 mt-1 font-medium">Total Capital Deployed</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-primary/20 bg-blue-950/40 p-5 backdrop-blur-md shadow-lg relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-8 -mt-8" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white tabular-nums">85%</p>
          <p className="text-sm text-blue-300 mt-1 font-medium">Avg AI Pitch Score</p>
        </div>
      </div>

      {/* Complex Row: AI Ranked & Fundraising */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AI-Ranked Startups */}
        <div className="rounded-2xl border border-white/5 bg-blue-900/20 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              AI-Ranked Startups
            </h2>
            <Link href="/startups" className="text-xs text-blue-400 hover:text-white flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {topStartups.length > 0 ? topStartups.map((s, i) => (
              <div key={s.id || i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center font-bold text-white shadow-inner">
                    {s.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{s.name}</h3>
                    <p className="text-xs text-blue-300">{s.industry || "Technology"} • {s.stage.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-blue-400 mb-1">AI Match</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      s.aiScore >= 90 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {s.aiScore}%
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-xl">
                <p className="text-sm text-blue-300">No startups found to rank.</p>
              </div>
            )}
          </div>
        </div>

        {/* Fundraising Progress */}
        <div className="rounded-2xl border border-white/5 bg-blue-900/20 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-emerald-400" />
              Active Rounds
            </h2>
            <Link href="/fundraising" className="text-xs text-blue-400 hover:text-white flex items-center gap-1">
              Details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-6">
            {/* Round 1 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">QuantumFlow</h3>
                  <p className="text-xs text-blue-300">Seed Round • Target: $2M</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400">$1.5M</span>
                  <p className="text-xs text-blue-400">75% Committed</p>
                </div>
              </div>
              <div className="h-2.5 rounded-full bg-blue-950 overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 w-[75%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)] relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Round 2 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">Nexus Health</h3>
                  <p className="text-xs text-blue-300">Series A • Target: $8M</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400">$3.2M</span>
                  <p className="text-xs text-blue-400">40% Committed</p>
                </div>
              </div>
              <div className="h-2.5 rounded-full bg-blue-950 overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 w-[40%] rounded-full relative" />
              </div>
            </div>
            
            {/* Round 3 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">AeroSpace Labs</h3>
                  <p className="text-xs text-blue-300">Pre-Seed • Target: $500k</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400">$450k</span>
                  <p className="text-xs text-blue-400">90% Committed</p>
                </div>
              </div>
              <div className="h-2.5 rounded-full bg-blue-950 overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-primary to-accent w-[90%] rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)] relative" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Deal Flow Kanban Preview */}
      <div className="rounded-2xl border border-white/5 bg-blue-900/20 p-6 backdrop-blur-md overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-400" />
            Deal Flow Pipeline
          </h2>
          <Link href="/pipeline" className="text-xs text-blue-400 hover:text-white flex items-center gap-1">
            Full Kanban <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          
          {/* Column 1 */}
          <div className="min-w-[280px] flex-1 bg-black/20 rounded-xl border border-white/5 p-4 snap-start">
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 flex justify-between">
              Sourced <span className="bg-blue-900/50 px-2 rounded-full text-white">4</span>
            </h3>
            <div className="space-y-3">
              <div className="bg-white/10 p-3 rounded-lg border border-white/5 cursor-pointer hover:border-primary/50 transition-colors">
                <p className="text-sm font-bold text-white">Orbit AI</p>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">SaaS</span>
                  <span className="text-[10px] text-blue-300">Added 2d ago</span>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/5 cursor-pointer hover:border-primary/50 transition-colors">
                <p className="text-sm font-bold text-white">GreenChain</p>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">Climate</span>
                  <span className="text-[10px] text-blue-300">Added 3d ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="min-w-[280px] flex-1 bg-black/20 rounded-xl border border-white/5 p-4 snap-start">
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 flex justify-between">
              Evaluating <span className="bg-blue-900/50 px-2 rounded-full text-white">2</span>
            </h3>
            <div className="space-y-3">
              <div className="bg-white/10 p-3 rounded-lg border border-white/5 border-l-2 border-l-accent cursor-pointer">
                <p className="text-sm font-bold text-white">FinStack</p>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded">FinTech</span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-accent" />
                    <span className="text-[10px] text-blue-300 font-bold">88/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="min-w-[280px] flex-1 bg-black/20 rounded-xl border border-white/5 p-4 snap-start">
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 flex justify-between">
              Term Sheet <span className="bg-blue-900/50 px-2 rounded-full text-white">1</span>
            </h3>
            <div className="space-y-3">
              <div className="bg-white/10 p-3 rounded-lg border border-white/5 border-l-2 border-l-emerald-500 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <p className="text-sm font-bold text-white">QuantumFlow</p>
                <div className="flex justify-between mt-2 items-center">
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">DeepTech</span>
                  <span className="text-[10px] sm text-emerald-400 font-bold">$1.5M / $2M</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
