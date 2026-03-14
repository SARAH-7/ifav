"use client";

import { useState } from "react";
import { Briefcase, Search, X, CheckCircle2, TrendingUp, Filter, Sparkles } from "lucide-react";

type Investor = {
  id: string;
  name: string;
  firm: string | null;
  focusAreas: string[];
  stages: string[];
};

type Startup = {
  id: string;
  name: string;
  industry: string | null;
  stage: string;
};

type Props = {
  initialInvestors: any[];
  startups: any[];
};

export default function InvestorsClient({ initialInvestors, startups }: Props) {
  const [investors] = useState<Investor[]>(
    initialInvestors.map(i => ({
      ...i,
      focusAreas: Array.isArray(i.focusAreas) ? i.focusAreas : JSON.parse(i.focusAreas as string || "[]"),
      stages: Array.isArray(i.stages) ? i.stages : JSON.parse(i.stages as string || "[]"),
    }))
  );
  const [search, setSearch] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  const filteredInvestors = investors.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    (i.firm && i.firm.toLowerCase().includes(search.toLowerCase()))
  );

  const closeModal = () => setSelectedInvestor(null);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-accent" />
            Investor Network
          </h1>
          <p className="mt-2 text-sm text-blue-300 font-medium">
            AI-powered matchmaking to find the right capital partners.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
        <input
          type="text"
          placeholder="Search by name or firm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-blue-500/20 bg-blue-900/30 py-3 pl-10 pr-4 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent backdrop-blur-sm"
        />
      </div>

      {filteredInvestors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-500/30 bg-blue-900/10 py-16 text-center backdrop-blur-sm">
          <p className="text-blue-300 font-medium">No investors found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInvestors.map(inv => (
            <div
              key={inv.id}
              onClick={() => setSelectedInvestor(inv)}
              className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-950/40 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-accent flex items-center justify-center font-bold text-white shadow-inner text-xl">
                  {inv.name.substring(0, 1)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{inv.name}</h3>
                  <p className="text-sm text-accent">{inv.firm || "Independent Angel"}</p>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1.5">Focus Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {inv.focusAreas.slice(0, 3).map((area: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-900/50 text-blue-200 border border-blue-500/20">
                        {area}
                      </span>
                    ))}
                    {inv.focusAreas.length > 3 && <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-900/50 text-blue-200 border border-blue-500/20">+{inv.focusAreas.length - 3}</span>}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1.5">Stages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {inv.stages.map((stage: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-accent/20 text-accent/90 border border-accent/20">
                        {stage.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedInvestor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-blue-950 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            <div className="flex-1 p-6 md:p-8 overflow-y-auto border-r border-white/10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-accent flex items-center justify-center font-bold text-white shadow-inner text-2xl">
                    {selectedInvestor.name.substring(0, 1)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedInvestor.name}</h2>
                    <p className="text-accent">{selectedInvestor.firm || "Independent Angel"}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="md:hidden p-2 rounded-lg bg-white/5 text-blue-300">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">Check Size</p>
                  <p className="text-lg font-bold text-white">$250k - $1M</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">Sweet Spot</p>
                  <p className="text-lg font-bold text-white">Lead / Co-Lead</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-3">Investment Thesis</h3>
                  <p className="text-sm text-blue-200 leading-relaxed">
                    We back technical founders building horizontal platforms in highly regulated industries. We look for strong early signals of product-market fit and defensible moats through AI/ML.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> 
                    AI-Matched Startups
                  </h3>
                  <div className="space-y-3">
                    {startups.slice(0, 3).map((s, i) => (
                      <div key={s.id} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-4">
                        <div>
                          <p className="font-bold text-white">{s.name}</p>
                          <p className="text-xs text-blue-300 mt-0.5">{s.industry} • {s.stage.replace('_', ' ')}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 border border-emerald-400/20 rounded-md">
                            {95 - i * 3}% Match
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                <button className="flex-1 rounded-xl border border-accent/50 bg-accent/10 px-4 py-3 text-sm font-bold text-accent hover:bg-accent/20 transition-all">
                  Request Warm Intro
                </button>
                <button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all">
                  Send Message
                </button>
              </div>
            </div>

            <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex backdrop-blur-md">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
