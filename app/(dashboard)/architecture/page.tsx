import { Network, Database, Cpu, Layers, Link as LinkIcon } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          System Architecture
        </h1>
        <p className="mt-2 text-sm text-purple-300 dark:text-blue-300 font-medium">
          Full stack ecosystem flow: Next.js + Prisma + Gemini AI.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Frontend Card */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-900/40 p-6 backdrop-blur-md shadow-lg shadow-blue-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all duration-500" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <Layers className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Frontend</h2>
          </div>
          <ul className="space-y-3 text-sm text-blue-200">
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Next.js App Router (React 19)</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> TailwindCSS 4 + PostCSS</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Lucide Icons for iconography</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Server Components (RSC)</li>
          </ul>
        </div>

        {/* Backend Card */}
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-md shadow-lg shadow-accent/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-accent/20 transition-all duration-500" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-accent/20 text-accent">
              <Database className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Database & ORM</h2>
          </div>
          <ul className="space-y-3 text-sm text-purple-200">
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Prisma ORM via Better-SQLite3</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> SQLite for local dev persistence</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Relational modeling & JSON columns</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Cascading deletes + Foreign Keys</li>
          </ul>
        </div>

        {/* AI Integration Card */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-md shadow-lg shadow-primary/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all duration-500" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/20 text-primary">
              <Cpu className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">AI Engine</h2>
          </div>
          <ul className="space-y-3 text-sm text-fuchsia-200">
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Gemini AI (@google/genai)</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Structured outputs for Pitch Analysis</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Streaming responses (Assistant)</li>
            <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Embeddings-ready architecture</li>
          </ul>
        </div>
      </div>

      {/* Connection Flow */}
      <div className="mt-12 rounded-3xl bg-blue-900/30 border border-blue-500/10 p-8 backdrop-blur-sm relative">
        <h3 className="text-lg font-bold text-white mb-8 text-center uppercase tracking-widest text-blue-300">Data Flow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="bg-blue-950/80 border border-blue-500/20 px-6 py-4 rounded-xl shadow-inner w-full md:w-auto text-center z-10">
            <div className="text-sm font-semibold text-white">Client UI</div>
            <div className="text-xs text-blue-400 mt-1">Founders & Investors</div>
          </div>

          <div className="flex-1 flex justify-center w-full md:w-auto relative py-4 md:py-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-full md:w-full md:h-0.5 bg-gradient-to-r from-blue-500/20 via-accent/50 to-blue-500/20" />
            </div>
            <div className="relative z-10 bg-blue-900/50 p-2 rounded-full border border-accent/30 text-accent">
              <LinkIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="bg-blue-950/80 border border-accent/20 px-6 py-4 rounded-xl shadow-inner w-full md:w-auto text-center z-10">
            <div className="text-sm font-semibold text-white">Server Actions</div>
            <div className="text-xs text-accent mt-1">Next.js RPCs</div>
          </div>

          <div className="flex-1 flex justify-center w-full md:w-auto relative py-4 md:py-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-full md:w-full md:h-0.5 bg-gradient-to-r from-accent/20 via-primary/50 to-primary/20" />
            </div>
            <div className="relative z-10 bg-blue-900/50 p-2 rounded-full border border-primary/30 text-primary">
              <LinkIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="bg-blue-950/80 border border-primary/20 px-6 py-4 rounded-xl shadow-inner w-full md:w-auto text-center z-10 flex flex-col gap-2">
            <div className="text-sm font-semibold text-white">Prisma DB</div>
            <div className="h-px w-full bg-primary/20" />
            <div className="text-sm font-semibold text-white">Gemini API</div>
          </div>

        </div>
      </div>
    </div>
  );
}
