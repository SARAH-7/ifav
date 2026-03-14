"use client";

import { useState } from "react";
import { Plus, Search, Filter, Rocket, X, Save, Edit2, AlertCircle, TrendingUp, Sparkles, Building2 } from "lucide-react";

type Startup = {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  stage: string;
  industry: string | null;
  foundedYear: number | null;
  teamSize: number | null;
};

type Props = {
  initialStartups: Startup[];
};

export default function StartupsClient({ initialStartups }: Props) {
  const [startups, setStartups] = useState(initialStartups);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  const filteredStartups = startups.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          (s.tagline && s.tagline.toLowerCase().includes(search.toLowerCase()));
    const matchesStage = filterStage === "all" || s.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const openModal = (startup: Startup | null) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStartup(null);
  };

  // Mock AI Scores based on name length just for UI MVP
  const getAiMockScore = (name: string) => Math.min(99, 70 + (name.length * 2));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary" />
            Startups Directory
          </h1>
          <p className="mt-2 text-sm text-blue-300 font-medium">
            AI-scored profiles and dynamic filtering.
          </p>
        </div>
        <button
          onClick={() => openModal(null)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add Startup
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
          <input
            type="text"
            placeholder="Search startups by name or tagline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-blue-500/20 bg-blue-900/30 py-3 pl-10 pr-4 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="h-full rounded-xl border border-blue-500/20 bg-blue-900/30 py-3 pl-9 pr-8 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-sm appearance-none"
          >
            <option value="all">All Stages</option>
            <option value="idea">Idea</option>
            <option value="pre_seed">Pre-Seed</option>
            <option value="seed">Seed</option>
            <option value="series_a">Series A</option>
            <option value="series_b">Series B</option>
          </select>
        </div>
      </div>

      {filteredStartups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-500/30 bg-blue-900/10 py-16 text-center backdrop-blur-sm">
          <p className="text-blue-300 font-medium">
            No startups match your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStartups.map((s) => {
            const score = getAiMockScore(s.name);
            return (
              <div
                key={s.id}
                onClick={() => openModal(s)}
                className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-950/40 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center font-bold text-white shadow-inner text-lg">
                    {s.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">AI Score</span>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded text-white ${score > 85 ? 'bg-emerald-500/20 shadow-emerald-500/20 border border-emerald-500/50 text-emerald-300' : 'bg-blue-500/20 border border-blue-500/50 text-blue-300'}`}>
                      <Sparkles className="h-3 w-3" /> {score}/100
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white relative z-10">{s.name}</h3>
                {s.tagline && (
                  <p className="mt-1.5 text-sm text-blue-300 line-clamp-2 relative z-10 font-medium">
                    {s.tagline}
                  </p>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                  <span className="rounded-md bg-blue-500/20 border border-blue-500/30 px-2 py-1 text-xs font-semibold text-blue-300 uppercase tracking-widest">
                    {s.stage.replace('_', ' ')}
                  </span>
                  {s.industry && (
                    <span className="rounded-md bg-primary/20 border border-primary/30 px-2 py-1 text-xs font-semibold text-primary uppercase tracking-widest">
                      {s.industry}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CRUD & AI Score Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-blue-950 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Left side: Form */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto border-r border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedStartup ? "Edit Startup Profile" : "Create Startup"}
                </h2>
                <button onClick={closeModal} className="md:hidden p-2 rounded-lg bg-white/5 text-blue-300">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Startup Name</label>
                  <input type="text" defaultValue={selectedStartup?.name} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Tagline</label>
                  <input type="text" defaultValue={selectedStartup?.tagline || ''} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-primary focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Stage</label>
                    <select defaultValue={selectedStartup?.stage || 'pre_seed'} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-primary focus:outline-none">
                      <option value="idea">Idea</option>
                      <option value="pre_seed">Pre-Seed</option>
                      <option value="seed">Seed</option>
                      <option value="series_a">Series A</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Industry</label>
                    <input type="text" defaultValue={selectedStartup?.industry || ''} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Description</label>
                  <textarea rows={4} defaultValue={selectedStartup?.description || ''} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-primary focus:outline-none resize-none" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                    Cancel
                  </button>
                  <button type="button" onClick={closeModal} className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Right side: AI Breakdown (Only show if editing) */}
            {selectedStartup ? (
              <div className="w-full md:w-[400px] bg-blue-900/30 p-6 md:p-8 overflow-y-auto relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-bold text-white">AI Pitch Breakdown</h3>
                  </div>

                  {/* Overall Score */}
                  <div className="bg-blue-950/80 border border-primary/30 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(147,51,234,0.15)] mb-6">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                      {getAiMockScore(selectedStartup.name)}
                    </div>
                    <div className="text-xs font-bold text-blue-200 uppercase tracking-widest">Overall Match Score</div>
                  </div>

                  {/* Criteria Scores */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Criteria Breakdown</h4>
                    
                    <div>
                      <div className="flex justify-between text-xs text-white mb-1"><span className="font-medium">Market Size</span><span className="text-emerald-400 font-bold">92/100</span></div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[92%]" /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-white mb-1"><span className="font-medium">Team Experience</span><span className="text-emerald-400 font-bold">85/100</span></div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[85%]" /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-white mb-1"><span className="font-medium">Business Model</span><span className="text-yellow-400 font-bold">60/100</span></div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[60%]" /></div>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">AI Suggestions</h4>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 flex gap-3 items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-100 leading-relaxed">
                        Your business model lacks detail on Customer Acquisition Cost (CAC) assumptions. Consider adding a slide on unit economics.
                      </p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 flex gap-3 items-start">
                      <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-fuchsia-100 leading-relaxed">
                        Highlight the engineering team's previous exit to strengthen the "Team Experience" score.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="w-full md:w-[400px] bg-blue-900/30 p-6 md:p-8 flex flex-col items-center justify-center text-center relative hidden md:flex border-l border-white/5">
                <Building2 className="h-16 w-16 text-blue-500/20 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">AI Pitch Analysis</h3>
                <p className="text-sm text-blue-300 leading-relaxed px-4">
                  Once your startup is created, our AI will automatically analyze your profile and documents to generate an investor match score.
                </p>
              </div>
            )}
            
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors hidden md:block">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
