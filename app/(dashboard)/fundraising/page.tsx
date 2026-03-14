"use client";

import { useState } from "react";
import { Banknote, TrendingUp, Filter, BarChart3, ChevronRight } from "lucide-react";

const ROUNDS = [
  { id: 1, startup: "QuantumFlow", stage: "Seed", target: 2000000, raised: 1500000, date: "2026-05-15", status: "active" },
  { id: 2, startup: "Nexus Health", stage: "Series A", target: 8000000, raised: 3200000, date: "2026-06-30", status: "active" },
  { id: 3, startup: "AeroSpace Labs", stage: "Pre-Seed", target: 500000, raised: 450000, date: "2026-04-01", status: "closing" },
  { id: 4, startup: "Orbit AI", stage: "Seed", target: 3000000, raised: 3000000, date: "2026-02-15", status: "closed" },
  { id: 5, startup: "GreenChain", stage: "Series B", target: 20000000, raised: 5000000, date: "2026-08-01", status: "active" },
];

export default function FundraisingPage() {
  const [filter, setFilter] = useState("active");

  const filtered = ROUNDS.filter(r => filter === "all" || r.status === filter);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <Banknote className="h-8 w-8 text-emerald-400" />
          Fundraising Tracker
        </h1>
        <p className="mt-2 text-sm text-blue-300 font-medium">
          Monitor active rounds, capital committed, and stage distributions.
        </p>
      </div>

      {/* Analytics Row */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-900/30 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Total Active Capital Seeking</p>
          <p className="text-3xl font-black text-white">$30.5M</p>
          <div className="mt-4 h-1.5 bg-blue-950 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-full" />
          </div>
        </div>
        <div className="bg-blue-900/30 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Capital Committed</p>
          <p className="text-3xl font-black text-emerald-300">$10.1M</p>
          <div className="mt-4 h-1.5 bg-blue-950 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[33%]" />
          </div>
          <p className="text-[10px] text-emerald-400/80 mt-1.5 text-right w-[33%]">33%</p>
        </div>
        <div className="bg-blue-900/30 border border-primary/20 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-center items-center text-center">
          <BarChart3 className="h-8 w-8 text-primary mb-3" />
          <p className="text-sm font-bold text-white">Stage Distribution</p>
          <p className="text-xs text-blue-300 mt-1">Seed & Series A Dominant (75%)</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-blue-950/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-white">Deal Flow Rounds</h2>
          <div className="flex gap-2 bg-black/20 p-1 rounded-xl border border-white/5">
            <button onClick={() => setFilter("active")} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'active' ? 'bg-blue-500/20 text-blue-300' : 'text-blue-400/50 hover:text-white'}`}>Active</button>
            <button onClick={() => setFilter("closing")} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'closing' ? 'bg-emerald-500/20 text-emerald-300' : 'text-blue-400/50 hover:text-white'}`}>Closing</button>
            <button onClick={() => setFilter("closed")} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'closed' ? 'bg-white/10 text-white' : 'text-blue-400/50 hover:text-white'}`}>Closed</button>
            <button onClick={() => setFilter("all")} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-white/10 text-white' : 'text-blue-400/50 hover:text-white'}`}>All</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-black/10 text-xs font-bold text-blue-400 uppercase tracking-widest">
                <th className="p-5 font-semibold">Startup</th>
                <th className="p-5 font-semibold">Stage</th>
                <th className="p-5 font-semibold min-w-[250px]">Progress</th>
                <th className="p-5 font-semibold text-right">Target Close</th>
                <th className="p-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(row => {
                const percent = Math.min(100, (row.raised / row.target) * 100);
                const isClosing = percent > 85;
                return (
                  <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-5">
                      <p className="font-bold text-white text-sm">{row.startup}</p>
                    </td>
                    <td className="p-5">
                      <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-blue-200">
                        {row.stage}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-emerald-400 font-bold">${(row.raised/1000000).toFixed(1)}M</span>
                        <span className="text-blue-300">Target: ${(row.target/1000000).toFixed(1)}M</span>
                      </div>
                      <div className="h-2 bg-black/30 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            isClosing ? "bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]" : 
                            "bg-gradient-to-r from-blue-600 to-blue-400"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <p className="text-sm text-blue-200">
                        {new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                      </p>
                      {row.status === 'closing' && <span className="text-[10px] text-emerald-400 font-bold uppercase mt-1 block">Final Commits</span>}
                      {row.status === 'closed' && <span className="text-[10px] text-blue-400 font-bold uppercase mt-1 block">Closed</span>}
                    </td>
                    <td className="p-5">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full text-blue-400 hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
