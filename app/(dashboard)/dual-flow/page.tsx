"use client";

import { useState } from "react";
import { User, Briefcase, Building2, CheckCircle2 } from "lucide-react";

export default function DualFlowPage() {
  const [role, setRole] = useState<"founder" | "investor">("founder");

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Dual Flow UX
        </h1>
        <p className="mt-2 text-sm text-purple-300 dark:text-blue-300 font-medium">
          Toggle between perspectives to see how the platform adapts.
        </p>
      </div>

      <div className="flex p-1 bg-blue-900/40 border border-blue-500/20 rounded-2xl w-fit backdrop-blur-md shadow-inner">
        <button
          onClick={() => setRole("founder")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            role === "founder" 
              ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20" 
              : "text-blue-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Founder View
        </button>
        <button
          onClick={() => setRole("investor")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            role === "investor" 
              ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-accent/20" 
              : "text-blue-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Investor View
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-accent/10 rounded-3xl blur-2xl pointer-events-none" />
        
        <div className="relative bg-blue-950/80 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-10">
            {role === "founder" ? (
              <Building2 className="w-64 h-64 text-primary" />
            ) : (
              <Briefcase className="w-64 h-64 text-accent" />
            )}
          </div>

          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {role === "founder" ? "Welcome back, Sarah" : "Welcome back, David"}
                </h2>
                <p className="text-blue-300 mt-1">
                  {role === "founder" ? "Acme Corp • Pre-Seed" : "Partner at Nexus Ventures"}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {role === "founder" ? "Next Steps for Fundraising" : "Your Deal Pipeline"}
                </h3>
                <ul className="space-y-4">
                  {role === "founder" ? (
                    <>
                      <li className="flex gap-3 text-sm text-blue-200 bg-white/5 p-3 rounded-lg border border-white/5">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                        <div>
                          <p className="font-medium text-white">Upload Pitch Deck</p>
                          <p className="text-xs opacity-70 mt-0.5">Get AI feedback on your materials.</p>
                        </div>
                      </li>
                      <li className="flex gap-3 text-sm text-blue-200 bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="h-5 w-5 rounded-full border-2 border-primary/50 shrink-0" />
                        <div>
                          <p className="font-medium text-white">Identify Target LPs</p>
                          <p className="text-xs opacity-70 mt-0.5">Review your AI-matched investors.</p>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex gap-3 text-sm text-blue-200 bg-white/5 p-3 rounded-lg border border-white/5">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                        <div>
                          <p className="font-medium text-white">Review Q3 Reports</p>
                          <p className="text-xs opacity-70 mt-0.5">Portco financials are ready.</p>
                        </div>
                      </li>
                      <li className="flex gap-3 text-sm text-blue-200 bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="h-5 w-5 rounded-full border-2 border-primary/50 shrink-0" />
                        <div>
                          <p className="font-medium text-white">Evaluate 3 New Pitches</p>
                          <p className="text-xs opacity-70 mt-0.5">AI scores look promising for FinTech.</p>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {role === "founder" ? "Profile Strength" : "Fund Deployment"}
                </h3>
                <div className="space-y-6">
                  {role === "founder" ? (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-blue-200">Completeness</span>
                        <span className="text-accent font-bold">85%</span>
                      </div>
                      <div className="h-2 rounded-full bg-blue-900/50 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent w-[85%] rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
                      </div>
                      <p className="text-xs text-blue-300 mt-4 leading-relaxed">
                        Complete your financial projections to unlock direct messaging with Series A investors.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-blue-200">Q2 Target ($15M)</span>
                        <span className="text-primary font-bold">$12M</span>
                      </div>
                      <div className="h-2 rounded-full bg-blue-900/50 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-primary w-[80%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      </div>
                      <p className="text-xs text-blue-300 mt-4 leading-relaxed">
                        You have $3M remaining to allocate. Check your AI-recommended Startups tab.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
