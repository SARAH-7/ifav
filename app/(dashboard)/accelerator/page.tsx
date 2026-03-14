"use client";

import { useState } from "react";
import { GraduationCap, Sparkles, ExternalLink, Calendar, Users, MapPin, CheckCircle2 } from "lucide-react";

const PROGRAMS = [
  {
    id: 1,
    name: "Y Combinator S26",
    description: "The premier startup accelerator. We invest $500k in every startup for a 7% equity stake.",
    deadline: "2026-03-30",
    batch: "Summer 2026",
    location: "San Francisco, CA",
    alumni: 4000,
    matchScore: 94,
    matchReason: "Your revenue traction and technical founder background strongly align with YC's historical preferences.",
  },
  {
    id: 2,
    name: "Techstars AI Health",
    description: "A three-month accelerator focused on AI-driven healthcare solutions.",
    deadline: "2026-04-15",
    batch: "Fall 2026",
    location: "Boston, MA",
    alumni: 350,
    matchScore: 65,
    matchReason: "Good industry overlap, but your pre-seed stage is slightly early for their typical cohort.",
  },
  {
    id: 3,
    name: "LaunchAxis Nexus",
    description: "Our in-house incubator for frontier tech and deep science.",
    deadline: "2026-05-01",
    batch: "Cohort 4",
    location: "Remote",
    alumni: 45,
    matchScore: 88,
    matchReason: "Remote-first structure fits your distributed team perfectly.",
  }
];

export default function AcceleratorPage() {
  const [applied, setApplied] = useState<number[]>([]);

  const handleApply = (id: number) => setApplied(prev => [...prev, id]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-indigo-400" />
          Accelerator Programs
        </h1>
        <p className="mt-2 text-sm text-blue-300 font-medium">
          Discover programs tailored to your stage and industry.
        </p>
      </div>

      {/* AI Recommendation Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-blue-900/40 to-accent/20 border border-primary/30 p-6 md:p-8 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="h-10 w-10 text-accent animate-pulse" />
        </div>
        
        <div className="relative z-10 flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">AI Top Recommendation: Y Combinator S26</h2>
          <p className="text-sm text-blue-200 leading-relaxed mb-4">
            Based on our analysis of your pitch deck and traction metrics, your startup has a <strong>94% match probability</strong> with YC's S26 thesis. Your unit economics align with their recent successful B2B SaaS batches.
          </p>
          <button 
            onClick={() => handleApply(1)}
            disabled={applied.includes(1)}
            className="rounded-xl bg-white text-blue-950 px-6 py-2.5 text-sm font-bold shadow-lg shadow-white/10 hover:shadow-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {applied.includes(1) ? "Application In Progress" : "Start YC Application"}
          </button>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMS.map((program) => (
          <div key={program.id} className="relative group rounded-3xl bg-blue-950/40 border border-white/5 p-6 backdrop-blur-md flex flex-col hover:border-indigo-500/50 transition-colors">
            
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
                {program.name.substring(0, 1)}
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-widest">AI Match</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${program.matchScore > 90 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : program.matchScore > 80 ? 'bg-primary/20 text-primary border-primary/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>
                  {program.matchScore}%
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{program.name}</h3>
            <p className="text-sm text-blue-200 mb-6 flex-1">{program.description}</p>

            <div className="space-y-3 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 text-xs text-blue-300">
                <Calendar className="h-4 w-4 text-blue-400" />
                Deadling: {new Date(program.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}
              </div>
              <div className="flex items-center gap-3 text-xs text-blue-300">
                <MapPin className="h-4 w-4 text-primary" />
                {program.location}
              </div>
              <div className="flex items-center gap-3 text-xs text-blue-300">
                <Users className="h-4 w-4 text-emerald-400" />
                {program.alumni}+ Alumni Network
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={() => handleApply(program.id)}
                disabled={applied.includes(program.id)}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  applied.includes(program.id)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {applied.includes(program.id) ? (
                  <><CheckCircle2 className="h-4 w-4" /> Applied</>
                ) : (
                  <><ExternalLink className="h-4 w-4" /> Apply Now</>
                )}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
