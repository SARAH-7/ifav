"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, TrendingUp, Sparkles, X, AlertCircle } from "lucide-react";

export default function DocumentsPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setShowAnalysis(true);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-400" />
          Data Room & Pitch Materials
        </h1>
        <p className="mt-2 text-sm text-blue-300 font-medium">
          Upload documents and get instant, AI-driven feedback.
        </p>
      </div>

      {/* Upload Zone */}
      <div 
        onClick={handleUpload}
        className={`relative rounded-3xl border-2 border-dashed ${isUploading ? 'border-primary/50 bg-primary/5' : 'border-blue-500/30 bg-blue-900/10 hover:border-primary/50 hover:bg-blue-900/30'} p-12 text-center backdrop-blur-md transition-all cursor-pointer group overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-accent animate-ping absolute inset-0 opacity-50" />
              <Sparkles className="h-12 w-12 text-primary relative z-10 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white">AI is reading your Pitch Deck...</h3>
            <div className="h-1.5 w-64 bg-blue-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent w-[60%] animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Click to upload or drag and drop</h3>
              <p className="text-sm text-blue-300 mt-1">PDF, PPTX, DOCX (Max 50MB)</p>
            </div>
            <button className="rounded-xl bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-bold text-white group-hover:bg-primary group-hover:border-primary transition-all">
              Select File
            </button>
          </div>
        )}
      </div>

      {/* Existing Files */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Your Files</h3>
        <div className="space-y-3">
          <div className="bg-blue-950/40 border border-white/10 p-4 rounded-xl flex items-center justify-between group hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">AcmeCorp_PitchDeck_v1.pdf</p>
                <p className="text-xs text-blue-300">Uploaded 2 days ago • 4.2 MB</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setShowAnalysis(true)} className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold hover:bg-blue-500/40 hover:text-white transition-colors">
                View Analysis
              </button>
            </div>
          </div>

          <div className="bg-blue-950/40 border border-white/10 p-4 rounded-xl flex items-center justify-between group hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Historical_Financials_2025.xlsx</p>
                <p className="text-xs text-blue-300">Uploaded 1 week ago • 1.1 MB</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold hover:bg-blue-500/40 hover:text-white transition-colors">
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full AI Scoring Modal */}
      {showAnalysis && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAnalysis(false)} />
          
          <div className="relative bg-[#0F172A] border border-slate-700/50 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-mono">Claude AI Analysis</h2>
                  <p className="text-xs text-slate-400">Analyzing: AcmeCorp_PitchDeck_v2.pdf</p>
                </div>
              </div>
              <button onClick={() => setShowAnalysis(false)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-8 CustomScrollbar">
              
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex flex-col items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-3xl font-black text-white">88</span>
                  <span className="text-[10px] uppercase font-bold text-white/80 tracking-widest">Score</span>
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-slate-300 leading-relaxed font-mono">
                    <span className="text-orange-400 font-bold">Summary:</span> Strong team pedigree and massive TAM, but Customer Acquisition Strategy lacks granular metrics.
                  </p>
                </div>
              </div>

              {/* Criteria Scores */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Scoring Breakdown</h4>
                
                <div className="group">
                  <div className="flex justify-between text-sm text-slate-200 mb-1 font-mono">
                    <span>Problem / Solution Fit</span>
                    <span className="text-emerald-400 font-bold">95</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[95%] group-hover:animate-pulse" />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between text-sm text-slate-200 mb-1 font-mono">
                    <span>Market Opportunity (TAM)</span>
                    <span className="text-emerald-400 font-bold">90</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[90%] group-hover:animate-pulse" />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between text-sm text-slate-200 mb-1 font-mono">
                    <span>Team Background</span>
                    <span className="text-emerald-400 font-bold">85</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[85%] group-hover:animate-pulse" />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between text-sm text-slate-200 mb-1 font-mono">
                    <span>Go-to-Market Strategy</span>
                    <span className="text-red-400 font-bold">65</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 w-[65%] group-hover:animate-[pulse_1s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>

              {/* Actionable Feedback */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Key Critical Feedback</h4>
                
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex gap-4">
                  <div className="mt-0.5">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-200 text-sm font-mono mb-1">GTM is too vague</h5>
                    <p className="text-sm text-slate-400 leading-relaxed font-mono">
                      Slide 8 mentions "organic growth and enterprise sales" without showing funnel math or previous CAC/LTV ratios. Recommend breaking down the exact customer acquisition channels you tested in Q3.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex gap-4">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-200 text-sm font-mono mb-1">Strong "Why Now"</h5>
                    <p className="text-sm text-slate-400 leading-relaxed font-mono">
                      Slide 4 nails the market timing by referencing the recent regulatory changes. This will resonate strongly with compliance-focused funds.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
              <button 
                onClick={() => setShowAnalysis(false)}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-2.5 text-sm font-bold text-white transition-colors font-mono shadow-lg shadow-orange-500/20"
              >
                Implement Feedback
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
